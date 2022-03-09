export const ROUTES = {
  HOME: "/",
  STORYBOOK: "/storybook",
  MAIN: "/main",
  ADHOC: "/adhoc-training",
  SINGLE_EXERCISE: "/single-exercise",
  WORKOUT: "/workout",
};

export function getMainRoutes(route: string): string {
  return `${ROUTES.MAIN}${route}`;
}
