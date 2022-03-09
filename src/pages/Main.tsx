import { Header } from "../components/StructuralComponents/Header";
import styles from "./Main.module.css";
import { BsArrowRight } from "solid-icons/bs";
import { useNavigate } from "solid-app-router";
import { getMainRoutes, ROUTES } from "./routes";
import { MainStructure } from "../structure/MainStructure";
import { Button } from "../components/Button/Button";
export const Main = () => {
  const navigate = useNavigate();
  return (
    <MainStructure title="Training">
      <div class={styles.MainContainer}>
        <div class={styles.MainContainerMenu}>
          <Button link={getMainRoutes(ROUTES.ADHOC)}>
            <span>Ad-Hoc Training</span> <BsArrowRight size={24} color="#fff" />
          </Button>
          <Button link={getMainRoutes(ROUTES.SINGLE_EXERCISE)}>
            <span>Single Exercise</span> <BsArrowRight size={24} color="#fff" />
          </Button>
          <Button link={getMainRoutes(ROUTES.WORKOUT)}>
            <span>Workout</span> <BsArrowRight size={24} color="#fff" />
          </Button>
        </div>
      </div>
    </MainStructure>
  );
};
