import { useLocation } from "solid-app-router";
import { createSignal } from "solid-js";
import { Workout } from "../../models/workout";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import { WorkoutExercises } from "./WorkoutExercises";
import styles from "./WorkoutGo.module.css";

export const WorkoutGo = () => {
  const location = useLocation();
  const [activeExerciseIndex, setActiveExerciseIndex] = createSignal(0);
  const workout = location.state as Workout;
  return (
    <MainStructure
      title="Training"
      subtitle="Workout"
      subtitleDetail={workout.workoutName}
      backButtonLink={getMainRoutes()}
    >
      <div class={styles.WorkoutGoExercise}>
        <WorkoutExercises exercises={workout.workoutExercises} activeExercise={activeExerciseIndex()} />
      </div>
      <div class={styles.WorkoutGoSets}>Test</div>
      <div class={styles.WorkoutGoTempo}>Test</div>
    </MainStructure>
  );
};
