import { MagneticContactSensorObserverPayload } from "../magneticContactSensor";

export function fakeMagneticSensor(send: (data: MagneticContactSensorObserverPayload) => void): {
  start: () => void;
  stop: () => void;
} {
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
