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
  titleOffset: number;
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
  function adjustClientYE(mouseOrTouchY: number) {
    let newY = mouseOrTouchY - props.offsetY - handleOffset;
    if (newY >= props.parentHeight - props.handleSize) {
      newY = props.parentHeight - props.handleSize;
    } else if (newY <= props.titleOffset) {
      newY = props.titleOffset;
    }

    props.updateTop(newY);
    setRealYPosition(newY);
  }
  let handleOffset = 0;
  return (
    <div
      onmousedown={(e) => {
        handleOffset = e.offsetY;
        setIsDragging(true);
      }}
      ontouchstart={(e) => {
        console.log(e.touches[0]);
        setIsDragging(true);
      }}
      onmousemove={(e) => {
        if (isDragging()) {
          const clientEY = e.clientY;
          adjustClientYE(clientEY);
        }
      }}
      ontouchmove={(e) => {
        if (isDragging()) {
          const clientEY = e.touches[0].clientY ;
          adjustClientYE(clientEY);
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
