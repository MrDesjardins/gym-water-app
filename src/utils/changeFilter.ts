export function triggerIfChanged(
  callback: (value: number) => void,
  lastValue: number,
  value: number,
  threshold: number = 0,
) {
  if (Math.abs(value - lastValue) >= threshold) {
    lastValue = value;
    callback(value);
  }
}
