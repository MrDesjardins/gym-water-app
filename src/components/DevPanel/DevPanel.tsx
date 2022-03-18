import { createSignal, onCleanup, onMount } from "solid-js";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { useSensors } from "../../sensors/context/SensorsContext";
import { FakeMagneticSensorSingleton } from "../../sensors/fakeSensors/fakeMagneticSensor";
import { FakeUltraSonirSensorSingleton } from "../../sensors/fakeSensors/fakeUltraSonicSensor";
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
          FakeMagneticSensorSingleton.isOpen = true;
          FakeUltraSonirSensorSingleton.isMoving = true;
        }}
      >
        Contact Sensor Open + Start Moving
      </a>
      <a
        href="#"
        onClick={() => {
          FakeMagneticSensorSingleton.isOpen = false;
          FakeUltraSonirSensorSingleton.isMoving = false;
        }}
      >
        Stop moving + Contact Sensor Close
      </a>
    </div>
  );
};
