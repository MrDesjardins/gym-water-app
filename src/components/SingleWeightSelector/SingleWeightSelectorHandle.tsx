import { createEffect, createSignal } from "solid-js";
import "../ComponentVariables.css";
import styles from "./SingleWeightSelectorHandle.module.css";
import { BiMoveVertical } from "solid-icons/bi";
export interface SingleWeightSelectorHandleProps {
  defaultTop: number;
  defaultLeft: number;
  updateTop: (pixel: number) => void;
  handleSize: number;
  isDragging: (dragging: boolean) => void;
  offsetY: number;
  parentHeight: number;
}
export const SingleWeightSelectorHandle = (
  props: SingleWeightSelectorHandleProps
) => {
  const [isDragging, setIsDragging] = createSignal(false);
  //const [initialYPosition, setInitialYPosition] = createSignal<number>(0);
  const [realYPosition, setRealYPosition] = createSignal<undefined | number>(
    props.defaultTop
  );
  createEffect(() => {
    props.isDragging(isDragging());
  });
  // const [updateNewWeight, clear] = createThrottle(
  //   (value) => props.updateTop(value as number),
  //   5
  // );

  let handleOffset = 0;
  return (
    <div
      onmousedown={(e) => {
        handleOffset = e.offsetY;
        setIsDragging(true);
      }}
      ontouchstart={(e) => {
        setIsDragging(true);
      }}
      onmousemove={(e) => {
        if (isDragging()) {
          let newY = e.clientY - props.offsetY - handleOffset;
          console.log(newY);
          if (newY >= props.parentHeight - props.handleSize) {
            newY = props.parentHeight - props.handleSize;
          } else if (newY <= 0) {
            newY = 0;
          }

          props.updateTop(newY);
          setRealYPosition(newY);
        }
      }}
      ontouchmove={(e) => {
        if (isDragging()) {
          const newY = e.touches[0].clientY - props.offsetY - handleOffset;
          props.updateTop(newY);
          setRealYPosition(newY);
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
        top: `${realYPosition()}px`,
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
