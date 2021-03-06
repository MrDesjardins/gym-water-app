import { getExercise } from "../src/models/exercise";
import { Workout } from "../src/models/workout";

// To be replaced with a fetch to get the workout from outside the machine
export const fakeWorkout: Workout[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    workoutName: "Dev 1 Set",
    workoutExercises: [
      {
        exercise: getExercise(1),
        exerciseSets: [{ weight: 40, reps: 6 }],
      },
    ],
  },
  {
    id: 4,
    workoutName: "Dev 2 Exercise",
    workoutExercises: [
      {
        exercise: getExercise(1),
        exerciseSets: [
          { weight: 10, reps: 6 },
          { weight: 20, reps: 6 },
        ],
      },
      {
        exercise: getExercise(2),
        exerciseSets: [
          { weight: 50, reps: 12 },
          { weight: 60, reps: 16 },
        ],
      },
    ],
  },
];
