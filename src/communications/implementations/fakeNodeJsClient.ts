import { CONSTANTS } from "../../models/constants";
import { useSensors } from "../../sensors/context/SensorsContext";
import { FakeWeightSingleton } from "../../sensors/fakeSensors/fakeWeightSensor";
import { WeightSensorObserverPayload } from "../../sensors/weightSensor";
import { NodeJsClientDefinition } from "./nodeJsClientModel";

export class FakeNodeJsClient implements NodeJsClientDefinition {
  public adjustWeight(weight: number): void {
    const ref = setInterval(() => {
      const diff = FakeWeightSingleton.fakeWeightLbs - weight;
      console.log("FakeNodeJsClient Diff", weight, FakeWeightSingleton.fakeWeightLbs, diff);
      if (Math.abs(diff) >= CONSTANTS.THRESHOLD_WEIGHT_DIFFERENCE) {
        FakeWeightSingleton.fakeWeightLbs += diff > 0 ? -2 : 2;
      } else {
        FakeWeightSingleton.fakeWeightLbs = weight;
        clearInterval(ref);
      }
    }, 100);
  }
}
