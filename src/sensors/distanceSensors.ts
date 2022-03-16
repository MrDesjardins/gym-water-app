import { throttle } from "../utils/throttle";
import { fakeDistanceSensor } from "./fakeDistanceSensor";
import { Observers } from "./observer";

export interface SensorObserverPayload {
  cm: number;
  fullDateTimeInMs: number;
}
export type SensorObserver = (payload: SensorObserverPayload) => void;

export class DistanceSensor {
  private sensor: any;
  private observers: Observers<SensorObserver>;

  public constructor() {
    this.observers = new Observers<SensorObserver>();
    this.sensor = fakeDistanceSensor(throttle((data) => this.handleData(data), 100));
  }

  public startListening(): void {
    this.sensor.start();
  }

  public stopListening(): void {
    this.sensor.stop();
  }

  public subscribe(observer: SensorObserver): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = (data: SensorObserverPayload): void => {
    this.observers.notify({ cm: data.cm, fullDateTimeInMs: data.fullDateTimeInMs });
  };
}
