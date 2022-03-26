import { AllWebSocketPayloadTypes } from "../models/websocket/payload";
import { exhaustiveCheck } from "../TypeScript/checks";
import { MagneticContactSensor } from "./magneticContactSensor";
import { UltraSonicSensor } from "./ultraSonicSensor";
import { WeightSensor } from "./weightSensor";

export class SensorManager {
  public distanceSensor = new UltraSonicSensor();
  public magneticSensor = new MagneticContactSensor();
  public weightSensor = new WeightSensor();

  public dispathToSensor(payload: AllWebSocketPayloadTypes): void {
    switch (payload.kind) {
      case "weight":
        this.weightSensor.update({ ...payload });
        break;
      case "ultrasonic":
        this.distanceSensor.update({ ...payload });
        break;
      case "magneticcontact":
        this.magneticSensor.update({ ...payload });
        break;
      default:
        exhaustiveCheck(payload);
    }
  }
}
