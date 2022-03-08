import { Link } from "solid-app-router";
import styles from "./Choose.module.css";
export const Choose = () => {
  return (
    <div class={styles.Choose}>
      <Link class={styles.nav} href="/main">
        Main App
      </Link>
      <Link class={styles.nav} href="/storybook">
        StoryBook
      </Link>
    </div>
  );
};
