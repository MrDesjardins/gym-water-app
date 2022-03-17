import { throttle } from "../utils/throttle";
import { Observers } from "./common/observer";
import { fakeMagneticSensor } from "./fakeSensors/fakeMagneticSensor";
import { PhysicalSensor, SensorObserver } from "./common/physicalSensor";
import { physicalMagneticSensor } from "./physicalSensors/physicalMagneticSensor";
export interface MagneticContactSensorObserverPayload {
  isOpen: boolean;
}

export interface MagneticContactSensorActions {
  start: () => void;
  stop: () => void;
}
export class MagneticContactSensor implements PhysicalSensor<MagneticContactSensorObserverPayload> {
  private sensor: MagneticContactSensorActions;
  private observers: Observers<SensorObserver<MagneticContactSensorObserverPayload>>;

  public constructor(useFakeSensor: boolean) {
    this.observers = new Observers<SensorObserver<MagneticContactSensorObserverPayload>>();
    if (useFakeSensor) {
      this.sensor = fakeMagneticSensor(throttle((data) => this.handleData(data), 100));
    } else {
      this.sensor = physicalMagneticSensor(throttle((data) => this.handleData(data), 100));
    }
  }

  public startListening(): void {
    this.sensor.start();
  }

  public stopListening(): void {
    this.sensor.stop();
  }

  public subscribe(observer: SensorObserver<MagneticContactSensorObserverPayload>): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver<MagneticContactSensorObserverPayload>): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = (data: MagneticContactSensorObserverPayload): void => {
    this.observers.notify({ isOpen: data.isOpen });
  };
}
