import { createEffect, createSignal } from "solid-js";
import "./ComponentVariables.css";
import styles from "./SingleWeightSelectorHandle.module.css";
import { BiMoveVertical } from "solid-icons/bi";

export interface SingleWeightSelectorHandleProps {
  defaultTop: number;
  defaultLeft: number;
  updateTop: (differencePixelMoved: number) => void;
  handleSize: number;
  isDragging: (dragging: boolean) => void;
}
export const SingleWeightSelectorHandle = (
  props: SingleWeightSelectorHandleProps
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
          props.updateTop(e.screenY - initialYPosition());
          setInitialYPosition(e.screenY);
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
        [styles.SingleWeightSelectorHandle]: true,
        [styles.SingleWeightSelectorHandle_Unpressed]: !isDragging(),
        [styles.SingleWeightSelectorHandle_Pressed]: isDragging(),
      }}
      style={{
        top: `${props.defaultTop}px`,
        left: `${props.defaultLeft}px`,
        height: `${props.handleSize}px`,
        width: `${props.handleSize}px`,
        "border-radius": `${props.handleSize}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorHandleData}>
        <BiMoveVertical size={40} color="#fff" />
      </div>
    </div>
  );
};
