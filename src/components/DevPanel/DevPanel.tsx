import { useSensors } from "../../sensors/context/SensorsContext";
import styles from "./DevPanel.module.css";
export const DevPanel = () => {
  const sensors = useSensors();
  return (
    <div class={styles.dev}>
      <h3> Dev Panel: Fake Sensors Actions</h3>
      <a
        href="#"
        onClick={() => {
          sensors?.sensors.magneticContactSensor.startListening();
          sensors?.sensors.ultraSonicSensor.startListening();
        }}
      >
        Contact Sensor Open
      </a>
      <a
        href="#"
        onClick={() => {
          sensors?.sensors.magneticContactSensor.stopListening();
          sensors?.sensors.ultraSonicSensor.stopListening();
        }}
      >
        Contact Sensor Close
      </a>
    </div>
  );
};
