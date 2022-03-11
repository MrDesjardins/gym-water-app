import { BsArrowRight } from "solid-icons/bs";
import { Button } from "../../components/Button/Button";
import { MainStructure } from "../../structure/MainStructure";
import { getOrderedExercices } from "../exercise";
import { getMainRoutes, getSingleExercise } from "../routes";
import styles from "./SingleExerciseSelection.module.css";
export const SingleExerciseSelection = () => {
  return (
    <MainStructure
      title="Training"
      subtitle="Per Exercise"
      backButtonLink={getMainRoutes()}
    >
      <div class={styles.root}>
        {getOrderedExercices().map((exercise) => (
          <div class={styles.choice}>
            <ExerciseButton
              name={exercise.displayName}
              link={getSingleExercise(exercise.id)}
            />
          </div>
        ))}
      </div>
    </MainStructure>
  );
};

const ExerciseButton = (props: { name: string; link: string }) => {
  return (
    <Button class={styles.exerciseButton} link={props.link}>
      {props.name}
      <BsArrowRight size={24} color="#fff" />
    </Button>
  );
};
