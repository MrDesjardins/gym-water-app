import { createSignal } from "solid-js";
import "./ComponentVariables.css";
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

  const getHeight = (): number => {
    return (
      (currentWeight() / (props.maximumWeight - props.minimumWeight)) *
      props.height
    );
  };

  const getTop = (): number => {
    return props.height - getHeight();
  };
  const getTopText = (): number => {
    const top = props.height - getHeight() / 2 - TEXT_HEIGHT;
    if (top > props.maximumWeight + TEXT_HEIGHT) {
      return props.maximumWeight + TEXT_HEIGHT;
    }
    return top;
  };

  const getTopHandle = (): number => {
    return (
      ((props.maximumWeight - currentWeight()) / props.maximumWeight) *
      (props.height - HANDLE_SIZE)
    );
  };

  // differencePixelMoved /
  // (props.maximumWeight - props.minimumWeight)
  return (
    <div
      class={styles.SingleWeightSelector}
      style={{
        width: `${props.width + TEXT_HEIGHT}px`,
        height: `${props.height + TEXT_HEIGHT}px`,
      }}
    >
      <Wave width={props.width} top={getTop()} />
      <div class={styles.SingleWeightSelectorTitle}>Weight</div>
      <SingleWeightSelectorHandle
        handleSize={HANDLE_SIZE}
        defaultTop={getTopHandle()}
        defaultLeft={props.width - HANDLE_SIZE / 2}
        updateTop={(differencePixelMoved) => {
          setCurrentWeight((prev) => {
            let newWeight = prev;
            if (differencePixelMoved < 0) {
              newWeight = prev += 1;
            } else if (differencePixelMoved > 0) {
              newWeight = prev -= 1;
            }
            if (newWeight < props.minimumWeight) {
              return props.minimumWeight;
            } else if (newWeight > props.maximumWeight) {
              return props.maximumWeight;
            }
            return Math.trunc(newWeight);
          });
        }}
      />

      <div
        class={styles.SingleWeightSelectorWeight}
        style={{
          width: `${props.width}px`,
          top: `${getTopText()}px`,
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
          height: `${props.height}px`,
        }}
      >
        <div
          class={styles.SingleWeightSelectorWaterTankWater}
          style={{
            width: `${props.width}px`,
            height: `${getHeight()}px`,
            top: `${getTop()}px`,
            left: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
