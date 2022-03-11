import { useParams } from "solid-app-router";
import { BsArrowRight } from "solid-icons/bs";
import { Button } from "../../components/Button/Button";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes, getSingleExercise, ROUTES } from "../routes";
import styles from "./SingleExercise.module.css";
export const SingleExercise = () => {
  const params = useParams();
  return (
    <MainStructure
      title="Training"
      subtitle="Per Exercise"
      backButtonLink={getMainRoutes(ROUTES.SINGLE_EXERCISE)}
    >
      <div class={styles.root}>Exercise {params.exerciseId}</div>
    </MainStructure>
  );
};
