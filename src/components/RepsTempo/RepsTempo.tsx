import { batch, createEffect, createMemo, createSignal, on, onCleanup, onMount, untrack } from "solid-js";
import { SensorObserverPayload } from "../../sensors/distanceSensors";
import { useSensors } from "../../sensors/SensorsContext";
import "../ComponentVariables.css";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";
import { RepsTempoChart } from "./RepsTempoChart";
export interface RepsTempoProps {
  height: number;
  width: number;
  expectedReps?: number;
}
const TEXT_HEIGHT = 20;
export const RepsTempo = (props: RepsTempoProps) => {
  let repetitionIndex = 0;
  let directionUp = true;
  let lastCm = 0;
  let startTimeInMs = 0;
  const sensors = useSensors();
  const distanceSensorInput = (input: SensorObserverPayload): void => {
    if (input.cm > lastCm && !directionUp) {
      directionUp = true;
      repetitionIndex++;
      startTimeInMs = Date.now();
    } else if (input.cm < lastCm && directionUp) {
      directionUp = false;
    }
    const newData: ChartData = {
      distanceInCm: input.cm,
      timeInMs: input.fullDateTimeInMs - startTimeInMs,
      repetitionIndex: repetitionIndex,
    };
    pushNewData(newData);
    lastCm = input.cm;
  };
  onMount(() => {
    sensors?.actions.subscribeToDistanceSensor(distanceSensorInput);
    onCleanup(() => {
      sensors?.actions.unSubscribeToDistanceSensor(distanceSensorInput);
    });
  });
  const [executing, setExecuting] = createSignal(false);

  createEffect(
    on(
      () => sensors?.state.contactSensorIsClosed,
      () => {
        if (sensors !== undefined) {
          if (sensors.state.contactSensorIsClosed) {
            batch(() => {
              setExecuting(false);
            });
          } else {
            repetitionIndex = 0;
            directionUp = true;
            lastCm = 0;
            setChartData([]); // Start fresh with no data
            startTimeInMs = Date.now();
            setExecuting(true);
          }
        }
      },
      { defer: true }, // Need to defer: we do not want any execution on the first render, only when a change occurs
    ),
  );

  /**
   * E.g.
   * [
   *  [{repetitionIndex: 0, timeInSec: 1.23, distanceInCm: 1.23}, {repetitionIndex: 0, timeInSec: 1.63, distanceInCm: 7}],
   *  [{repetitionIndex: 1, timeInSec: 0.33, distanceInCm: 0.93}, {repetitionIndex: 1, timeInSec: 1.01, distanceInCm: 2.44}, {...}],
   * ]
   */
  const [chartData, setChartData] = createSignal<ChartData[][]>([]);

  /**
   * Receive the existing chartData and the 3 new values
   */
  function pushNewData(newData: ChartData): void {
    const currentData = chartData().slice();
    const { distanceInCm: distance, timeInMs: timeMs, repetitionIndex: currentRep } = newData;
    if (currentData.length === 0) {
      currentData.push([{ repetitionIndex: 0, distanceInCm: distance, timeInMs: timeMs }]);
    } else {
      const lastRepetitionIndex = currentData[currentData.length - 1][0].repetitionIndex;
      if (lastRepetitionIndex === currentRep) {
        currentData[currentData.length - 1].push({
          repetitionIndex: currentRep,
          distanceInCm: distance,
          timeInMs: timeMs,
        });
      } else {
        currentData.push([
          {
            repetitionIndex: currentRep,
            distanceInCm: distance,
            timeInMs: timeMs,
          },
        ]);
      }
    }
    setChartData(currentData);
  }

  const currentRepetition = createMemo(() => {
    const arrData = chartData();
    return arrData.length;
  });

  const makeEmphasisRep = createMemo(() => {
    if (props.expectedReps === undefined) {
      return false;
    }

    if (!executing()) {
      return false;
    }

    if (currentRepetition() * 1.2 >= props.expectedReps) {
      return true;
    }
  });
  return (
    <div
      class={styles.RepsTempo}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    >
      <div class={styles.RepsTempoTitle}>Reps Tempo</div>
      <div
        class={styles.RepsTempoContent}
        style={{
          width: `${props.width}px`,
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <RepsTempoChart width={props.width} height={props.height - TEXT_HEIGHT} chartData={chartData()} />
      </div>
      <div class={styles.reps}>
        <span
          class={styles.currentRepCount}
          classList={{ [styles.currentRepCountAnimated]: makeEmphasisRep() }}
          style={{
            width: currentRepetition() > 9 ? "50px" : "30px",
          }}
        >
          <div>{currentRepetition()}</div>
        </span>
        {props.expectedReps === undefined ? null : (
          <>
            <span class={styles.repSeparator}>/</span>
            <span class={styles.expectedRep}>{props.expectedReps}</span>
          </>
        )}
      </div>
    </div>
  );
};
