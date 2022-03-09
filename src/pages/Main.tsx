import { Header } from "../components/StructuralComponents/Header";
import styles from "./Main.module.css";
import { BsArrowRight } from "solid-icons/bs";
import { useNavigate } from "solid-app-router";
import { getMainRoutes, ROUTES } from "./routes";
export const Main = () => {
  const navigate = useNavigate();
  return (
    <div class={styles.Main}>
      <Header title="Training" />
      <div class={styles.MainContainer}>
        <div class={styles.MainContainerMenu}>
          <button
            class={styles.MainContainerMenuButton}
            onclick={() => {
              navigate(getMainRoutes(ROUTES.ADHOC));
            }}
          >
            <span>Ad-Hoc Training</span> <BsArrowRight size={24} color="#fff" />
          </button>
          <button
            class={styles.MainContainerMenuButton}
            onclick={() => {
              navigate(getMainRoutes(ROUTES.SINGLE_EXERCISE));
            }}
          >
            <span>Single Exercise </span>{" "}
            <BsArrowRight size={24} color="#fff" />
          </button>
          <button
            class={styles.MainContainerMenuButton}
            onclick={() => {
              navigate(getMainRoutes(ROUTES.WORKOUT));
            }}
          >
            <span>Full Workout </span> <BsArrowRight size={24} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};
