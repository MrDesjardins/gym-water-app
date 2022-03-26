import { Workout } from "../../src/models/workout";
import * as fs from "fs";
import prettier from "prettier";
let workouts: Workout[] = [];
const WORKOUT_FILE = "server/persistence/workouts.json";
export function getWorkouts(): Workout[] {
  const data = fs.readFileSync(WORKOUT_FILE);
  workouts = JSON.parse(data.toString());
  return workouts;
}
export function setWorkout(workout: Workout): void {
  workouts = workouts.filter((d) => d.id !== workout.id);
  workouts.push(workout);
  try {
    fs.writeFileSync(WORKOUT_FILE, prettier.format(JSON.stringify(workouts), { parser: "json" }));
  } catch (err) {
    console.error(err);
  }
}
