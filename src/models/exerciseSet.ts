import { Exercise } from "./exercise";

export interface WorkoutExercise {
  exercise: Exercise;
  exerciseSets: ExerciseSet[];
}
export interface ExerciseSet {
  reps: number;
  weight: number;
}
export function getNewSet(): ExerciseSet {
  return {
    reps: 10,
    weight: 30,
  };
}
