import createWebsocket from "@solid-primitives/websocket";
import { createContext, JSX, onCleanup, useContext } from "solid-js";
import { CONSTANTS } from "../../models/constants";
import { ENV_VARIABLES } from "../../models/constants_env";
import { AllWebSocketPayloadTypes, buildObjFromWebsocketResponse } from "../../models/websocket/payload";
import { exhaustiveCheck } from "../../TypeScript/checks";
import { MagneticContactSensor } from "../magneticContactSensor";
import { SensorManager } from "../sensorManager";
import { UltraSonicSensor } from "../ultraSonicSensor";
import { WeightSensor } from "../weightSensor";

export interface SensorsContextSensors {
  ultraSonicSensor: UltraSonicSensor;
  magneticContactSensor: MagneticContactSensor;
  weightSensor: WeightSensor;
}
export interface SensorsContextModel {
  sensors: SensorsContextSensors;
}
export interface SensorsContextProps {
  children: JSX.Element;
}
export const SensorsContext = createContext<SensorsContextModel>();

export function SensorsProvider(props: SensorsContextProps) {
  const sensorManager = new SensorManager();
  const [connect, disconnect, send, wsState] = createWebsocket(
    `ws://${ENV_VARIABLES.SERVER_IP}:${ENV_VARIABLES.SERVER_WEBSOCKET_PORT}`,
    (msg) => {
      const payload = buildObjFromWebsocketResponse(JSON.parse(msg.data));
      sensorManager.dispathToSensor(payload);
    },
    (msg) => console.log(msg),
    [],
    CONSTANTS.WEBSOCKET_RETRY_CONNECTION,
    CONSTANTS.WEBSOCKET_RETRY_PAUSE_MS,
  );

  console.log("Connecting WS");
  connect();

  onCleanup(() => {
    console.log("Disconnecting WS");
    disconnect();
  });

  const value: SensorsContextModel = {
    sensors: {
      ultraSonicSensor: sensorManager.distanceSensor,
      magneticContactSensor: sensorManager.magneticSensor,
      weightSensor: sensorManager.weightSensor,
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
