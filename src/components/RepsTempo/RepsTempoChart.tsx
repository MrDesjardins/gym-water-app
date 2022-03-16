import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { CONSTANTS } from "../../models/constants";
import { drawDotsLinesTempos } from "./canvasContextDrawing";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";

export interface RepsTempoChartProps {
  height: number;
  width: number;
  chartData: ChartData[][];
}

/**
 * Render a canvas and loops. Handle the FPS (frame per second)
 */
export const RepsTempoChart = (props: RepsTempoChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let frame: number;
  let lastTime: number = 0;
  const draw = (time: number) => {
    const ctx = canvasRef?.getContext("2d") ?? null;
    if (time > lastTime + 1000 / CONSTANTS.FPS) {
      drawDotsLinesTempos(ctx, props.width, props.height, props.chartData);
      lastTime = time;
    }
    frame = requestAnimationFrame(draw);
  };

  onMount(() => {
    cancelAnimationFrame(frame); // Cancel the previous animation frame
    frame = requestAnimationFrame(draw);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return <canvas ref={canvasRef} class={styles.RepsTempoCanvas} height={props.height} width={props.width} />;
};
