import { MagneticContactSensorActions, MagneticContactSensorObserverPayload } from "../magneticContactSensor";

/**
 * Connect with WebSocker to the NodeJS server that is connected to all the sensors.
 **/
export function physicalMagneticSensor(
  send: (data: MagneticContactSensorObserverPayload) => void,
): MagneticContactSensorActions {
  let continueReceiveData = false;
  const webSockerReceiveMessage = () => {
    if (continueReceiveData) {
    }
  };
  return {};
}
