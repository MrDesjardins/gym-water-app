import { createContext, JSX, useContext } from "solid-js";
import { NodeJsClient } from "../client/nodeJsClient";

/**
 * Can have many type of request (union of type of request)
 */
export type ServerCommunicationRequest =
  | {
      kind: "weight";
      payload: { weightLbs: number };
    }
  | {
      kind: "isOpen";
      payload: { isOpen: boolean };
    }
  | {
      kind: "isMoving";
      payload: { isMoving: boolean };
    }
  | {
      kind: "getAllWorkouts";
      payload: {};
    };

export interface ServerCommunicationContextModel {
  client: NodeJsClient;
}
export interface SensorsContextProps {
  children: JSX.Element;
}
export const ServerCommunicationContext = createContext<ServerCommunicationContextModel>();

export function ServerCommunicationProvider(props: SensorsContextProps) {
  const backend = new NodeJsClient();
  return (
    <ServerCommunicationContext.Provider value={{ client: backend }}>
      {props.children}
    </ServerCommunicationContext.Provider>
  );
}

/**
 * Hook to access the NodeJS backend server
 */
export function useServerCommunication(): ServerCommunicationContextModel | undefined {
  return useContext(ServerCommunicationContext);
}
