import { Header } from "../components/StructuralComponents/Header";
import styles from "./Main.module.css";
import { BsArrowRight } from "solid-icons/bs";
export const Main = () => {
  return (
    <div class={styles.Main}>
      <Header title="Training" />
      <div class={styles.MainContainer}>
        <div class={styles.MainContainerMenu}>
          <button class={styles.MainContainerMenuButton}>
            <span>Ad-Hoc Training</span> <BsArrowRight size={24} color="#fff" />
          </button>
          <button class={styles.MainContainerMenuButton}>
            <span>Single Exercise </span>{" "}
            <BsArrowRight size={24} color="#fff" />
          </button>
          <button class={styles.MainContainerMenuButton}>
            <span>Full Workout </span> <BsArrowRight size={24} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};
