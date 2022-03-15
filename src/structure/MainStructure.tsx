import { Header } from "../components/StructuralComponents/Header";
import styles from "./MainStructure.module.css";
import { JSX } from "solid-js";
import { useSensors } from "../sensors/SensorsContext";
export interface MainStructureProps {
  children: JSX.Element;
  title: string;
  subtitle?: string;
  subtitleDetail?: string;
  backButtonLink?: string;
}
export const MainStructure = (props: MainStructureProps): JSX.Element => {
  const sensors = useSensors();
  return (
    <div class={styles.MainStructure}>
      <Header
        title={props.title}
        subtitle={props.subtitle}
        subtitleDetail={props.subtitleDetail}
        backButtonLink={props.backButtonLink}
      />
      <div class={styles.MainStructureContainer}>{props.children}</div>
      <div class={styles.dev}>
        <h3> Dev Panel: Fake Sensor Event</h3>
        <a
          href="#"
          onClick={() => {
            sensors?.actions.openHeightContactSensor();
          }}
        >
          Contact Sensor Open
        </a>
        <a
          href="#"
          onClick={() => {
            sensors?.actions.closeHeightContactSensor();
          }}
        >
          Contact Sensor Close
        </a>
      </div>
    </div>
  );
};
