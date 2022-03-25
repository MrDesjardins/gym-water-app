import { throttle } from "../utils/throttle";
import { Observers } from "./common/observer";
import { PhysicalSensor, SensorObserver } from "./common/physicalSensor";

export interface WeightSensorObserverPayload {
  lbs: number;
}

export interface WeightSensorActions {}

/**
 * Simulate a sensor that calculate the weight of the upper bin (the one
 * that the user can move).
 *
 * The sensor gives the weight in pounds.
 *
 * The class allows to start listening to the sensor and stop listening. When
 * listening, every subscriber will receive the data from the notify callback.
 */
export class WeightSensor implements PhysicalSensor<WeightSensorObserverPayload> {
  private observers: Observers<SensorObserver<WeightSensorObserverPayload>>;

  public constructor() {
    this.observers = new Observers<SensorObserver<WeightSensorObserverPayload>>();
  }

  public subscribe(observer: SensorObserver<WeightSensorObserverPayload>): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver<WeightSensorObserverPayload>): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = throttle((data: WeightSensorObserverPayload): void => {
    this.observers.notify({ lbs: data.lbs });
  }, 100);

  public update(weight: number): void {
    this.handleData({ lbs: weight });
  }
}
