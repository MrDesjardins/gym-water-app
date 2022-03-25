import { ENV_VARIABLES } from "../../models/constants_env";
import { NodeJsClientDefinition } from "./nodeJsClientModel";

export class RealNodeJsClient implements NodeJsClientDefinition {
  public adjustWeight(weight: number): void {
    fetch(`http://${ENV_VARIABLES.SERVER_IP}:${ENV_VARIABLES.SERVER_PORT}/api/sensors/weight`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: weight,
      }),
    });
  }
}
