import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import WebSocket from "ws";
import dotenv from "dotenv";
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
  console.log(data);
  console.log(`Adjust weight to be ${data.weight} at ${new Date().toLocaleTimeString()}`, data);
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

// Listen on the GPIO pin to send data about distance, weight, etc.
// wsApp.clients.forEach((client) => {
//   if (client.readyState === WebSocket.OPEN) {
//     client.send(data);
//   }
// });
