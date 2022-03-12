import { Header } from "../components/StructuralComponents/Header";
import styles from "./MainStructure.module.css";
import { JSX } from "solid-js";
export interface MainStructureProps {
  children: JSX.Element;
  title: string;
  subtitle?: string;
  subtitleDetail?: string;
  backButtonLink?: string;
}
export const MainStructure = (props: MainStructureProps): JSX.Element => {
  return (
    <div class={styles.MainStructure}>
      <Header
        title={props.title}
        subtitle={props.subtitle}
        subtitleDetail={props.subtitleDetail}
        backButtonLink={props.backButtonLink}
      />
      <div class={styles.MainStructureContainer}>{props.children}</div>
    </div>
  );
};
