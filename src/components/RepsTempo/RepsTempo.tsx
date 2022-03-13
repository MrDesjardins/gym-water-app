import { createEffect, createMemo, createSignal } from "solid-js";
import { distanceSensor } from "../../sensors/distanceSensors";
import { fakeDistanceSensor } from "../../sensors/fakeDistanceSensor";
import "../ComponentVariables.css";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";
import { RepsTempoChart } from "./RepsTempoChart";
export interface RepsTempoProps {
  height: number;
  width: number;
  repGroupId: number;
  expectedReps?: number;
}
const TEXT_HEIGHT = 20;
export const RepsTempo = (props: RepsTempoProps) => {
  const [executing, setExecuting] = createSignal(true);
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
    const { distanceInCm: distance, timeInSec: sec, repetitionIndex: currentRep } = newData;
    if (currentData.length === 0) {
      currentData.push([{ repetitionIndex: 0, distanceInCm: distance, timeInSec: sec }]);
    } else {
      const lastRepetitionIndex = currentData[currentData.length - 1][0].repetitionIndex;
      if (lastRepetitionIndex === currentRep) {
        currentData[currentData.length - 1].push({
          repetitionIndex: currentRep,
          distanceInCm: distance,
          timeInSec: sec,
        });
      } else {
        currentData.push([
          {
            repetitionIndex: currentRep,
            distanceInCm: distance,
            timeInSec: sec,
          },
        ]);
      }
    }
    setChartData(currentData);
  }

  // Props are changing (repGroupId), we are clearing the canvas and the list of chart data
  createEffect(() => {
    setChartData([]);
    distanceSensor(
      props.expectedReps ?? 10,
      props.repGroupId,
      (newChartData, repGroupId) => {
        if (repGroupId === props.repGroupId) {
          pushNewData(newChartData);
          return true;
        }
        return false;
      },
      () => {
        setExecuting(false);
      },
    );
  });
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
        <RepsTempoChart
          repGroupId={props.repGroupId}
          width={props.width}
          height={props.height - TEXT_HEIGHT}
          chartData={chartData()}
        />
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
