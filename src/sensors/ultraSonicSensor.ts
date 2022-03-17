import { throttle } from "../utils/throttle";
import { fakeUltraSonicSensor } from "./fakeSensors/fakeUltraSonicSensor";
import { Observers } from "./common/observer";
import { PhysicalSensor, SensorObserver } from "./common/physicalSensor";
import { physicalUltraSonicSensor } from "./physicalSensors/physicalUltraSonicSensor";

export interface UltraSonicSensorObserverPayload {
  cm: number;
  fullDateTimeInMs: number;
}

export interface UltraSonicSensorActions {
  start: () => void;
  stop: () => void;
}

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
  private sensor: UltraSonicSensorActions;
  private observers: Observers<SensorObserver<UltraSonicSensorObserverPayload>>;

  public constructor(useFakeSensor: boolean) {
    this.observers = new Observers<SensorObserver<UltraSonicSensorObserverPayload>>();
    if (useFakeSensor) {
      this.sensor = fakeUltraSonicSensor(throttle((data) => this.handleData(data), 100));
    } else {
      this.sensor = physicalUltraSonicSensor(throttle((data) => this.handleData(data), 100));
    }
  }

  public startListening(): void {
    this.sensor.start();
  }

  public stopListening(): void {
    this.sensor.stop();
  }

  public subscribe(observer: SensorObserver<UltraSonicSensorObserverPayload>): void {
    this.observers.subscribe(observer);
  }

  public unsubscribe(observer: SensorObserver<UltraSonicSensorObserverPayload>): void {
    this.observers.unSubscribe(observer);
  }
  private handleData = (data: UltraSonicSensorObserverPayload): void => {
    this.observers.notify({ cm: data.cm, fullDateTimeInMs: data.fullDateTimeInMs });
  };
}
