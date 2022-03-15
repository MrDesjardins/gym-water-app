import { getExercise } from "./exercise";
import { ExerciseSet, WorkoutExercise } from "./exerciseSet";

export interface Workout {
  /**
   * Will be displayed at the top header (under "Training, next to the type of way to do the exercise)
   **/
  workoutName: string;
  workoutExercises: WorkoutExercise[];
}

// To be replaced with a fetch to get the workout from outside the machine
export const workouts: Workout[] = [
  {
    workoutName: "Arm Day",
    workoutExercises: [
      {
        exercise: getExercise(1),
        exerciseSets: [
          { weight: 40, reps: 16 },
          { weight: 45, reps: 12 },
          { weight: 50, reps: 10 },
          { weight: 55, reps: 8 },
          { weight: 50, reps: 6 },
          { weight: 50, reps: 6 },
        ],
      },
      {
        exercise: getExercise(2),
        exerciseSets: [
          { weight: 20, reps: 16 },
          { weight: 20, reps: 12 },
          { weight: 20, reps: 10 },
        ],
      },
      {
        exercise: getExercise(4),
        exerciseSets: [
          { weight: 20, reps: 16 },
          { weight: 22, reps: 12 },
          { weight: 25, reps: 10 },
          { weight: 30, reps: 10 },
          { weight: 30, reps: 10 },
        ],
      },
      {
        exercise: getExercise(2),
        exerciseSets: [
          { weight: 25, reps: 12 },
          { weight: 30, reps: 10 },
          { weight: 35, reps: 8 },
          { weight: 40, reps: 6 },
          { weight: 40, reps: 6 },
        ],
      },
    ],
  },
  {
    workoutName: "Back and Shoulder Day",
    workoutExercises: [
      {
        exercise: getExercise(3),
        exerciseSets: [
          { weight: 100, reps: 16 },
          { weight: 120, reps: 12 },
          { weight: 135, reps: 10 },
          { weight: 140, reps: 8 },
          { weight: 145, reps: 8 },
        ],
      },
      {
        exercise: getExercise(10),
        exerciseSets: [
          { weight: 10, reps: 12 },
          { weight: 10, reps: 12 },
          { weight: 10, reps: 12 },
        ],
      },
      {
        exercise: getExercise(6),
        exerciseSets: [
          { weight: 120, reps: 12 },
          { weight: 120, reps: 12 },
          { weight: 140, reps: 8 },
          { weight: 140, reps: 8 },
        ],
      },
    ],
  },
  {
    workoutName: "Dev Tempo Small",
    workoutExercises: [
      {
        exercise: getExercise(1),
        exerciseSets: [{ weight: 40, reps: 6 }],
      },
    ],
  },
];
export function getOrderedWorkouts(): Workout[] {
  return workouts;
}
