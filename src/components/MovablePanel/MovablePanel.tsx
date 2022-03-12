import { JSX } from "solid-js";
import styles from "./MovablePanel.module.css";
export interface MovablePanelProps {
  class?: string;
  children: JSX.Element;
  getLeft: () => number;
}
export const MovablePanel = (props: MovablePanelProps) => {
  return (
    <>
      <div class={styles.curtainLeft} />
      <div classList={{ [styles.MovablePanel]: true, [props.class!]: props.class !== undefined }}>
        <div class={styles.Moveable} style={{ left: `${props.getLeft()}px` }}>
          {props.children}
        </div>
      </div>
      <div class={styles.curtainRight} />
    </>
  );
};
