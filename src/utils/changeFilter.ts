/**
 * Allows to have a callback called when there is a difference between the two value
 */
export function triggerIfChanged(
  callback: (value: number) => void,
  lastValue: number,
  value: number,
  threshold: number = 0,
) {
  if (Math.abs(value - lastValue) > threshold) {
    callback(value);
  }
}
