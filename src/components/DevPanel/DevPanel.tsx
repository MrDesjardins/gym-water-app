import { useSensors } from "../../sensors/SensorsContext";
import styles from "./DevPanel.module.css";
export const DevPanel = () => {
  const sensors = useSensors();
  return (
    <div class={styles.dev}>
      <h3> Dev Panel: Fake Sensors Actions</h3>
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
  );
};
