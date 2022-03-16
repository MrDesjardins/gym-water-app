import { MagneticContactSensorObserverPayload } from "../magneticContactSensor";

/**
 * Connect with WebSocker to the NodeJS server that is connected to all the sensors.
 **/
export function magneticSensor(send: (data: MagneticContactSensorObserverPayload) => void): {
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
