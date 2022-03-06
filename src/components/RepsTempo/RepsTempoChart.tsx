import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { fakeDistanceSensor } from "../../sensors/FakeDistanceSensor";
import { loop } from "./canvasContextDrawing";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";

export interface RepsTempoChartProps {
  repGroupId: number;
  height: number;
  width: number;
}

export const RepsTempoChart = (props: RepsTempoChartProps) => {
  /**
   * E.g.
   * [
   *  [{repetitionIndex: 0, timeInSec: 1.23, distanceInCm: 1.23}, {repetitionIndex: 0, timeInSec: 1.63, distanceInCm: 7}],
   *  [{repetitionIndex: 1, timeInSec: 0.33, distanceInCm: 0.93}, {repetitionIndex: 1, timeInSec: 1.01, distanceInCm: 2.44}, {...}],
   * ]
   */
  let chartData: ChartData[][] = []; // Does not need to be a signal
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let frame: number;
  const draw = () => {
    const ctx = canvasRef?.getContext("2d") ?? null;
    loop(ctx, props.width, props.height, chartData);
    frame = requestAnimationFrame(draw);
  };

  // Props are changing, we are clearing the canvas and the list of chart data
  createEffect(() => {
    const ctx = canvasRef?.getContext("2d") ?? null;
    ctx?.clearRect(0, 0, props.width, props.height); // Clear the canvas
    chartData = []; // Clear the array
    cancelAnimationFrame(frame); // Cancel the previous animation frame

    fakeDistanceSensor(12, props.repGroupId, (newChartData, repGroupId) => {
      if (repGroupId === props.repGroupId) {
        updateChartData(chartData, newChartData);
        return true;
      }
      return false;
    });

    frame = requestAnimationFrame(draw);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return (
    <canvas
      ref={canvasRef}
      class={styles.RepsTempoCanvas}
      height={props.height}
      width={props.width}
    />
  );
};

/**
 * Receive the existing chartData and the 3 new values
 */
function updateChartData(chartData: ChartData[][], newData: ChartData): void {
  const {
    distanceInCm: distance,
    timeInSec: sec,
    repetitionIndex: currentRep,
  } = newData;
  if (chartData.length === 0) {
    chartData.push([
      { repetitionIndex: 0, distanceInCm: distance, timeInSec: sec },
    ]);
  } else {
    const lastRepetitionIndex =
      chartData[chartData.length - 1][0].repetitionIndex;
    if (lastRepetitionIndex === currentRep) {
      chartData[chartData.length - 1].push({
        repetitionIndex: currentRep,
        distanceInCm: distance,
        timeInSec: sec,
      });
    } else {
      chartData.push([
        {
          repetitionIndex: currentRep,
          distanceInCm: distance,
          timeInSec: sec,
        },
      ]);
    }
  }
}
