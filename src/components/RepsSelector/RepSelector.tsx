import { createMemo, createSignal, For } from "solid-js";
import "../ComponentVariables.css";
import styles from "./RepSelector.module.css";
export interface RepSelectorProps {
  repsChoices: number[];
  height: number;
  width: number;
  repSelection?: number;
  getCurrentReps: (reps: number) => void;
}

const TEXT_HEIGHT = 40;

export const RepSelector = (props: RepSelectorProps) => {
  const [currentReps, setCurrentReps] = createSignal(
    props.repSelection ?? props.repsChoices[0]
  );
  return (
    <div
      class={styles.RepSelector}
      style={{
        height: `${props.height}px`,
        width: `${props.width}px`,
      }}
    >
      <div
        class={styles.RepSelectorChoices}
        style={{
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <For each={props.repsChoices}>
          {(reps) => (
            <div
              classList={{
                [styles.RepSelectorChoice]: true,
                [styles.RepSelectorChoiceSelected]: currentReps() === reps,
              }}
              onClick={() => {
                props.getCurrentReps(reps);
                setCurrentReps(reps);
              }}
            >
              <div>{reps}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
