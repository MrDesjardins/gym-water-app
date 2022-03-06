import { createEffect } from "solid-js";
import "../ComponentVariables.css";
import styles from "./RepsTempo.module.css";
import { RepsTempoChart } from "./RepsTempoChart";
export interface RepsTempoProps {
  height: number;
  width: number;
  repGroupId: number;
}
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
          height: `${props.height}px`,
        }}
      >
        <RepsTempoChart
          repGroupId={props.repGroupId}
          width={props.width}
          height={props.height}
        />
      </div>
    </div>
  );
};
