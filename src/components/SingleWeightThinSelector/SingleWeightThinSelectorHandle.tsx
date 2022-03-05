import { createEffect, createSignal } from "solid-js";
import "../ComponentVariables.css";
import styles from "./SingleWeightThinSelectorHandle.module.css";
import { BiMoveVertical } from "solid-icons/bi";

export interface SingleWeightThinSelectorHandleProps {
  defaultTop: number;
  defaultLeft: number;
  updateTop: (differencePixelMoved: number) => void;
  handleSize: number;
  isDragging: (dragging: boolean) => void;
}
export const SingleWeightThinSelectorHandle = (
  props: SingleWeightThinSelectorHandleProps
) => {
  const [isDragging, setIsDragging] = createSignal(false);
  const [initialYPosition, setInitialYPosition] = createSignal(0);
  createEffect(() => {
    props.isDragging(isDragging());
  });
  return (
    <div
      onmousedown={(e) => {
        setIsDragging(true);
        setInitialYPosition(e.clientY);
      }}
      ontouchstart={(e) => {
        setIsDragging(true);
        setInitialYPosition(e.touches[0].clientY);
      }}
      onmousemove={(e) => {
        if (isDragging()) {
          props.updateTop(e.clientY - initialYPosition());
          setInitialYPosition(e.clientY);
        }
      }}
      ontouchmove={(e) => {
        if (isDragging()) {
          props.updateTop(e.touches[0].clientY - initialYPosition());
          setInitialYPosition(e.touches[0].clientY);
        }
      }}
      onmouseup={(e) => {
        setIsDragging(false);
      }}
      ontouchend={(e) => {
        setIsDragging(false);
      }}
      onmouseleave={(e) => {
        setIsDragging(false);
      }}
      classList={{
        [styles.SingleWeightSelectorThinHandle]: true,
        [styles.SingleWeightSelectorThinHandle_Unpressed]: !isDragging(),
        [styles.SingleWeightSelectorThinHandle_Pressed]: isDragging(),
      }}
      style={{
        top: `${props.defaultTop}px`,
        left: `${props.defaultLeft}px`,
        height: `${props.handleSize}px`,
        width: `${props.handleSize}px`,
        "border-radius": `${props.handleSize}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorThinHandleData}>
        <BiMoveVertical size={40} color="#fff" />
      </div>
    </div>
  );
};
