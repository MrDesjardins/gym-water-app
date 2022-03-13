import { ChartData } from "../components/RepsTempo/canvasModel";

/**
 * Provide a stream of distance that goes up around a maximum and down again to zero
 * for a given number of repetition. It simulates a set of x repetition with different
 * callback in time and in distance
 */
export function fakeDistanceSensor(
  repNumber: number,
  repGroupId: number,
  callback: (newChartData: ChartData, repGroupId: number) => boolean,
  callbackOver: () => void,
): void {
  let lastCm = 0;
  let lastSec = 0;
  let currentRep = 0;
  let direction = 1;
  let startedTime = Date.now();
  const loop = () => {
    if (lastCm > 40) {
      direction = -1;
    }
    if (lastCm <= 0) {
      direction = 1;
    }
    lastCm += (2 + Math.random() * 5) * direction;
    if (direction === 1) {
      lastCm += 0.5;
    }
    lastSec = (Date.now() - startedTime) / 1000;

    if (lastCm <= 0) {
      // This might not be totally good. We usually not go to zero when we change rep...
      lastCm = 0;
      if (
        !callback(
          {
            distanceInCm: lastCm,
            timeInSec: lastSec,
            repetitionIndex: currentRep,
          },
          repGroupId,
        )
      ) {
        return;
      }
      startedTime = Date.now();
      currentRep++;
      setTimeout(loop, 50 + Math.random() * 400);
    } else if (currentRep < repNumber) {
      if (
        !callback(
          {
            distanceInCm: lastCm,
            timeInSec: lastSec,
            repetitionIndex: currentRep,
          },
          repGroupId,
        )
      ) {
        return;
      }
      setTimeout(loop, 10 + Math.random() * 300);
    } else {
      callbackOver();
    }
  };
  setTimeout(loop, 0);
}
