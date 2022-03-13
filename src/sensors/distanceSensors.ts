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
  fakeDistanceSensor(startedTime, (cm: number, timeMs: number) => {
    lastSec = (Date.now() - startedTime) / 1000;
    if (cm <= 0) {
      // This might not be totally good. We usually not go to zero when we change rep...
      lastCm = 0; // Reset the distance for the rep
      startedTime = Date.now(); // Reset the time for th rep
      currentRep++; // Next rep
      return true;
    } else if (currentRep < repNumber) {
      lastCm = cm;
      callback({ distanceInCm: lastCm, timeInSec: lastSec, repetitionIndex: currentRep }, repGroupId);
      return true;
    } else {
      callbackOver();
      return false;
    }
  });
}
