import { UltraSonicSensorActions, UltraSonicSensorObserverPayload } from "../ultraSonicSensor";

/**
 * Connect with WebSocker to the NodeJS server that is connected to all the sensors.
 **/
export function physicalUltraSonicSensor(
  send: (data: UltraSonicSensorObserverPayload) => void,
): UltraSonicSensorActions {
  let continueReceiveData = false;
  const webSockerReceiveMessage = () => {
    if (continueReceiveData) {
    }
  };

  return {};
}
