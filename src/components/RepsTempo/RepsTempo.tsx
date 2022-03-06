import { createEffect } from "solid-js";
import "../ComponentVariables.css";
import styles from "./RepsTempo.module.css";
import { RepsTempoChart } from "./RepsTempoChart";
export interface RepsTempoProps {
  height: number;
  width: number;
  repGroupId: number;
}
const TEXT_HEIGHT = 20;
export const RepsTempo = (props: RepsTempoProps) => {
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
        />
      </div>
    </div>
  );
};
