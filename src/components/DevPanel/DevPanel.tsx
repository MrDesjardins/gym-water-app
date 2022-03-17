import { createSignal, onCleanup, onMount } from "solid-js";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { useSensors } from "../../sensors/context/SensorsContext";
import styles from "./DevPanel.module.css";

/**
 * Hidden panel. Dev only.
 *
 * This is visually under what is displayed in the real UI. The goal
 * is to allow while developing the app, to simulate the real sensors
 **/
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
        Contact Sensor Open + Start Moving
      </a>
      <a
        href="#"
        onClick={() => {
          sensors?.sensors.ultraSonicSensor.stopListening();
          sensors?.sensors.magneticContactSensor.stopListening();
        }}
      >
        Stop moving + Contact Sensor Close
      </a>
    </div>
  );
};
