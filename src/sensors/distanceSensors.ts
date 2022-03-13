import { ChartData } from "../components/RepsTempo/canvasModel";
import { fakeDistanceSensor } from "./fakeDistanceSensor";

export function distanceSensor(
  repNumber: number,
  repGroupId: number,
  callback: (newChartData: ChartData, repGroupId: number) => boolean,
  callbackOver: () => void,
): void {
  let startedTime = Date.now();
  let currentRep = 0;
  let lastCm = 0;
  let lastSec = 0;
  let isGoingDown = false;
  fakeDistanceSensor(startedTime, (cm: number, timeMs: number) => {
    lastSec = (Date.now() - startedTime) / 1000;
    if (cm < lastCm) {
      isGoingDown = true;
    }
    if (isGoingDown && lastCm < cm) {
      // This might not be totally good. We usually not go to zero when we change rep...
      lastCm = 0; // Reset the distance for the rep
      startedTime = Date.now(); // Reset the time for th rep
      currentRep++; // Next rep
      isGoingDown = false; // Reset the direction
      return true;
    } else if (currentRep < repNumber) {
      lastCm = cm;
      callback({ distanceInCm: cm, timeInSec: lastSec, repetitionIndex: currentRep }, repGroupId);
      return true;
    } else {
      callbackOver();
      return false;
    }
  });
}
