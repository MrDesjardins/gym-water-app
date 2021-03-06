import { RestRoutes } from "../../../common/restRoutes";
import { ENV_VARIABLES } from "../../models/constants_env";
import { Workout } from "../../models/workout";

export class NodeJsClient {
  public async getAllWorkouts(): Promise<Workout[]> {
    const response = await this.getRequest(RestRoutes.Get_All_Workouts);
    const payload = await response.json();
    return (payload as Workout[]).sort((a, b) => a.id - b.id);
  }
  public async getWorkout(workoutId: number): Promise<Workout> {
    const response = await this.getRequest(
      RestRoutes.Get_Workout.replace(":workoutid", workoutId.toString()),
    );
    const payload = await response.json();
    return payload as Workout;
  }

  public async adjustWeight(weight: number): Promise<void> {
    await this.postHttpRequest(
      RestRoutes.Set_Weight,
      JSON.stringify({
        weight: weight,
      }),
    );
  }
  public async __devSetMagneticContact(isOpen: boolean): Promise<void> {
    await this.postHttpRequest(
      "api-dev/sensors/magneticcontact",
      JSON.stringify({
        isOpen: isOpen,
      }),
    );
  }
  public async __devSetUltrasonic(isMoving: boolean): Promise<void> {
    await this.postHttpRequest(
      RestRoutes.Dev_SetMoving,
      JSON.stringify({
        isMoving: isMoving,
      }),
    );
  }
  public async saveWorkout(workout: Workout): Promise<void> {
    await this.postHttpRequest(
      RestRoutes.Set_Workout.replace(":workoutid", workout.id.toString()),
      JSON.stringify(workout),
    );
  }
  private async postHttpRequest(endpointUrl: string, body: string): Promise<Response> {
    return fetch(`http://${ENV_VARIABLES.SERVER_IP}:${ENV_VARIABLES.SERVER_PORT}/${endpointUrl}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
  }
  private async getRequest(endpointUrl: string): Promise<Response> {
    return fetch(`http://${ENV_VARIABLES.SERVER_IP}:${ENV_VARIABLES.SERVER_PORT}/${endpointUrl}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
