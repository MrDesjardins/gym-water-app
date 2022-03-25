import createDebounce from "@solid-primitives/debounce";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import "../ComponentVariables.css";
import { SingleWeightSelectorHandle } from "../SingleWeightSelector/SingleWeightSelectorHandle";
import styles from "./SingleWeightThinSelector.module.css";
export interface SingleWeightThinSelectorProps {
  minimumWeight: number;
  maximumWeight: number;
  desiredWeight: number;
  actualWeight: number;
  height: number;
  getCurrentWeight: (weight: number) => void;
  turnOffHandle?: boolean;
  width?: number;
  showActualWeight?: boolean;
}
const HANDLE_SIZE = 60;
const TEXT_HEIGHT = 40;
const WIDTH = 20;

export const SingleWeightThinSelector = (props: SingleWeightThinSelectorProps) => {
  const [currentWeight, setCurrentWeight] = createSignal(props.desiredWeight);
  const [isDragging, setIsDragging] = createSignal(false);

  const getWaterHeight = createMemo((): number => {
    return (currentWeight() / (props.maximumWeight - props.minimumWeight)) * (props.height - TEXT_HEIGHT);
  });

  const getActualWaterHeight = createMemo((): number => {
    return (props.actualWeight / (props.maximumWeight - props.minimumWeight)) * (props.height - TEXT_HEIGHT);
  });

  const getWaterTop = createMemo((): number => {
    return props.height - getWaterHeight();
  });

  const getActualWaterTop = createMemo((): number => {
    return props.height - getActualWaterHeight();
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
  const deb = createDebounce((value: number) => props.getCurrentWeight(value), 200);
  createEffect(() => {
    deb(currentWeight());
  });
  onCleanup(() => {
    deb.clear();
  });

  const isShowingActualWeight = createMemo(() => props.showActualWeight ?? true);
  return (
    <div
      ref={containerRef}
      class={styles.SingleWeightThinSelector}
      style={{
        width: `${HANDLE_SIZE}px`,
        height: `${props.height}px`,
      }}
    >
      <div class={styles.SingleWeightSelectorThinTitle}>
        <div class={styles.SingleWeightSelectorThinTitleText}>{currentWeight()}</div>
        <div class={styles.SingleWeightSelectorThinTitleLbs}>lbs</div>
      </div>
      {props.turnOffHandle === undefined || props.turnOffHandle === false ? (
        <SingleWeightSelectorHandle
          offsetY={getOffset()}
          titleOffset={TEXT_HEIGHT}
          handleSize={HANDLE_SIZE}
          parentHeight={props.height}
          defaultTop={getHandleTop()}
          defaultLeft={0}
          updateTop={(pixel) => {
            setCurrentWeight(() => {
              let newWeight = Math.round((props.height - HANDLE_SIZE - pixel) / getOneLbsPixelEquivalence());

              return newWeight;
            });
          }}
          isDragging={(dragging: boolean) => {
            setIsDragging(dragging);
          }}
        />
      ) : null}
      <div
        class={styles.SingleWeightThinSelectorWaterTank}
        style={{
          width: `${props.width ?? WIDTH}px`,
          height: `${props.height - TEXT_HEIGHT}px`,
          "margin-top": `${TEXT_HEIGHT}px`,
        }}
      >
        <div
          class={styles.SingleWeightThinSelectorWaterTankWater}
          style={{
            opacity: isShowingActualWeight() ? (props.actualWeight < currentWeight() ? 0.5 : 1) : 1,
            width: `${props.width ?? WIDTH}px`,
            height: `${getWaterHeight()}px`,
            top: `${getWaterTop()}px`,
            left: 0,
          }}
        ></div>
        {isShowingActualWeight() ? (
          <div
            class={styles.SingleWeightSelectorActualWaterTankWater}
            classList={{
              [styles.SingleWeightSelectorActualWaterTankWater_Same]: props.actualWeight === currentWeight(),
              [styles.SingleWeightSelectorActualWaterTankWater_Diff]: props.actualWeight !== currentWeight(),
            }}
            style={{
              opacity: props.actualWeight >= currentWeight() ? 0.5 : 1,
              width: props.actualWeight === currentWeight() ? 0 : `${props.width}px`,
              height: `${getActualWaterHeight()}px`,
              top: `${getActualWaterTop()}px`,
              left: 0,
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};
