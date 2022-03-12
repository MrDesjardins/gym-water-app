import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { CONSTANTS } from "../../models/constants";
import { WorkoutExercise } from "../../models/exerciseSet";
import styles from "./WorkoutExerciseSets.module.css";
export interface WorkoutExerciseSetsProps {
  workoutExercise: WorkoutExercise;
  activeSet: number;
}

const FULL_WIDTH_SETS = 350; // Calculated from  data in WorkoutGo.module.css flex weight (auto) of 1024-250-450-margins
const WIDTH = 50;
function getLeft(activeIndex: number): number {
  // With 350 we can clearly see 4 sets, so if we are reaching
  //the set 4, we need to move left at least 1 set which is defined by the width constant
  if (activeIndex > 4) {
    return -WIDTH * (activeIndex - 4);
  }
  return 0;
}
export const WorkoutExerciseSets = (props: WorkoutExerciseSetsProps) => {
  return (
    <div class={styles.WorkoutExerciseSets}>
      <div class={styles.Moveable} style={{ left: getLeft(props.activeSet) }}>
        {props.workoutExercise.exerciseSets.map((set, i) => (
          <div classList={{ [styles.oneset]: true, [styles.notactive]: i !== props.activeSet }}>
            <SingleWeightThinSelector
              defaultWeight={set.weight}
              height={420}
              width={WIDTH}
              minimumWeight={CONSTANTS.MIN_WEIGHT}
              maximumWeight={CONSTANTS.MAX_WEIGHT}
              getCurrentWeight={(weight) => {}}
              turnOffHandle={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
