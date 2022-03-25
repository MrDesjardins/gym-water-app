export type AllWebSocketPayloadTypes = WeightPayload;

export interface WeightPayload {
  __type: "weight";
  weightLbs: number;
}

export function buildObjFromWebsocketResponse(obj: any): AllWebSocketPayloadTypes {
  if (obj.__type === "weight") {
    return obj as WeightPayload;
  }
  throw Error("Type unknown");
}
