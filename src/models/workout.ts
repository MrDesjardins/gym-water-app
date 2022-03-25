import { getExercise } from "./exercise";
import { WorkoutExercise } from "./exerciseSet";

export interface Workout {
  /**
   * Will be displayed at the top header (under "Training, next to the type of way to do the exercise)
   **/
  workoutName: string;
  workoutExercises: WorkoutExercise[];
}
