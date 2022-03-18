import { CONSTANTS } from "../../models/constants";
import { WeightSensorActions, WeightSensorObserverPayload } from "../weightSensor";

export const FakeWeightSingleton = {
  fakeWeightLbs: 50,
};

export function fakeWeightSensor(send: (data: WeightSensorObserverPayload) => void): WeightSensorActions {
  let ref = 0;
  let lastFakeWeightLbs = FakeWeightSingleton.fakeWeightLbs;

  const loop = () => {
    if (lastFakeWeightLbs !== FakeWeightSingleton.fakeWeightLbs) {
      const diff = FakeWeightSingleton.fakeWeightLbs - lastFakeWeightLbs;
      if (Math.abs(diff) >= CONSTANTS.THRESHOLD_WEIGHT_DIFFERENCE) {
        lastFakeWeightLbs +=
          diff > 0 ? CONSTANTS.THRESHOLD_WEIGHT_DIFFERENCE : -CONSTANTS.THRESHOLD_WEIGHT_DIFFERENCE;
      } else {
        lastFakeWeightLbs = FakeWeightSingleton.fakeWeightLbs;
      }
      send({ lbs: lastFakeWeightLbs });
    }
  };

  ref = setInterval(() => loop(), 500);

  return {};
}
