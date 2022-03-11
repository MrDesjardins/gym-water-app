import { JSX } from "solid-js";
import styles from "./AddSet.module.css";
import { BiPlus } from "solid-icons/bi";
export interface AddSetProps {
  children: JSX.Element;
  width: number;
  height: number;
  onClick: () => void;
}
export const AddSet = (props: AddSetProps) => {
  return (
    <div class={styles.AddSet} style={{ width: `${props.width}px` }}>
      <div
        class={styles.backdrop}
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
      ></div>
      <div
        class={styles.buttonContainer}
        style={{
          width: `${props.width}px`,
          height: `${props.height / 2}px`,
          "margin-top": `${props.height / 3}px`,
        }}
        onclick={() => props.onClick()}
      >
        <div class={styles.button}>
          <BiPlus size={40} color="#fff" />
        </div>
        <div class={styles.buttonText}>Add Set</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
