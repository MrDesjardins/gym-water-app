import { MagneticContactSensorObserverPayload } from "../../src/sensors/magneticContactSensor";
import { WeightSensorObserverPayload } from "../../src/sensors/weightSensor";

export class MagneticContactGpio {
  private loopRef: NodeJS.Timer | undefined = undefined;

  private isOpen: boolean = false;
  private lastIsOpen: boolean = false;

  public constructor(
    private useFakeSensors: boolean,
    private updateCallback: (data: MagneticContactSensorObserverPayload) => void,
  ) {
    if (this.useFakeSensors) {
      this.runFakeWeightLoop();
    } else {
      this.listenGpioPin();
    }
  }
  public setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
  public listenGpioPin(): void {
    // Todo
  }
  public runFakeWeightLoop(): void {
    this.loopRef = setInterval(() => this.loop(), 500);
  }
  private loop() {
    if (this.lastIsOpen !== this.isOpen) {
      this.lastIsOpen = this.isOpen;
      this.updateCallback({ isOpen: this.isOpen });
    }
  }
}
