import { FakeWeightSingleton } from "../../sensors/fakeSensors/fakeWeightSensor";
import { NodeJsClientDefinition } from "./nodeJsClientModel";

export class FakeNodeJsClient implements NodeJsClientDefinition {
  public adjustWeight(weight: number): void {
    FakeWeightSingleton.fakeWeightLbs = weight;
  }
}
