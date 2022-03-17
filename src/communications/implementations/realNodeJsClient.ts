import { NodeJsClientDefinition } from "./nodeJsClientModel";

export class RealNodeJsClient implements NodeJsClientDefinition {
  public adjustWeight(weight: number): void {
    throw new Error("Method not implemented.");
  }
}
