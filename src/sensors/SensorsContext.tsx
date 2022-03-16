import { JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { DistanceSensor, SensorObserver } from "./distanceSensors";

export interface SensorsContextState {
  contactSensorIsClosed: boolean;
  isListeningDistanceSensor: boolean;
}
export interface SensorsContextActions {
  openHeightContactSensor: () => void;
  closeHeightContactSensor: () => void;
  listenDistanceSensor: () => void;
  stopListeningDistanceSensor: () => void;
  subscribeToDistanceSensor: (o: SensorObserver) => void;
  unSubscribeToDistanceSensor: (o: SensorObserver) => void;
}
export interface SensorsContextModel {
  state: SensorsContextState;
  actions: SensorsContextActions;
}
export interface SensorsContextProps {
  /**
   * Fake Sensor relies on the hidden DEV panel to simulate the contact sensor.
   * Useful when not connected on the actual micro-controller that is connected
   * to the physical real sensors.
   *
   * The value should be false once deployed on the real system
   **/
  useFakeSensors: boolean;
  children: JSX.Element;
}
export const SensorsContext = createContext<SensorsContextModel>();

export function SensorsProvider(props: SensorsContextProps) {
  const [state, setState] = createStore<SensorsContextState>({
    contactSensorIsClosed: true,
    isListeningDistanceSensor: false,
  });
  const distanceSensor = new DistanceSensor();

  const value: SensorsContextModel = {
    state: state,
    actions: {
      openHeightContactSensor() {
        setState("contactSensorIsClosed", false);
        distanceSensor.startListening();
      },
      closeHeightContactSensor() {
        setState("contactSensorIsClosed", true);
        distanceSensor.stopListening();
      },
      listenDistanceSensor() {
        setState("isListeningDistanceSensor", true);
        distanceSensor.startListening();
      },
      stopListeningDistanceSensor() {
        setState("isListeningDistanceSensor", false);
        distanceSensor.stopListening();
      },
      subscribeToDistanceSensor(observer: SensorObserver) {
        distanceSensor.subscribe(observer);
      },
      unSubscribeToDistanceSensor(observer: SensorObserver) {
        distanceSensor.unsubscribe(observer);
      },
    },
  };

  return <SensorsContext.Provider value={value}>{props.children}</SensorsContext.Provider>;
}

/**
 * Hook to access the SensorsContext
 */
export function useSensors(): SensorsContextModel | undefined {
  return useContext(SensorsContext);
}
