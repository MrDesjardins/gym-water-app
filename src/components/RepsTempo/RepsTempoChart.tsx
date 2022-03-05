import styles from "./RepsTempo.module.css";

import { createSignal, onCleanup, onMount } from "solid-js";
import { fakeDistanceSensor } from "../../sensors/FakeDistanceSensor";
const colorByRep = [
  "#008433",
  "#ff8eff",
  "#00ed00",
  "#d63ca2",
  "#00b956",
  "#ff69c7",
  "#2a5f00",
  "#62b5ed",
  "#cb7f46",
  "#00467d",
  "#009eaf",
  "#004a73",
];
function hex2rgba(hexa: string, a: number): string {
  const r = parseInt(hexa.slice(1, 3), 16);
  const g = parseInt(hexa.slice(3, 5), 16);
  const b = parseInt(hexa.slice(5, 7), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
export interface RepsTempoChartProps {
  height: number;
  width: number;
}

/**
 * Expect to have a list of list of ChartData.
 *
 * Each list is 1 rep.
 *
 * Each repetition can have many chart data.
 */
export interface ChartData {
  repetitionIndex: number; // Start at 0 to the number of repetition for the set -1. E.g. A set of 12 repetitions start at 0 and end at 11.
  timeInSec: number; // Can be a fraction of second like 1.56 seconds
  distanceInCm: number; // Can be a fraction like 1.23 cm
}

const PIXEL_VERTICAL_TOP = 30;
const PIXEL_VERTICAL_BOTTOM = 30;
const PIXEL_HORIZONTAL_LEFT = 40;
const MAX_CM_IN_CHART = 45;
const MAX_SEC_IN_CHART = 6;

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

  const pixel_vertical_y_axis_bottom = props.height - PIXEL_VERTICAL_BOTTOM;
  const pixel_vertical_y_axis_top = PIXEL_VERTICAL_TOP + 20;
  const pixel_horizontal_x_axis_right =
    props.width - PIXEL_HORIZONTAL_LEFT - 20;

  function getVerticalPixelFromDistanceInCm(cm: number): number {
    return (
      pixel_vertical_y_axis_bottom -
      (cm * (pixel_vertical_y_axis_bottom - pixel_vertical_y_axis_top)) /
        MAX_CM_IN_CHART
    );
  }

  function getHorizontalPixelFromTimeInSec(sec: number): number {
    return (
      PIXEL_HORIZONTAL_LEFT +
      (sec * (pixel_horizontal_x_axis_right - PIXEL_HORIZONTAL_LEFT)) /
        MAX_SEC_IN_CHART
    );
  }

  onMount(() => {
    fakeDistanceSensor(
      12,
      (distance: number, sec: number, currentRep: number) => {
        setChartData((chartData) => {
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
        });
      }
    );
    const ctx = canvasRef?.getContext("2d") ?? null;
    let frame = requestAnimationFrame(loop);
    if (ctx !== null) {
      // Axis Header
      ctx.font = `14px Arial`;
      ctx.fillStyle = "#888296";
      ctx.fillText(`DISTANCE CM`, 10, PIXEL_VERTICAL_TOP);
      ctx.fillText(`SEC`, 260, pixel_vertical_y_axis_bottom + 5);

      // Y-Axis Labels
      ctx.textAlign = "end";
      ctx.font = `16px Arial`;
      for (let i = 0; i <= 45; i += 5) {
        ctx.fillText(i + "", 30, getVerticalPixelFromDistanceInCm(i));
      }

      // X-Axis Labels
      ctx.textAlign = "start";
      ctx.font = `16px Arial`;
      for (let i = 0; i <= 6; i++) {
        ctx.fillText(
          i + "",
          getHorizontalPixelFromTimeInSec(i),
          pixel_vertical_y_axis_bottom + 20
        );
      }

      // Chart Structure
      ctx.strokeStyle = "#E5E5E5";
      ctx.moveTo(PIXEL_HORIZONTAL_LEFT, pixel_vertical_y_axis_top - 10);
      ctx.lineTo(PIXEL_HORIZONTAL_LEFT, pixel_vertical_y_axis_bottom);
      ctx.lineTo(
        pixel_horizontal_x_axis_right + 10,
        pixel_vertical_y_axis_bottom
      );
      ctx.stroke();
    }
    function loop() {
      if (ctx !== null) {
        // Clear the line
        ctx.clearRect(
          PIXEL_HORIZONTAL_LEFT + 1,
          pixel_vertical_y_axis_top,
          pixel_horizontal_x_axis_right,
          pixel_vertical_y_axis_bottom -
            PIXEL_VERTICAL_TOP -
            PIXEL_VERTICAL_BOTTOM
        );
        // Draw all lines
        const d = chartData();
        for (let repIndex = 0; repIndex < d.length; repIndex++) {
          const isActiveRep = repIndex === d.length - 1;
          let lastX = PIXEL_HORIZONTAL_LEFT;
          let lastY = pixel_vertical_y_axis_bottom;
          for (
            let dataPointIndex = 0;
            dataPointIndex < d[repIndex].length;
            dataPointIndex++
          ) {
            const dataPoint = d[repIndex][dataPointIndex];
            const x = getHorizontalPixelFromTimeInSec(dataPoint.timeInSec);
            const y = getVerticalPixelFromDistanceInCm(dataPoint.distanceInCm);

            // Dot
            ctx.beginPath();
            ctx.arc(x, y, isActiveRep ? 3 : 2, 0, 2 * Math.PI);
            ctx.fillStyle = hex2rgba(
              colorByRep[repIndex],
              isActiveRep ? 1 : 0.3
            );
            ctx.fill();

            // Line between dots
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = hex2rgba(
              colorByRep[repIndex],
              isActiveRep ? 1 : 0.3
            );
            ctx.stroke();

            lastX = x;
            lastY = y;
          }
        }
      }
      frame = requestAnimationFrame(loop);
    }

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
