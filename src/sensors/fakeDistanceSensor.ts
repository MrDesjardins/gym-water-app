import { SensorObserverPayload } from "./distanceSensors";

export function fakeDistanceSensor(send: (data: SensorObserverPayload) => void): {
  start: () => void;
  stop: () => void;
} {
  let lastCm = 0;
  let direction = 1;
  let ref = 0;
  let continueReceiveData = false;
  const loop = () => {
    if (continueReceiveData) {
      if (lastCm > 40) {
        direction = -1;
      }
      if (lastCm <= Math.random() * 10) {
        // We might start a new rep not at exactly 0 cm from the bottom
        direction = 1;
      }
      lastCm += (0.2 + Math.random() * 1) * direction;
      send({ cm: lastCm, fullDateTimeInMs: Date.now() });
      clearTimeout(ref);
      ref = setTimeout(() => loop(), 1 + Math.random() * 60); // Next fake fetched data in few ms
    } else {
      clearTimeout(ref);
    }
  };

  return {
    start: () => {
      continueReceiveData = false;
      clearTimeout(ref);
      continueReceiveData = true;
      ref = setTimeout(() => loop(), 0); // Start getting fake data
    },
    stop: () => {
      continueReceiveData = false;
      clearTimeout(ref);
      lastCm = 0;
      direction = 1;
    },
  };
}
