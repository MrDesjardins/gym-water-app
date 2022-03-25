import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import WebSocket from "ws";
import dotenv from "dotenv";
import e from "express";
dotenv.config();

const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_WEBSOCKET_PORT = Number(process.env.SERVER_WEBSOCKET_PORT);

console.log(`Server ${SERVER_IP}:${SERVER_PORT}`);
console.log(`WS  ${SERVER_IP}:${SERVER_WEBSOCKET_PORT}`);

const serverApp = express();
serverApp.use(bodyParser.json()); // Allows to parse POST body
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(cors());

let desiredWeightLbs = 0;
let lastSensorReceivedWeightLbs = 0;

serverApp.get("/api/workouts", async (req: any, res: any) => {
  try {
    const jsonData = [{ id: 1 }];
    res.send(jsonData);
    console.log(jsonData);
  } catch (e) {
    console.error(e);
  }
});
serverApp.get("/api/workouts/:workoutid", async (req: any, res: any) => {
  const id = req.params.workoutid;
  console.log("Save /api/save/:deviceid/:key/:value");
  try {
    const jsonData = { id: id };
    res.send(jsonData);
    console.log(jsonData);
  } catch (e) {
    console.error(e);
  }
});

serverApp.post("/api/sensors/weight", (req: any, res: any) => {
  const data = req.body;
  console.log(`Adjust weight to be ${data.weight} at ${new Date().toLocaleTimeString()}`, data);
  desiredWeightLbs = data.weight;
  res.send({ status: "ok" });
});

serverApp.post("/api/workouts/:workoutid/save", (req: any, res: any) => {
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

function sendCurrentWeight(currentWeightLbs: number): void {
  wsApp.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          __type: "weight",
          weightLbs: currentWeightLbs,
        }),
      );
    }
  });
}

const weightLoopSimulateGPIO = () => {
  console.log("Weight", desiredWeightLbs, lastSensorReceivedWeightLbs);
  if (desiredWeightLbs !== lastSensorReceivedWeightLbs) {
    const diff = desiredWeightLbs - lastSensorReceivedWeightLbs;
    if (Math.abs(diff) >= 5) {
      lastSensorReceivedWeightLbs += diff > 0 ? 5 : -5; // Fake the water moving
    } else {
      lastSensorReceivedWeightLbs = desiredWeightLbs;
    }

    sendCurrentWeight(lastSensorReceivedWeightLbs);
  }
};

setInterval(() => weightLoopSimulateGPIO(), 500);
