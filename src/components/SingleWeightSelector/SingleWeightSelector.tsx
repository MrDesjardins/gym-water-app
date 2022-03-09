import createDebounce from "@solid-primitives/debounce";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import "../ComponentVariables.css";
import styles from "./SingleWeightSelector.module.css";
import { SingleWeightSelectorHandle } from "./SingleWeightSelectorHandle";
import { Wave } from "./Wave";
export interface SingleWeightSelectorProps {
  minimumWeight: number;
  maximumWeight: number;
  defaultWeight: number;
  width: number;
  height: number;
  getCurrentWeight: (weight: number) => void;
}
const TEXT_HEIGHT = 20;
const HANDLE_SIZE = 60;
export const SingleWeightSelector = (props: SingleWeightSelectorProps) => {
  const [currentWeight, setCurrentWeight] = createSignal(props.defaultWeight);
  const [isDragging, setIsDragging] = createSignal(false);

  const getWaterHeight = createMemo((): number => {
    return (
      (currentWeight() / (props.maximumWeight - props.minimumWeight)) *
      (props.height - TEXT_HEIGHT)
    );
  });

  const getWaterTop = createMemo((): number => {
    return props.height - getWaterHeight();
  });

  /**
   * Return the number of pixel that represent 1 lbs
   */
  const getOneLbsPixelEquivalence = createMemo((): number => {
    const weightRange = props.maximumWeight - props.minimumWeight;
    return (props.height - HANDLE_SIZE) / weightRange;
  });

  const getWeightTextTop = createMemo((): number => {
    const top = props.height - getWaterHeight() / 2 - TEXT_HEIGHT;
    if (top > props.maximumWeight + TEXT_HEIGHT) {
      return props.maximumWeight + TEXT_HEIGHT;
    }
    return top;
  });

  const getHandleTop = createMemo((): number => {
    return (
      ((props.maximumWeight - currentWeight()) / props.maximumWeight) *
      (props.height - HANDLE_SIZE)
    );
  });

  // Debounch to improve performance. Will get the last value
  // after 200ms of inactivity.
  const [updateNewWeight, clear] = createDebounce(
    (value) => props.getCurrentWeight(value as number),
    200
  );
  createEffect(() => {
    updateNewWeight(currentWeight());
  });
  onCleanup(() => {
    clear();
  });
  let containerRef: HTMLDivElement | undefined = undefined;
  const getOffset = (): number => {
    if (containerRef) {
      return containerRef.getBoundingClientRect().top;
    }
    return 0;
  };
  return (
    <div
      ref={containerRef}
      class={styles.SingleWeightSelector}
      style={{
        width: `${props.width + HANDLE_SIZE}px`,
        height: `${props.height}px`,
      }}
    >
      <Wave width={props.width} top={getWaterTop()} wobble={isDragging()} />
      <div class={styles.SingleWeightSelectorTitle}>Weight</div>
      <SingleWeightSelectorHandle
        offsetY={getOffset()}
        titleOffset={0}
        parentHeight={props.height}
        handleSize={HANDLE_SIZE}
        defaultTop={getHandleTop()}
        defaultLeft={props.width - HANDLE_SIZE / 2}
        updateTop={(pixel) => {
          setCurrentWeight(() => {
            let newWeight = Math.round(
              (props.height - HANDLE_SIZE - pixel) / getOneLbsPixelEquivalence()
            );

            return newWeight; // 0 to 280 (320-60)
          });
        }}
        isDragging={(dragging: boolean) => {
          setIsDragging(dragging);
        }}
      />

      <div
        class={styles.SingleWeightSelectorWeight}
        style={{
          width: `${props.width}px`,
          top: `${getWeightTextTop()}px`,
          left: 0,
        }}
      >
        <span class={styles.SingleWeightSelectorWeight_Number}>
          {currentWeight()}
        </span>
        <span class={styles.SingleWeightSelectorWeight_Lbs}>lbs</span>
      </div>
      <div
        class={styles.SingleWeightSelectorWaterTank}
        style={{
          width: `${props.width}px`,
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <div
          class={styles.SingleWeightSelectorWaterTankWater}
          style={{
            width: `${props.width}px`,
            height: `${getWaterHeight()}px`,
            top: `${getWaterTop()}px`,
            left: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
