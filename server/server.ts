import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { RestRoutes } from "../common/restRoutes";
import { Workout } from "../src/models/workout";
import { getWorkouts, setWorkout } from "./fakeData";
import { MagneticContactGpio } from "./gpio/magneticContactGpio";
import { UltrasonicGpio } from "./gpio/ultrasonicGpio";
import { WeightGpio } from "./gpio/weightGpio";
import { WebSocketApp } from "./websocket/websocket";

dotenv.config();

const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
const WS_PORT = process.env.SERVER_WEBSOCKET_PORT;
const USE_GPIO = Boolean(process.env.USE_GPIO);

console.log(`Server ${SERVER_IP}:${SERVER_PORT}`);
console.log(`WS ${SERVER_IP}:${WS_PORT}`);

const serverApp = express();
serverApp.use(bodyParser.json()); // Allows to parse POST body
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(cors());

const webServerApp = new WebSocketApp(Number(WS_PORT));

const weightSensor = new WeightGpio(USE_GPIO, (data) => webServerApp.sendCurrentWeight(data));
const ultraSonicSensor = new UltrasonicGpio(USE_GPIO, (data) => webServerApp.sendCurrentDistance(data));
const magneticContactSensor = new MagneticContactGpio(USE_GPIO, (data) =>
  webServerApp.sendCurrentContact(data),
);

serverApp.get("/" + RestRoutes.Get_All_Workouts, async (req, res) => {
  try {
    res.send(getWorkouts());
  } catch (e) {
    console.error(e);
  }
});
serverApp.get("/" + RestRoutes.Get_Workout, async (req, res) => {
  const id = Number(req.params.workoutid);
  try {
    const workout = getWorkouts().find((d) => d.id === id);
    if (workout === undefined) {
      res.status(404).send("Workout not found");
    } else {
      res.send(workout);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

serverApp.put("/" + RestRoutes.Save_Workout, (req: { body: Workout }, res) => {
  const data = req.body;
  setWorkout(data);
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Set_Weight, (req: { body: { weight: number } }, res) => {
  const data = req.body;
  console.log(`Adjust weight to be ${data.weight} at ${new Date().toLocaleTimeString()}`, data);
  weightSensor.setDesiredWeight(data.weight);
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Dev_SetMoving, (req, res) => {
  const data = req.body;
  console.log(`Adjust isMoving to be ${data.isMoving} at ${new Date().toLocaleTimeString()}`, data);
  ultraSonicSensor.setMoving(Boolean(data.isMoving));
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Dev_SetContact, (req, res) => {
  const data = req.body;
  console.log(`Adjust isOpen to be ${data.isOpen} at ${new Date().toLocaleTimeString()}`, data);
  magneticContactSensor.setIsOpen(Boolean(data.isOpen));
  res.send({ status: "ok" });
});

serverApp.post("/" + RestRoutes.Set_Workout, (req, res) => {
  const id = req.params.workoutid;
  const workout = req.body;
  console.log(`Save workout id ${id} at ${new Date().toLocaleTimeString()}`);
  setWorkout(workout);
});

serverApp.listen(SERVER_PORT, () =>
  console.log(`Web Server Listening on IP ${SERVER_IP} and PORT ${SERVER_PORT}`),
);
