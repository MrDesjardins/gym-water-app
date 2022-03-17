import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { MovablePanel } from "../../components/MovablePanel/MovablePanel";
import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { CONSTANTS } from "../../models/constants";
import { WorkoutExercise } from "../../models/exerciseSet";
import { useSensors } from "../../sensors/context/SensorsContext";
import { WeightSensorObserverPayload } from "../../sensors/weightSensor";
import styles from "./WorkoutExerciseSets.module.css";
export interface WorkoutExerciseSetsProps {
  workoutExercise: WorkoutExercise;
  activeSet: number;
}

const PADDING = 20; // Space between sets
const WIDTH = 50; // Size of the width of the weight of the current set
const OFFSET = 40; // Margin from the windowß
function getLeft(activeIndex: number): number {
  // We do not move for the first 3 sets, the move to keep always in view the current set
  if (activeIndex >= 3) {
    return -OFFSET - (WIDTH + PADDING) * activeIndex + 2 * (WIDTH + PADDING);
  } else {
    return -OFFSET;
  }
}
export const WorkoutExerciseSets = (props: WorkoutExerciseSetsProps) => {
  const [actualWeight, setActualWeight] = createSignal(0);
  const sensors = useSensors();

  const weightCallback = (payload: WeightSensorObserverPayload) => {
    setActualWeight(payload.lbs);
  };
  
  onMount(() => {
    sensors?.sensors.weightSensor.subscribe(weightCallback);
    sensors?.sensors.weightSensor.startListening();

    onCleanup(() => {
      sensors?.sensors.weightSensor.stopListening();
      sensors?.sensors.weightSensor.unsubscribe(weightCallback);
    });
  });
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
  return (
    <MovablePanel getLeft={() => getLeft(props.activeSet)} class={styles.WorkoutExerciseSets}>
      {props.workoutExercise.exerciseSets.map((set, i) => {
        const isActiveSet = i !== props.activeSet;
        return (
          <div
            classList={{ [styles.oneset]: true, [styles.notactive]: isActiveSet }}
            style={{ flex: `0 0 ${WIDTH + PADDING}px` }}
          >
            <div class={styles.topControl}>
              <SingleWeightThinSelector
                actualWeight={isActiveSet ? set.weight : actualWeight()}
                desiredWeight={set.weight}
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
        );
      })}
    </MovablePanel>
  );
};
