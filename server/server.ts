import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import WebSocket from "ws";
import { MagneticContactSensorObserverPayload } from "../common/magneticContactSensorObserverPayload";
import { RestRoutes } from "../common/restRoutes";
import { UltraSonicSensorObserverPayload } from "../common/ultraSonicSensorObserverPayload";
import { WeightSensorObserverPayload } from "../common/weightSensorObserverPayload";
import {
  AllWebSocketPayloadTypes,
  DistancePayload,
  MagnecticPayload,
  WeightPayload,
} from "../src/models/websocket/payload";
import { fakeWorkouts } from "./fakeData";
import { MagneticContactGpio } from "./gpio/magneticContactGpio";
import { UltrasonicGpio } from "./gpio/ultrasonicGpio";
import { WeightGpio } from "./gpio/weightGpio";
dotenv.config();

const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_WEBSOCKET_PORT = Number(process.env.SERVER_WEBSOCKET_PORT);
const USE_GPIO = Boolean(process.env.USE_GPIO);

console.log(`Server ${SERVER_IP}:${SERVER_PORT}`);
console.log(`WS  ${SERVER_IP}:${SERVER_WEBSOCKET_PORT}`);

const serverApp = express();
serverApp.use(bodyParser.json()); // Allows to parse POST body
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(cors());

const weightSensor = new WeightGpio(USE_GPIO, sendCurrentWeight);
const ultraSonicSensor = new UltrasonicGpio(USE_GPIO, sendCurrentDistance);
const magneticContactSensor = new MagneticContactGpio(USE_GPIO, sendCurrentContact);

serverApp.get("/" + RestRoutes.Get_All_Workouts, async (req: any, res: any) => {
  try {
    res.send(fakeWorkouts);
  } catch (e) {
    console.error(e);
  }
});
serverApp.get("/" + RestRoutes.Get_Workout, async (req: any, res: any) => {
  const id = req.params.workoutid;
  try {
    const jsonData = { id: id };
    res.send(jsonData);
    console.log(jsonData);
  } catch (e) {
    console.error(e);
  }
});

serverApp.post("/" + RestRoutes.Set_Weight, (req: { body: { weight: number } }, res: any) => {
  const data = req.body;
  console.log(`Adjust weight to be ${data.weight} at ${new Date().toLocaleTimeString()}`, data);
  weightSensor.setDesiredWeight(data.weight);
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Dev_SetMoving, (req: any, res: any) => {
  const data = req.body;
  console.log(`Adjust isMoving to be ${data.isMoving} at ${new Date().toLocaleTimeString()}`, data);
  ultraSonicSensor.setMoving(Boolean(data.isMoving));
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Dev_SetContact, (req: any, res: any) => {
  const data = req.body;
  console.log(`Adjust isOpen to be ${data.isOpen} at ${new Date().toLocaleTimeString()}`, data);
  magneticContactSensor.setIsOpen(Boolean(data.isOpen));
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Set_Workout, (req: any, res: any) => {
  const id = req.params.workoutid;
  const data = JSON.stringify(req.body);
  console.log(`Save workout id ${id} at ${new Date().toLocaleTimeString()}`, data);
});

serverApp.listen(SERVER_PORT, () =>
  console.log(`Web Server Listening on IP ${SERVER_IP} and PORT ${SERVER_PORT}`),
);

const wsApp = new WebSocket.Server({ port: SERVER_WEBSOCKET_PORT });

wsApp.on("connection", function connection(ws, req) {
  console.log(
    `Connection established ${new Date().toISOString()}`,
    req.socket.remoteAddress,
    req.headers.origin,
  );

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
});

wsApp.on("error", (err) => {
  console.error(`Error ${err.name}: ${err.message}`);
});

function sendCurrentWeight(data: WeightSensorObserverPayload): void {
  wsApp.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const requestBody = buildRequest({ kind: "weight", ...data });
      client.send(JSON.stringify(requestBody));
    }
  });
}

function sendCurrentDistance(data: UltraSonicSensorObserverPayload): void {
  wsApp.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const requestBody = buildRequest({ kind: "ultrasonic", ...data });
      client.send(JSON.stringify(requestBody));
    }
  });
}
function sendCurrentContact(data: MagneticContactSensorObserverPayload): void {
  wsApp.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const requestBody = buildRequest({ kind: "magneticcontact", ...data });
      client.send(JSON.stringify(requestBody));
    }
  });
}

function buildRequest(obj: AllWebSocketPayloadTypes): AllWebSocketPayloadTypes {
  switch (obj.kind) {
    case "weight":
      return obj as WeightPayload;
    case "ultrasonic":
      return obj as DistancePayload;
    case "magneticcontact":
      return obj as MagnecticPayload;
  }
}
