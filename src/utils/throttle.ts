/**
 * Throttle a function that takes any number of argument without a return.
 *
 * The function does not rely on a timer, it throttles for a number of ms
 * and then take the data of the next call.
 */
export function throttle<T extends (...args: any[]) => void>(
  callback: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let lastExecutionTime = Date.now();

  return (...ar: any[]): void => {
    const now = Date.now();
    if (now - lastExecutionTime > ms) {
      lastExecutionTime = now;
      callback(...ar);
    }
  };
}
