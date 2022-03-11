export enum ExerciseCategory {
  BICEP = "BICEP",
  TRICEP = "TRICEP",
  BACK = "BACK",
  SHOULDER = "SHOULDER",
  CHEST = "CHEST",
  LEG = "LEG",
  ABS = "ABS",
}
export interface Exercise {
  id: number;
  displayName: string;
  category: ExerciseCategory;
  displayOrder: number;
}

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    displayName: "Tricep Push Down",
    category: ExerciseCategory.TRICEP,
    displayOrder: 1,
  },
  {
    id: 2,
    displayName: "Bicep Curl",
    category: ExerciseCategory.BICEP,
    displayOrder: 4,
  },
  {
    id: 3,
    displayName: "Pulldown",
    category: ExerciseCategory.BACK,
    displayOrder: 7,
  },
  {
    id: 4,
    displayName: "Tricep Reverse Push Down",
    category: ExerciseCategory.TRICEP,
    displayOrder: 2,
  },
  {
    id: 5,
    displayName: "Bicep Reverse Curl",
    category: ExerciseCategory.BICEP,
    displayOrder: 5,
  },
  {
    id: 6,
    displayName: "Back Rowing",
    category: ExerciseCategory.BACK,
    displayOrder: 7,
  },
  {
    id: 7,
    displayName: "One Arm Tricep Push Down",
    category: ExerciseCategory.TRICEP,
    displayOrder: 3,
  },
  {
    id: 8,
    displayName: "One Arm Bicep Curl",
    category: ExerciseCategory.BICEP,
    displayOrder: 6,
  },
  {
    id: 10,
    displayName: "One Arm Shoulder Bottom-Up",
    category: ExerciseCategory.SHOULDER,
    displayOrder: 9,
  },
  {
    id: 11,
    displayName: "One Arm Shoulder Up-Bottom",
    category: ExerciseCategory.SHOULDER,
    displayOrder: 10,
  },
];

export function getOrderedExercices(): Exercise[] {
  return EXERCISES.sort((a, b) => a.displayOrder - b.displayOrder);
}
