import { JSX } from "solid-js";
import styles from "./AddSet.module.css";
import { BiPlus, BiMinus } from "solid-icons/bi";
export interface AddSetProps {
  children: JSX.Element;
  width: number;
  height: number;
  onAddClick: () => void;
  onRemoveClick: () => void;
  showRemoveButton: boolean;
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
          "margin-top": `100px`,
        }}
        onclick={() => props.onAddClick()}
      >
        <div class={styles.button}>
          <BiPlus size={40} color="#fff" />
        </div>
        <div class={styles.buttonText}>Add</div>
      </div>
      {props.showRemoveButton ? (
        <div
          class={styles.buttonContainer}
          style={{
            width: `${props.width}px`,
            height: `${props.height / 2}px`,
            "margin-top": `250px`,
          }}
          onclick={() => props.onRemoveClick()}
        >
          <div class={styles.button}>
            <BiMinus size={40} color="#fff" />
          </div>
          <div class={styles.buttonText}>Remove</div>
        </div>
      ) : null}
      <div>{props.children}</div>
    </div>
  );
};
