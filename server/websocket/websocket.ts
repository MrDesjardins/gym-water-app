import WebSocket from "ws";
import { MagneticContactSensorObserverPayload } from "../../common/magneticContactSensorObserverPayload";
import { UltraSonicSensorObserverPayload } from "../../common/ultraSonicSensorObserverPayload";
import { WeightSensorObserverPayload } from "../../common/weightSensorObserverPayload";
import {
  AllWebSocketPayloadTypes,
  DistancePayload,
  MagnecticPayload,
  WeightPayload,
} from "../../common/websocket/payload";
import { IncomingMessage } from "http";

export class WebSocketApp {
  private wsApp: WebSocket.Server<WebSocket.WebSocket>;

  public constructor(port: number) {
    this.wsApp = new WebSocket.Server({ port: port });

    this.wsApp.on("connection", (socket, request) => this.onConnection(socket, request));
  }

  private onConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void {
    console.log(
      `Connection established ${new Date().toISOString()}`,
      req.socket.remoteAddress,
      req.headers.origin,
    );

    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });
  }
  private buildRequest(obj: AllWebSocketPayloadTypes): AllWebSocketPayloadTypes {
    switch (obj.kind) {
      case "weight":
        return obj as WeightPayload;
      case "ultrasonic":
        return obj as DistancePayload;
      case "magneticcontact":
        return obj as MagnecticPayload;
    }
  }

  private send(obj: AllWebSocketPayloadTypes): void {
    if (this.wsApp !== undefined) {
      // console.log(`Send data to ${this.wsApp.clients.size}`);
      this.wsApp.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          const requestBody = this.buildRequest(obj);
          client.send(JSON.stringify(requestBody));
        }
      });
    }
  }
  public sendCurrentWeight(data: WeightSensorObserverPayload): void {
    this.send({ kind: "weight", ...data });
  }

  public sendCurrentDistance(data: UltraSonicSensorObserverPayload): void {
    this.send({ kind: "ultrasonic", ...data });
  }
  public sendCurrentContact(data: MagneticContactSensorObserverPayload): void {
    this.send({ kind: "magneticcontact", ...data });
  }
}
