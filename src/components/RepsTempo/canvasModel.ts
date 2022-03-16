/**
 * Expect to have a list of list of ChartData.
 *
 * Each list is 1 rep.
 *
 * Each repetition can have many chart data.
 */
 export interface ChartData {
  repetitionIndex: number; // Start at 0 to the number of repetition for the set -1. E.g. A set of 12 repetitions start at 0 and end at 11.
  timeInMs: number; // Time in ms since the start of the set
  distanceInCm: number; // Can be a fraction like 1.23 cm
}

export const PIXEL_VERTICAL_TOP = 30;
export const PIXEL_VERTICAL_BOTTOM = 30;
export const PIXEL_HORIZONTAL_LEFT = 40;
export const MAX_CM_IN_CHART = 45;
export const MAX_SEC_IN_CHART = 6;