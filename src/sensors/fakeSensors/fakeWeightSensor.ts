import { WeightSensorActions, WeightSensorObserverPayload } from "../weightSensor";

export const FakeWeightSingleton = {
  fakeWeightLbs: 50,
};

export function fakeWeightSensor(send: (data: WeightSensorObserverPayload) => void): WeightSensorActions {
  let ref = 0;
  let continueReceiveData = false;
  const loop = () => {
    if (continueReceiveData) {
      send({ lbs: FakeWeightSingleton.fakeWeightLbs });
      clearTimeout(ref);
      ref = setTimeout(() => loop(), 50 + Math.random() * 200); // Next fake fetched data in few ms
    } else {
      clearTimeout(ref);
    }
  };

  return {
    start: () => {
      // Stop the loop if it is already running
      continueReceiveData = false;
      clearTimeout(ref);

      continueReceiveData = true;
      ref = setTimeout(() => loop(), 0);
    },
    stop: () => {
      continueReceiveData = false;
      clearTimeout(ref);
    },
  };
}
