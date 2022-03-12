import { createMemo } from "solid-js";
import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { CONSTANTS } from "../../models/constants";
import { WorkoutExercise } from "../../models/exerciseSet";
import styles from "./WorkoutExerciseSets.module.css";
export interface WorkoutExerciseSetsProps {
  workoutExercise: WorkoutExercise;
  activeSet: number;
}

const WIDTH = 50; // Size of the width of the weight of the current set
const OFFSET = 40; // Margin
function getLeft(activeIndex: number): number {
  // We do not move for the first 3 sets, the move to keep always in view the current set
  if (activeIndex >= 3) {
    return -OFFSET - WIDTH * activeIndex + 2 * WIDTH;
  } else {
    return -OFFSET;
  }
}
export const WorkoutExerciseSets = (props: WorkoutExerciseSetsProps) => {
  /**
   * Get a max weight that skew the visual to be more interesting from 0 to 20% above the max of the set instead of the max
   * that the machine can handle
   */
  const getMaxWeightForSet = createMemo(() => {
    return CONSTANTS.MAX_WEIGHT;
    // return Math.min(
    //   props.workoutExercise.exerciseSets
    //     .map((d) => d.weight)
    //     .reduce((acc, curr) => {
    //       return Math.max(acc, curr);
    //     }) * 1.2,
    //   CONSTANTS.MAX_WEIGHT,
    // );
  });
  console.log(getMaxWeightForSet());
  return (
    <>
      <div class={styles.curtainLeft} />
      <div class={styles.WorkoutExerciseSets}>
        <div class={styles.Moveable} style={{ left: `${getLeft(props.activeSet)}px` }}>
          {props.workoutExercise.exerciseSets.map((set, i) => (
            <div classList={{ [styles.oneset]: true, [styles.notactive]: i !== props.activeSet }}>
              <div class={styles.topControl}>
                <SingleWeightThinSelector
                  defaultWeight={set.weight}
                  height={380}
                  width={WIDTH}
                  minimumWeight={CONSTANTS.MIN_WEIGHT}
                  maximumWeight={getMaxWeightForSet()}
                  getCurrentWeight={(weight) => {}}
                  turnOffHandle={true}
                />
              </div>
              <div class={styles.bottomControl}>{set.reps} reps</div>
            </div>
          ))}
        </div>
      </div>
      <div class={styles.curtainRight} />
    </>
  );
};
