import { MagneticContactSensorObserverPayload } from "../magneticContactSensorObserverPayload";
import { UltraSonicSensorObserverPayload } from "../ultraSonicSensorObserverPayload";
import { WeightSensorObserverPayload } from "../weightSensorObserverPayload";

export type AllWebSocketPayloadTypes = WeightPayload | DistancePayload | MagnecticPayload;

export interface WeightPayload extends WeightSensorObserverPayload {
  kind: "weight";
}

export interface DistancePayload extends UltraSonicSensorObserverPayload {
  kind: "ultrasonic";
}

export interface MagnecticPayload extends MagneticContactSensorObserverPayload {
  kind: "magneticcontact";
}

export function buildObjFromWebsocketResponse(obj: any): AllWebSocketPayloadTypes {
  switch (obj.kind) {
    case "weight":
      return obj as WeightPayload;
    case "ultrasonic":
      return obj as DistancePayload;
    case "magneticcontact":
      return obj as MagnecticPayload;
  }
  throw Error("Type unknown");
}
