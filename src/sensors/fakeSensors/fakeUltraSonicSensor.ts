import { UltraSonicSensorActions, UltraSonicSensorObserverPayload } from "../ultraSonicSensor";

export const FakeUltraSonirSensorSingleton = {
  isMoving: false,
};

/**
 * Generate random distance to simulate someone moving the water weight up and down.
 **/
export function fakeUltraSonicSensor(
  send: (data: UltraSonicSensorObserverPayload) => void,
): UltraSonicSensorActions {
  let lastCm = 0;
  let direction = 1;
  let ref = 0;
  let lastIsMoving = FakeUltraSonirSensorSingleton.isMoving;
  const loop = () => {
    if (FakeUltraSonirSensorSingleton.isMoving) {
      if (lastIsMoving === false) {
        lastCm = 0;
        direction = 1;
      }
      if (lastCm > 40) {
        direction = -1;
      }
      if (lastCm <= Math.random() * 10) {
        // We might start a new rep not at exactly 0 cm from the bottom
        direction = 1;
      }
      lastCm += (0.2 + Math.random() * 1) * direction;
      send({ cm: lastCm, fullDateTimeInMs: Date.now() });
    }
    lastIsMoving = FakeUltraSonirSensorSingleton.isMoving;
    clearTimeout(ref);
    ref = setTimeout(() => loop(), 1 + Math.random() * 60); // Next fake fetched data in few ms
  };
  ref = setTimeout(() => loop(), 0); // Start getting fake data
  return {};
}
