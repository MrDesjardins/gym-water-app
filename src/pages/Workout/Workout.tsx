import { useNavigate } from "solid-app-router";
import { BsArrowRight } from "solid-icons/bs";
import { Button } from "../../components/Button/Button";
import { dataGateway } from "../../persistence/dataGateway";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes, ROUTES } from "../routes";
import styles from "./Workout.module.css";
export const Workout = () => {
  const navigate = useNavigate();
  return (
    <MainStructure title="Training" subtitle="Workout" backButtonLink={getMainRoutes()}>
      <div class={styles.Workout}>
        {dataGateway.getAllWorkouts().map((workout) => (
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
