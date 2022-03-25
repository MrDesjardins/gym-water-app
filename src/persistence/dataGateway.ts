import { ExerciseSet } from "../models/exerciseSet";
import { Workout } from "../models/workout";
import { fakeWorkouts } from "./fakeData";

/**
 * Data gateway to persistence
 **/
export class DataGateway {
  private static KEY_SINGLE_EXERCISE_SET = "singleExerciseSet_";
  public getLastExercisesSet(exerciseId: number): ExerciseSet[] {
    const dataFromLocalStorage = localStorage.getItem(
      DataGateway.KEY_SINGLE_EXERCISE_SET + exerciseId.toString(),
    );
    if (dataFromLocalStorage === null) {
      return [];
    } else {
      return JSON.parse(dataFromLocalStorage);
    }
  }

  public saveLastExerciseSet(exerciseId: number, exerciseSet: ExerciseSet[]): void {
    localStorage.setItem(
      DataGateway.KEY_SINGLE_EXERCISE_SET + exerciseId.toString(),
      JSON.stringify(exerciseSet),
    );
  }

  public getAllWorkouts(): Workout[] {
    return fakeWorkouts;
  }
}

export const dataGateway = new DataGateway();
