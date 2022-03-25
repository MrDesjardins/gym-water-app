import { MagneticContactSensorActions, MagneticContactSensorObserverPayload } from "../magneticContactSensor";

export const FakeMagneticSensorSingleton = {
  isOpen: false,
};
export function fakeMagneticSensor(
  send: (data: MagneticContactSensorObserverPayload) => void,
): MagneticContactSensorActions {
  let ref = 0;
  let lastIsOpen = FakeMagneticSensorSingleton.isOpen;
  ref = window.setInterval(() => {
    if (lastIsOpen !== FakeMagneticSensorSingleton.isOpen) {
      lastIsOpen = FakeMagneticSensorSingleton.isOpen;
      send({ isOpen: FakeMagneticSensorSingleton.isOpen });
    }
  }, 1000);
  return {};
}
