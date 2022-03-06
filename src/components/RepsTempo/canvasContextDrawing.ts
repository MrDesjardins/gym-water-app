import { hex2rgba, colorByRep } from "../../utils/colors";
import {
  ChartData,
  MAX_CM_IN_CHART,
  MAX_SEC_IN_CHART,
  PIXEL_HORIZONTAL_LEFT,
  PIXEL_VERTICAL_BOTTOM,
  PIXEL_VERTICAL_TOP,
} from "./canvasModel";

export const loop = (
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  getData: ChartData[][]
): void => {
  const pixel_vertical_y_axis_bottom = height - PIXEL_VERTICAL_BOTTOM;
  const pixel_vertical_y_axis_top = PIXEL_VERTICAL_TOP + 20;
  const pixel_horizontal_x_axis_right = width - PIXEL_HORIZONTAL_LEFT - 20;
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

  if (ctx !== null) {
    // Clear the line
    ctx.clearRect(0, 0, width, height);

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

    // Draw all lines
    const d = getData.slice();
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
        ctx.fillStyle = hex2rgba(colorByRep[repIndex], isActiveRep ? 1 : 0.3);
        ctx.fill();

        // Line between dots
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = hex2rgba(colorByRep[repIndex], isActiveRep ? 1 : 0.3);
        ctx.stroke();

        lastX = x;
        lastY = y;
      }
    }
  }
};
