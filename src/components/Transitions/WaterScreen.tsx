import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./WaterScreen.module.css";
export interface WaterScreenProps {}

export const WaterScreen = (props: WaterScreenProps) => {
  const [isWaveAnimationRunning, setIsWaveAnimationRunning] = createSignal(true);
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let frame: number;
  let canvasHeight = 470;
  let canvasWidth = 1024;

  const WAVE_NUMBER = 4;
  const WAVE_HEIGHT = 30;
  const WAVE_GROWING_PIXEL = 0.02;
  const WAVE_X_TRANSLATION = 20;
  const WAVE_Y_TRANSLATION = 6;
  const WAVE_FINAL_TRANSPARENCY = 0.7;
  const WAVE_TRANSPARENCY_INCREASE = 0.01;
  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;
  let x = 0;
  let y = WAVE_HEIGHT;
  let waveXOffset = 0; // Horizontal movement
  let waveYOffset = canvasHeight + WAVE_HEIGHT; // Vertical movement, starts off screen
  let waveHeight = 0;
  let waveGrowing = true;
  let waterTransparency = 0.4;
  const draw = (time: number) => {
    const ctx = canvasRef?.getContext("2d") ?? null;

    if (ctx && isWaveAnimationRunning()) {
      ctx.fillStyle = "#0288d1";
      if (time > lastTime + 1000 / 30) {
        ctx.globalAlpha = waterTransparency;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Might not need to clear all
        ctx.beginPath();
        ctx.moveTo(0 - waveXOffset, lastY);
        for (x = waveXOffset; x <= canvasWidth + waveXOffset; x += 10) {
          y = waveYOffset + waveHeight * Math.sin((x / (canvasWidth / WAVE_NUMBER)) * 2 * Math.PI);
          waveHeight += waveGrowing ? WAVE_GROWING_PIXEL : -WAVE_GROWING_PIXEL;
          if (waveHeight > WAVE_HEIGHT) {
            waveGrowing = false;
          } else if (waveHeight <= -WAVE_HEIGHT) {
            waveGrowing = true;
          }
          ctx.lineTo(x - waveXOffset, y);

          lastY = y;
          lastX = x;
        }
        if (waveYOffset < canvasHeight / 2) {
          waterTransparency = Math.min(WAVE_FINAL_TRANSPARENCY, waterTransparency + WAVE_TRANSPARENCY_INCREASE);
        }

        ctx.lineTo(canvasWidth, lastY);
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);
        ctx.closePath();
        ctx.fill();
        waveXOffset += WAVE_X_TRANSLATION;
        waveYOffset -= WAVE_Y_TRANSLATION;
        lastTime = time;
      }
    }
    if (waveYOffset >= -WAVE_HEIGHT) {
      frame = requestAnimationFrame(draw);
    } else {
      setIsWaveAnimationRunning(false);
    }
  };

  onMount(() => {
    frame = requestAnimationFrame(draw);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return (
    <div class={styles.WaterScreen}>
      <div
        class={styles.finalMessage}
        style={{
          top: isWaveAnimationRunning() ? "600px" : "200px",
        }}
      >
        Good Job!
      </div>
      <canvas ref={canvasRef} class={styles.WaterScreen} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};
