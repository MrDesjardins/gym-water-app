import { MagneticContactSensorObserverPayload } from "../../common/magneticContactSensorObserverPayload";
import { throttle } from "../utils/throttle";
import { Observers } from "./common/observer";
import { PhysicalSensor, SensorObserver } from "./common/physicalSensor";

export interface MagneticContactSensorActions {}
export class MagneticContactSensor implements PhysicalSensor<MagneticContactSensorObserverPayload> {
  private observers: Observers<SensorObserver<MagneticContactSensorObserverPayload>>;

  public constructor() {
    this.observers = new Observers<SensorObserver<MagneticContactSensorObserverPayload>>();
  }

  public subscribe(observer: SensorObserver<MagneticContactSensorObserverPayload>): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver<MagneticContactSensorObserverPayload>): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = throttle((data: MagneticContactSensorObserverPayload): void => {
    this.observers.notify({ isOpen: data.isOpen });
  }, 100);

  public update(data: MagneticContactSensorObserverPayload): void {
    this.handleData(data);
  }
}
