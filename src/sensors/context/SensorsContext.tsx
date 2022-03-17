import { createContext, JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { MagneticContactSensor } from "../magneticContactSensor";
import { UltraSonicSensor } from "../ultraSonicSensor";
import { WeightSensor } from "../weightSensor";

export interface SensorsContextState {}

export interface SensorsContextSensors {
  ultraSonicSensor: UltraSonicSensor;
  magneticContactSensor: MagneticContactSensor;
  weightSensor: WeightSensor;
}
export interface SensorsContextModel {
  state: SensorsContextState;
  sensors: SensorsContextSensors;
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
  const [state, setState] = createStore<SensorsContextState>({});
  const distanceSensor = new UltraSonicSensor(props.useFakeSensors);
  const magneticSensor = new MagneticContactSensor(props.useFakeSensors);
  const weightSensor = new WeightSensor(props.useFakeSensors);

  const value: SensorsContextModel = {
    state: state,
    sensors: {
      ultraSonicSensor: distanceSensor,
      magneticContactSensor: magneticSensor,
      weightSensor: weightSensor,
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
