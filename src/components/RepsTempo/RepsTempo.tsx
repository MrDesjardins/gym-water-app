import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { useSensors } from "../../sensors/context/SensorsContext";
import { MagneticContactSensorObserverPayload } from "../../sensors/magneticContactSensor";
import { UltraSonicSensorObserverPayload } from "../../sensors/ultraSonicSensor";
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
  let repetitionIndex = 0; // Maintain an index that organize the data when coming in
  let directionUp = true; // Needed to know when to increase the index
  let lastCm = 0; // Needed to know if we are going up or down
  let startTimeInMs = 0; // Every reps reset the time to 0: makes the chart having each repetition stacking above each other

  const [magneticSensorContactOpen, setMagneticSensorContactOpen] = createSignal(false);
  const sensors = useSensors(); // Allopws to know when the user start and stop exercising and to know the distance

  const distanceSensorInput = (input: UltraSonicSensorObserverPayload): void => {
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

  const magneticContactSensorInput = (input: MagneticContactSensorObserverPayload): void => {
    setMagneticSensorContactOpen(input.isOpen);
    if (input.isOpen) {
      // When open => doing reps
      repetitionIndex = 0;
      directionUp = true;
      lastCm = 0;
      setChartData([]); // Start fresh with no data
      startTimeInMs = Date.now();
    }
  };

  /**
   * Cleanup the subscribers that is listening to the distance sensor
   **/
  onMount(() => {
    sensors?.sensors.ultraSonicSensor.subscribe(distanceSensorInput);
    sensors?.sensors.magneticContactSensor.subscribe(magneticContactSensorInput);
    onCleanup(() => {
      sensors?.sensors.ultraSonicSensor.unsubscribe(distanceSensorInput);
      sensors?.sensors.magneticContactSensor.unsubscribe(magneticContactSensorInput);
    });
  });

  /**
   * E.g.
   * [
   *  [{repetitionIndex: 0, timeInMs: 1.23, distanceInCm: 1.23}, {repetitionIndex: 0, timeInMs: 1.63, distanceInCm: 7}],
   *  [{repetitionIndex: 1, timeInMs: 0.33, distanceInCm: 0.93}, {repetitionIndex: 1, timeInMs: 1.01, distanceInCm: 2.44}, {...}],
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

  /**
   * Computes the number of repetition
   */
  const currentRepetition = createMemo(() => {
    const arrData = chartData();
    return arrData.length;
  });

  /**
   * Indicates if the animation must run
   */
  const animateRepsCount = createMemo(() => {
    if (props.expectedReps === undefined) {
      return false;
    }

    if (!magneticSensorContactOpen()) {
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
          classList={{ [styles.currentRepCountAnimated]: animateRepsCount() }}
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
