import { MagneticContactSensorActions, MagneticContactSensorObserverPayload } from "../magneticContactSensor";

export function fakeMagneticSensor(
  send: (data: MagneticContactSensorObserverPayload) => void,
): MagneticContactSensorActions {
  let isOpen: boolean = false;

  return {
    start: () => {
      isOpen = true;
      send({ isOpen: isOpen });
    },
    stop: () => {
      isOpen = false;
      send({ isOpen: isOpen });
    },
  };
}
