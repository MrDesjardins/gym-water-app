import { ChartData } from "../components/RepsTempo/canvasModel";
import { throttle } from "../utils/throttle";
import { fakeDistanceSensor } from "./fakeDistanceSensor";

export function distanceSensor(
  repNumber: number,
  repGroupId: number,
  callbackNewDataPoint: (newDataPoint: ChartData, repGroupId: number) => boolean,
  callbackOver: () => void,
): ReturnType<typeof fakeDistanceSensor> {
  let startedTime = Date.now();
  let currentRep = 0;
  let lastCm = 0;
  let lastSec = 0;
  let isGoingDown = false;
  const handleData = (cm: number, timeMs: number): void => {
    lastSec = (timeMs - startedTime) / 1000;
    if (cm < lastCm) {
      isGoingDown = true;
    }
    if (isGoingDown && lastCm < cm) {
      // This might not be totally good. We usually not go to zero when we change rep...
      lastCm = 0; // Reset the distance for the rep
      startedTime = Date.now(); // Reset the time for th rep
      currentRep++; // Next rep
      isGoingDown = false; // Reset the direction
    } else if (currentRep < repNumber) {
      lastCm = cm;
      callbackNewDataPoint({ distanceInCm: cm, timeInSec: lastSec, repetitionIndex: currentRep }, repGroupId);
    } else {
      callbackOver();
      distanceSensor.stop(); // Stop listening the sensor
    }
  };

  const distanceSensor = fakeDistanceSensor(throttle(handleData, 100));
  return distanceSensor;
}
