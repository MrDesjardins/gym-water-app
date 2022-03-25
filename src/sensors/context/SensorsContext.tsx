import createWebsocket from "@solid-primitives/websocket";
import { createContext, JSX, onCleanup, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { ENV_VARIABLES } from "../../models/constants_env";
import { AllWebSocketPayloadTypes, buildObjFromWebsocketResponse } from "../../models/websocket/payload";
import { fakeMagneticSensor } from "../fakeSensors/fakeMagneticSensor";
import { fakeWeightSensor } from "../fakeSensors/fakeWeightSensor";
import { MagneticContactSensor } from "../magneticContactSensor";
import { UltraSonicSensor } from "../ultraSonicSensor";
import { WeightSensor, WeightSensorActions, WeightSensorObserverPayload } from "../weightSensor";

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

  if (props.useFakeSensors) {
    fakeWeightSensor((data: WeightSensorObserverPayload) => {
      weightSensor.update(data.lbs);
    });
  } else {
    const distributeToSensor = (payload: AllWebSocketPayloadTypes) => {
      if (payload.__type === "weight") {
        weightSensor.update(payload.weightLbs);
      }
    };
    const [connect, disconnect, send, wsState] = createWebsocket(
      `ws://${ENV_VARIABLES.SERVER_IP}:${ENV_VARIABLES.SERVER_WEBSOCKET_PORT}`,
      (msg) => {
        const payload = buildObjFromWebsocketResponse(JSON.parse(msg.data));
        distributeToSensor(payload);
      },
      (msg) => console.log(msg),
      [],
      5 /*Reconnect*/,
      5000 /*Reconnect pause*/,
    );

    if (!props.useFakeSensors) {
      console.log("Connecting WS");
      connect();
    }

    onCleanup(() => {
      console.log("Disconnecting WS");
      disconnect();
    });
  }

  const distanceSensor = new UltraSonicSensor(props.useFakeSensors);
  const magneticSensor = new MagneticContactSensor(props.useFakeSensors);
  const weightSensor = new WeightSensor();

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
