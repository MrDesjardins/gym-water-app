import { WeightSensorActions, WeightSensorObserverPayload } from "../weightSensor";

/**
 * Connect with WebSocker to the NodeJS server that is connected to all the sensors.
 **/
export function physicalWeightSensor(send: (data: WeightSensorObserverPayload) => void): WeightSensorActions {
  let continueReceiveData = false;
  const webSockerReceiveMessage = () => {
    if (continueReceiveData) {
    }
  };

  return {};
}
