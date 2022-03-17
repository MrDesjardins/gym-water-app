import { createContext, JSX, useContext } from "solid-js";
import { exhaustiveCheck } from "../../TypeScript/checks";
import { NodeJsClient } from "../client/NodeJsClient";

/**
 * Can have many type of request (union of type of request)
 */
export type ServerCommunicationRequest = {
  kind: "weight";
  payload: { weightLbs: number };
};
export interface ServerCommunicationContextModel {
  request: (request: ServerCommunicationRequest) => void;
}
export interface SensorsContextProps {
  useFakeBackend: boolean;
  children: JSX.Element;
}
export const ServerCommunicationContext = createContext<ServerCommunicationContextModel>();

export function ServerCommunicationProvider(props: SensorsContextProps) {
  const backend = new NodeJsClient(props.useFakeBackend);
  return (
    <ServerCommunicationContext.Provider
      value={{
        request: (request: ServerCommunicationRequest) => {
          switch (request.kind) {
            case "weight":
              backend.adjustWeight(request.payload.weightLbs);
              break;
            default:
              exhaustiveCheck(request.kind);
          }
        },
      }}
    >
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
