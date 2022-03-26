import { UltraSonicSensorObserverPayload } from "../../common/ultraSonicSensorObserverPayload";
import { throttle } from "../utils/throttle";
import { Observers } from "./common/observer";
import { PhysicalSensor, SensorObserver } from "./common/physicalSensor";

export interface UltraSonicSensorActions {}

/**
 * Simulate a distance sensor.
 *
 * The system has one distance sensor at the bottom of the platform
 * that has the water tank. When the user moves the pulley, the platform
 * moves up and down. The sensor gives for a given time a value in cm.
 *
 * The class allows to start listening to the sensor and stop listening. When
 * listening, every subscriber will receive the data from the notify callback.
 */
export class UltraSonicSensor implements PhysicalSensor<UltraSonicSensorObserverPayload> {
  private observers: Observers<SensorObserver<UltraSonicSensorObserverPayload>>;

  public constructor() {
    this.observers = new Observers<SensorObserver<UltraSonicSensorObserverPayload>>();
  }

  public subscribe(observer: SensorObserver<UltraSonicSensorObserverPayload>): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver<UltraSonicSensorObserverPayload>): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = throttle((data: UltraSonicSensorObserverPayload): void => {
    this.observers.notify({ cm: data.cm, fullDateTimeInMs: data.fullDateTimeInMs });
  }, 100);

  public update(data: UltraSonicSensorObserverPayload): void {
    this.handleData(data);
  }
}
