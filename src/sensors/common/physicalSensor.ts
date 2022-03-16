export type SensorObserver<T> = (payload: T) => void;
export interface PhysicalSensor<T> {
  startListening(): void;
  stopListening(): void;
  subscribe(observer: SensorObserver<T>): void;
  unsubscribe(observer: SensorObserver<T>): void;
}
