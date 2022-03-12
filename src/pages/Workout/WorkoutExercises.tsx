import { WorkoutExercise } from "../../models/exerciseSet";

import styles from "./WorkoutExercises.module.css";

export interface WorkoutExercisesProps {
  activeExercise: number; // Index in the array of exercise
  exercises: WorkoutExercise[];
}
export const WorkoutExercises = (props: WorkoutExercisesProps) => {
  return (
    <div class={styles.WorkoutExercises}>
      {props.exercises.map((exercise, i) => {
        return (
          <ol>
            <li classList={{ [styles.notactive]: i !== props.activeExercise }}>
              {exercise.exercise.displayName}
            </li>
          </ol>
        );
      })}
    </div>
  );
};
