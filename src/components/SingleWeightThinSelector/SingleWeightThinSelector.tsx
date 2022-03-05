import { createMemo, createSignal } from "solid-js";
import "../ComponentVariables.css";
import styles from "./SingleWeightThinSelector.module.css";
import { SingleWeightThinSelectorHandle } from "./SingleWeightThinSelectorHandle";
export interface SingleWeightThinSelectorProps {
  minimumWeight: number;
  maximumWeight: number;
  defaultWeight: number;
  height: number;
  getCurrentWeight: (weight: number) => void;
}
const HANDLE_SIZE = 60;
const TEXT_HEIGHT = 40;

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
    return props.height / weightRange;
  });

  const getHandleTop = createMemo((): number => {
    return (
      ((props.maximumWeight - currentWeight()) / props.maximumWeight) *
        (props.height - 2*HANDLE_SIZE) +
      HANDLE_SIZE
    );
  });

  return (
    <div
      class={styles.SingleWeightThinSelector}
      style={{
        height: `${props.height}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorThinTitle}>
        <div class={styles.SingleWeightSelectorThinTitleText}>
          {currentWeight()}
        </div>
        <div class={styles.SingleWeightSelectorThinTitleLbs}>lbs</div>
      </div>
      <SingleWeightThinSelectorHandle
        handleSize={HANDLE_SIZE}
        defaultTop={getHandleTop()}
        defaultLeft={0}
        updateTop={(differencePixelMoved) => {
          setCurrentWeight((previousWeight) => {
            let newWeight =
              previousWeight +
              (-1 * differencePixelMoved) / getOneLbsPixelEquivalence();
            if (differencePixelMoved < 0) {
              newWeight = Math.ceil(newWeight);
            } else {
              newWeight = Math.floor(newWeight);
            }

            if (newWeight <= props.minimumWeight) {
              return props.minimumWeight;
            } else if (newWeight >= props.maximumWeight) {
              return props.maximumWeight;
            }
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
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <div
          class={styles.SingleWeightThinSelectorWaterTankWater}
          style={{
            height: `${getWaterHeight()}px`,
            top: `${getWaterTop()}px`,
            left: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
