import { useLocation } from "solid-app-router";
import { createMemo, createSignal } from "solid-js";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { Workout } from "../../models/workout";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import { WorkoutExercises } from "./WorkoutExercises";
import { WorkoutExerciseSets } from "./WorkoutExerciseSets";
import styles from "./WorkoutGo.module.css";

export const WorkoutGo = () => {
  const location = useLocation();
  const [activeExerciseIndex, setActiveExerciseIndex] = createSignal(0);
  const [activeSetIndex, setActiveSetIndex] = createSignal(0);
  const [repGroupId, setRepGroupId] = createSignal(0);

  const workout = location.state as Workout;
  const currentExercise = createMemo(() => {
    return workout.workoutExercises[activeExerciseIndex()];
  });
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
      <div class={styles.WorkoutGoSets}>
        <WorkoutExerciseSets workoutExercise={currentExercise()} activeSet={activeSetIndex()} />
      </div>
      <div class={styles.WorkoutGoTempo}>
        <RepsTempo repGroupId={repGroupId()} height={400} width={430} />
      </div>
    </MainStructure>
  );
};
