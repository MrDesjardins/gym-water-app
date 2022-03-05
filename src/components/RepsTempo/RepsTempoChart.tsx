import { createSignal, onCleanup, onMount } from "solid-js";
import { fakeDistanceSensor } from "../../sensors/FakeDistanceSensor";
import { loop } from "./canvasContextDrawing";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";

export interface RepsTempoChartProps {
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
  const [chartData, setChartData] = createSignal<ChartData[][]>([]);
  let canvasRef: HTMLCanvasElement | undefined = undefined;

  onMount(() => {
    fakeDistanceSensor(2, (newChartData) => {
      setChartData((chartData) => {
        return updateChartData(chartData, newChartData);
      });
    });
    const ctx = canvasRef?.getContext("2d") ?? null;
    let frame = requestAnimationFrame(() =>
      loop(ctx, props.width, props.height, () => chartData())
    );
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
function updateChartData(chartData: ChartData[][], newData: ChartData) {
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
  return chartData;
}
