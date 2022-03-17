import { useNavigate, useParams } from "solid-app-router";
import { BsArrowRight } from "solid-icons/bs";
import { createSignal } from "solid-js";
import { AddSet } from "../../components/AddSet/AddSet";
import { Button } from "../../components/Button/Button";
import { MovablePanel } from "../../components/MovablePanel/MovablePanel";
import { RepSelector } from "../../components/RepsSelector/RepSelector";
import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { CONSTANTS } from "../../models/constants";
import { getExercise } from "../../models/exercise";
import { ExerciseSet, getNewSet, WorkoutExercise } from "../../models/exerciseSet";
import { Workout } from "../../models/workout";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes, ROUTES } from "../routes";
import styles from "./SingleExercise.module.css";
export const SingleExercise = () => {
  const params = useParams();
  const navigate = useNavigate();

  const COMPONENT_HEIGHT = 400;
  const lastKnownWeightForExercise = 50;
  const REP_SELECTOR_WIDTH = 50;
  const ADD_SET_WIDTH = REP_SELECTOR_WIDTH + 70;
  const REP_CHOICES = [6, 8, 10, 12, 16, 20];
  const OFFSET = 40; // Margin
  const [setData, setSetData] = createSignal<ExerciseSet[]>([]);

  const exerciseDetail = getExercise(Number(params.exerciseId));

  if (exerciseDetail === undefined) {
    // Should never happen, but if the URL had a exercise ID that does not exist, we move back
    navigate(getMainRoutes(ROUTES.SINGLE_EXERCISE));
  }
  return (
    <MainStructure
      title="Training"
      subtitle="Per Exercise"
      subtitleDetail={exerciseDetail!.displayName}
      backButtonLink={getMainRoutes(ROUTES.SINGLE_EXERCISE)}
    >
      <div class={styles.choices}>
        <MovablePanel
          getLeft={() => {
            const len = setData().length;
            if (len >= 4) {
              return -OFFSET - ADD_SET_WIDTH * len + 4 * ADD_SET_WIDTH;
            } else {
              return -OFFSET;
            }
          }}
          class={styles.SingleExercise}
        >
          {setData().map((set, i) => (
            <div class={styles.oneset} style={{ flex: `0 0 ${ADD_SET_WIDTH}px` }}>
              <div class={styles.child1}>
                <SingleWeightThinSelector
                  desiredWeight={set.weight}
                  minimumWeight={CONSTANTS.MIN_WEIGHT}
                  maximumWeight={CONSTANTS.MAX_WEIGHT}
                  getCurrentWeight={(weight) => {
                    setData()[i].weight = weight;
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
                    setData()[i].reps = reps;
                  }}
                />
              </div>
            </div>
          ))}
          <AddSet
            showRemoveButton={setData().length > 0}
            width={ADD_SET_WIDTH}
            height={COMPONENT_HEIGHT}
            onAddClick={() => {
              setSetData((prev) => {
                const newData = prev.slice();
                newData.push(getNewSet());
                return newData;
              });
            }}
            onRemoveClick={() => {
              setSetData((prev) => {
                const newData = prev.slice();
                newData.pop();
                return newData;
              });
            }}
          >
            <div class={styles.oneset}>
              <div class={styles.child1}>
                <SingleWeightThinSelector
                  desiredWeight={lastKnownWeightForExercise}
                  minimumWeight={CONSTANTS.MIN_WEIGHT}
                  maximumWeight={CONSTANTS.MAX_WEIGHT}
                  getCurrentWeight={(weight) => {
                    console.log("Set the weight to: ", weight);
                  }}
                  height={COMPONENT_HEIGHT}
                />
              </div>
              <div class={styles.child1}>
                <RepSelector
                  height={COMPONENT_HEIGHT}
                  width={REP_SELECTOR_WIDTH}
                  repsChoices={REP_CHOICES}
                  getCurrentReps={(reps) => {
                    console.log("Rep Selector:", reps);
                  }}
                />
              </div>
            </div>
          </AddSet>
        </MovablePanel>
      </div>
      <div class={styles.buttonColumn}>
        <Button
          disabled={setData().length === 0}
          class={styles.right}
          onClick={() => {
            const singleWorkoutExercise: WorkoutExercise = {
              exercise: exerciseDetail!,
              exerciseSets: setData(),
            };
            const adhocWorkout: Workout = {
              workoutName: "Adhoc",
              workoutExercises: [singleWorkoutExercise],
            };
            navigate(getMainRoutes(ROUTES.WORKOUT_GO), {
              state: adhocWorkout,
            });
          }}
        >
          Next
          <BsArrowRight size={24} color="#fff" />
        </Button>
      </div>
    </MainStructure>
  );
};
