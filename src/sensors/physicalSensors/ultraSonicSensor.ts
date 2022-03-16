import { UltraSonicSensorObserverPayload } from "../ultraSonicSensor";

/**
 * Connect with WebSocker to the NodeJS server that is connected to all the sensors.
 **/
export function ultraSonicSensor(send: (data: UltraSonicSensorObserverPayload) => void): {
  start: () => void;
  stop: () => void;
} {
  let continueReceiveData = false;
  const webSockerReceiveMessage = () => {
    if (continueReceiveData) {
    }
  };

  return {
    start: () => {
      continueReceiveData = true;
    },
    stop: () => {
      continueReceiveData = false;
    },
  };
}
