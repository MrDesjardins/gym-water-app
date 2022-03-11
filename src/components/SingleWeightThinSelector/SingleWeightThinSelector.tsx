import createDebounce from "@solid-primitives/debounce";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import "../ComponentVariables.css";
import { SingleWeightSelectorHandle } from "../SingleWeightSelector/SingleWeightSelectorHandle";
import styles from "./SingleWeightThinSelector.module.css";
export interface SingleWeightThinSelectorProps {
  minimumWeight: number;
  maximumWeight: number;
  defaultWeight: number;
  height: number;
  getCurrentWeight: (weight: number) => void;
}
const HANDLE_SIZE = 60;
const TEXT_HEIGHT = 40;
const WIDTH = 20;

export const SingleWeightThinSelector = (
  props: SingleWeightThinSelectorProps
) => {
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
    return (props.height - HANDLE_SIZE - TEXT_HEIGHT) / weightRange;
  });

  const getHandleTop = createMemo((): number => {
    return (
      TEXT_HEIGHT +
      ((props.maximumWeight - currentWeight()) / props.maximumWeight) *
        (props.height - HANDLE_SIZE - TEXT_HEIGHT)
    );
  });
  let containerRef: HTMLDivElement | undefined = undefined;
  const getOffset = (): number => {
    if (containerRef) {
      return containerRef.getBoundingClientRect().top;
    }
    return 0;
  };

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
  return (
    <div
      ref={containerRef}
      class={styles.SingleWeightThinSelector}
      style={{
        width: `${ HANDLE_SIZE}px`,
        height: `${props.height}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorThinTitle}>
        <div class={styles.SingleWeightSelectorThinTitleText}>
          {currentWeight()}
        </div>
        <div class={styles.SingleWeightSelectorThinTitleLbs}>lbs</div>
      </div>
      <SingleWeightSelectorHandle
        offsetY={getOffset()}
        titleOffset={TEXT_HEIGHT}
        handleSize={HANDLE_SIZE}
        parentHeight={props.height}
        defaultTop={getHandleTop()}
        defaultLeft={0}
        updateTop={(pixel) => {
          setCurrentWeight(() => {
            let newWeight = Math.round(
              (props.height - HANDLE_SIZE - pixel) / getOneLbsPixelEquivalence()
            );

            return newWeight;
          });
        }}
        isDragging={(dragging: boolean) => {
          setIsDragging(dragging);
        }}
      />
      <div
        class={styles.SingleWeightThinSelectorWaterTank}
        style={{
          width: `${WIDTH}px`,
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <div
          class={styles.SingleWeightThinSelectorWaterTankWater}
          style={{
            width: `${WIDTH}px`,
            height: `${getWaterHeight()}px`,
            top: `${getWaterTop()}px`,
            left: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
