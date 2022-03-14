import { onCleanup, onMount } from "solid-js";
import styles from "./WaterScreen.module.css";
export interface WaterScreenProps {}

export const WaterScreen = (props: WaterScreenProps) => {
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let frame: number;
  let canvasHeight = 490;
  let canvasWidth = 1024;
  let top = canvasHeight;

  let curveHeight = 100;
  let lastTime = 0;
  let yWave = 0;
  let lastX = 0,
    lastY = 0,
    x = 0,
    y = curveHeight;
  let offset = 0;
  const offsetIncrement = 0.025;
  const draw = (time: number) => {

    const ctx = canvasRef?.getContext("2d") ?? null;

    if (ctx) {
      ctx.fillStyle = "#0288d1";
      if (time > lastTime + 1000 / 30) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Might not need to clear all
        // ctx.beginPath();

        // ctx.fillRect(0, top - 100, canvasWidth, canvasHeight);
        // ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0 - offset, lastY);
        for (x = offset; x <= 1024 + offset; x += 50) {
          y = curveHeight * Math.sin(x) + 200;

          ctx.lineTo(x - offset, y);

          lastY = y;
          lastX = x;
        }
        ctx.lineTo(canvasWidth, lastY);
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);
        ctx.closePath();
        ctx.fill();
        offset += offsetIncrement;
        lastTime = time;
      }
    }
    frame = requestAnimationFrame(draw);
  };

  onMount(() => {
    frame = requestAnimationFrame(draw);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return <canvas ref={canvasRef} class={styles.WaterScreen} width={canvasWidth} height={canvasHeight} />;
};
