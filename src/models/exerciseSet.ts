export interface ExerciseSet {
  reps: number;
  weight: number;
}
export function getNewSet(): ExerciseSet {
  return {
    reps:10,
    weight:30
  };
}