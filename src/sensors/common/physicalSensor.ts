export type SensorObserver<T> = (payload: T) => void;
export interface PhysicalSensor<T> {
  subscribe(observer: SensorObserver<T>): void;
  unsubscribe(observer: SensorObserver<T>): void;
}
