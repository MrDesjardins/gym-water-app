import { useNavigate } from "solid-app-router";
import { BsArrowRight } from "solid-icons/bs";
import { createEffect, createSignal } from "solid-js";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { Button } from "../../components/Button/Button";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes, ROUTES } from "../routes";
import styles from "./Workout.module.css";
import { Workout as WorkoutModel } from "../../models/workout";
export const Workout = () => {
  const [allWorkouts, setAllWorkout] = createSignal<WorkoutModel[]>([]);
  const navigate = useNavigate();
  const serverCommunication = useServerCommunication();

  createEffect(async () => {
    setAllWorkout((await serverCommunication?.client.getAllWorkouts()) ?? []);
  });

  return (
    <MainStructure title="Training" subtitle="Workout" backButtonLink={getMainRoutes()}>
      <div class={styles.Workout}>
        {allWorkouts().map((workout) => (
          <div class={styles.choice}>
            <WorkoutButton
              name={workout.workoutName}
              onClick={() => {
                navigate(getMainRoutes(ROUTES.WORKOUT_GO), {
                  state: workout,
                });
              }}
            />
          </div>
        ))}
      </div>
    </MainStructure>
  );
};

const WorkoutButton = (props: { name: string; onClick: () => void }) => {
  return (
    <Button class={styles.exerciseButton} onClick={props.onClick}>
      {props.name}
      <BsArrowRight size={24} color="#fff" />
    </Button>
  );
};
