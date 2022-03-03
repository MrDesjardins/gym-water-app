import { createSignal } from "solid-js";
import styles from "./SingleWeightSelector.module.css";
export interface SingleWeightSelectorProps {
  minimumWeight: number;
  maximumWeight: number;
  defaultWeight: number;
  width: number;
  height: number;
}
const TEXT_HEIGHT = 20;
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
  return (
    <div
      class={styles.SingleWeightSelector}
      style={{
        width: `${props.width + TEXT_HEIGHT}px`,
        height: `${props.height + TEXT_HEIGHT}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorTitle}>Weight</div>
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
