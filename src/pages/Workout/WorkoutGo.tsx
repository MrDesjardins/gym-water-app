import { useLocation, useNavigate } from "solid-app-router";
import { batch, createEffect, createMemo, createSignal, on } from "solid-js";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { WaterScreen } from "../../components/Transitions/WaterScreen";
import { Workout } from "../../models/workout";
import { useSensors } from "../../sensors/SensorsContext";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import { WorkoutExercises } from "./WorkoutExercises";
import { WorkoutExerciseSets } from "./WorkoutExerciseSets";
import styles from "./WorkoutGo.module.css";

export const WorkoutGo = () => {
  const location = useLocation();
  const sensors = useSensors();
  const [activeExerciseIndex, setActiveExerciseIndex] = createSignal(0);
  const [activeSetIndex, setActiveSetIndex] = createSignal(0);
  const [workoutCompleted, setWorkoutCompleted] = createSignal(false);
  const workout = location.state as Workout;
  const currentExercise = createMemo(() => {
    return workout.workoutExercises[activeExerciseIndex()];
  });
  const currentSet = createMemo(() => {
    return currentExercise().exerciseSets[activeSetIndex()];
  });

  createEffect(
    on(
      () => sensors?.state.contactSensorIsClosed,
      () => {
        if (sensors !== undefined) {
          if (sensors.state.contactSensorIsClosed) {
            goToNextSetOrExercise();
          }
        }
      },
      { defer: true }, // Need to defer: we do not want any execution on the first render, only when a change occurs
    ),
  );
  const goToNextSetOrExercise = () => {
    const e = currentExercise();
    const s = e.exerciseSets;
    if (activeSetIndex() < s.length - 1) {
      batch(() => {
        setActiveSetIndex((prev) => prev + 1);
      });
    } else {
      if (activeExerciseIndex() < workout.workoutExercises.length - 1) {
        // Next exercise
        batch(() => {
          setActiveSetIndex(0);
          setActiveExerciseIndex(activeExerciseIndex() + 1);
        });
      } else {
        console.log("Workout is done!");
        batch(() => {
          setWorkoutCompleted(true);
        });
      }
    }
  };
  return (
    <MainStructure
      title="Training"
      subtitle="Workout"
      subtitleDetail={workout.workoutName}
      backButtonLink={getMainRoutes()}
    >
      {workoutCompleted() ? <WaterScreen /> : null}
      <div class={styles.WorkoutGoExercise}>
        <WorkoutExercises exercises={workout.workoutExercises} activeExercise={activeExerciseIndex()} />
      </div>
      <div class={styles.WorkoutGoSets}>
        <WorkoutExerciseSets workoutExercise={currentExercise()} activeSet={activeSetIndex()} />
      </div>
      <div class={styles.WorkoutGoTempo}>
        <RepsTempo height={400} width={430} expectedReps={currentSet().reps} />
      </div>
    </MainStructure>
  );
};
