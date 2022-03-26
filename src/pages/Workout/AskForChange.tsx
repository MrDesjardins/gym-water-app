import { Workout } from "../../models/workout";

import { batch, createEffect, createSignal, JSX, on } from "solid-js";
import styles from "./AskForChange.module.css";
import { CONSTANTS } from "../../models/constants";
import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { RepSelector } from "../../components/RepsSelector/RepSelector";
import { WorkoutExercise } from "../../models/exerciseSet";
import { Button } from "../../components/Button/Button";
import { FaSolidRunning } from "solid-icons/fa";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
export interface AskForChangeProps {
  workout: Workout | undefined;
  workoutExercise: WorkoutExercise | undefined;
  exerciseIndex: number;
  workoutCompleted: boolean;
}

const COMPONENT_HEIGHT = 400;
const REP_SELECTOR_WIDTH = 50;
const ADD_SET_WIDTH = REP_SELECTOR_WIDTH + 70;
const REP_CHOICES = [6, 8, 10, 12, 16, 20];

export const AskForChange = (props: AskForChangeProps): JSX.Element => {
  const serverCommunication = useServerCommunication();
  const [lastWorkoutExercise, setLastWorkoutExercise] = createSignal<WorkoutExercise | undefined>(undefined);
  const [currentWorkoutExercise, setCurrentWorkoutExercise] = createSignal<WorkoutExercise | undefined>(
    undefined,
  );

  createEffect(
    on(
      () => [props.workoutExercise, props.workoutCompleted],
      () => {
        if (props.workoutExercise !== lastWorkoutExercise() && props.workoutExercise !== undefined) {
          console.log("===> SHOW", currentWorkoutExercise(), props.workoutExercise);
          batch(() => {
            setLastWorkoutExercise(currentWorkoutExercise());
            setCurrentWorkoutExercise(props.workoutExercise);
          });
        }
      },
    ),
  );

  // createEffect(() => {
  //   console.log(currentWorkoutExercise(), lastWorkoutExercise());
  // });

  return (
    <>
      {lastWorkoutExercise() === undefined ||
      props.workout === undefined ||
      props.workout.id === CONSTANTS.ADHOC_WORKOUT_ID ? null : (
        <div class={styles.AskForChange}>
          <div class={styles.selector}>
            {lastWorkoutExercise()?.exerciseSets.map((set, i) => (
              <div class={styles.oneset} style={{ flex: `0 0 ${ADD_SET_WIDTH}px` }}>
                <div class={styles.child1}>
                  <SingleWeightThinSelector
                    showActualWeight={false}
                    actualWeight={set.weight}
                    desiredWeight={set.weight}
                    minimumWeight={CONSTANTS.MIN_WEIGHT}
                    maximumWeight={CONSTANTS.MAX_WEIGHT}
                    getCurrentWeight={(weight) => {
                      lastWorkoutExercise()!.exerciseSets[i].weight = weight;
                    }}
                    height={COMPONENT_HEIGHT}
                  />
                </div>
                <div class={styles.child1}>
                  <RepSelector
                    height={COMPONENT_HEIGHT}
                    width={REP_SELECTOR_WIDTH}
                    repsChoices={REP_CHOICES}
                    repSelection={set.reps}
                    getCurrentReps={(reps) => {
                      lastWorkoutExercise()!.exerciseSets[i].reps = reps;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div class={styles.AskForChangeButton}>
            <Button
              class={styles.next}
              onClick={() => {
                const workout = props.workout;
                const exerciseModified = lastWorkoutExercise()!;
                if (workout !== undefined) {
                  for (let i = 0; i < workout.workoutExercises.length; i++) {
                    if (workout.workoutExercises[i].exercise.id === exerciseModified.exercise.id) {
                      workout.workoutExercises[i] = { ...exerciseModified };
                    }
                  }
                  serverCommunication?.client.saveWorkout(workout);
                  setLastWorkoutExercise(undefined);
                }
              }}
            >
              Next
              <FaSolidRunning size={24} color="#fff" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
