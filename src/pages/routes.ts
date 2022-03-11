export const ROUTES = {
  HOME: "/",
  STORYBOOK: "/storybook",
  MAIN: "/main",
  ADHOC: "/adhoc-training",
  SINGLE_EXERCISE: "/single-exercise",
  SINGLE_EXERCISE_ID: "/single-exercise/:exerciseId",
  WORKOUT: "/workout",
};

export function getMainRoutes(route: string = ""): string {
  return `${ROUTES.MAIN}${route}`;
}

export function getSingleExercise(exerciseId: number): string {
  return `${ROUTES.MAIN}${ROUTES.SINGLE_EXERCISE}/${exerciseId}`;
}
