import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import styles from "./DevPanel.module.css";

/**
 * Hidden panel. Dev only.
 *
 * This is visually under what is displayed in the real UI. The goal
 * is to allow while developing the app, to simulate the real sensors
 **/
export const DevPanel = () => {
  const serverCommunication = useServerCommunication();
  return (
    <div class={styles.dev}>
      <h3> Dev Panel: Fake Sensors Actions</h3>
      <a
        href="#"
        onClick={() => {
          serverCommunication?.client.__devSetMagneticContact(true);
          serverCommunication?.client.__devSetUltrasonic(true);
        }}
      >
        Contact Sensor Open + Start Moving
      </a>
      <a
        href="#"
        onClick={() => {
          serverCommunication?.client.__devSetMagneticContact(false);
          serverCommunication?.client.__devSetUltrasonic(false);
        }}
      >
        Stop moving + Contact Sensor Close
      </a>
    </div>
  );
};
