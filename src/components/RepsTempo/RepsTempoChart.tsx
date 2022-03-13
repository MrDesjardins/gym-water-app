import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { drawDotsLinesTempos } from "./canvasContextDrawing";
import { ChartData } from "./canvasModel";
import styles from "./RepsTempo.module.css";

export interface RepsTempoChartProps {
  repGroupId: number;
  height: number;
  width: number;
  chartData: ChartData[][];
}

export const RepsTempoChart = (props: RepsTempoChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let frame: number;
  const draw = () => {
    const ctx = canvasRef?.getContext("2d") ?? null;
    drawDotsLinesTempos(ctx, props.width, props.height, props.chartData);
    frame = requestAnimationFrame(draw);
  };

  onMount(() => {
    cancelAnimationFrame(frame); // Cancel the previous animation frame
    frame = requestAnimationFrame(draw);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return <canvas ref={canvasRef} class={styles.RepsTempoCanvas} height={props.height} width={props.width} />;
};
