import { FakeNodeJsClient } from "../implementations/fakeNodeJsClient";
import { NodeJsClientDefinition } from "../implementations/nodeJsClientModel";
import { RealNodeJsClient } from "../implementations/realNodeJsClient";

export class NodeJsClient implements NodeJsClientDefinition {
  private client: NodeJsClientDefinition;
  public constructor(private useFakeBackend: boolean) {
    if (useFakeBackend) {
      this.client = new FakeNodeJsClient();
    } else {
      this.client = new RealNodeJsClient();
    }
  }
  public adjustWeight(weight: number): void {
    this.client.adjustWeight(weight);
  }
}
