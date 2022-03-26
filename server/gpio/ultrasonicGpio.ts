import { UltraSonicSensorObserverPayload } from "../../src/sensors/ultraSonicSensor";

export class UltrasonicGpio {
  private loopRef: NodeJS.Timer | undefined = undefined;
  private isMoving: boolean = false;
  private lastIsMoving: boolean = false;
  private direction: number = 0;
  private lastCm: number = 0;

  public constructor(
    private useFakeSensors: boolean,
    private updateCallback: (data: UltraSonicSensorObserverPayload) => void,
  ) {
    if (this.useFakeSensors) {
      this.runFakeLoop();
    } else {
      this.listenGpioPin();
    }
  }
  public setMoving(isMoving: boolean): void {
    this.isMoving = isMoving;
  }
  public listenGpioPin(): void {
    // Todo
  }
  public runFakeLoop(): void {
    this.loopRef = setInterval(() => this.loop(), 500);
  }
  private loop() {
    if (this.isMoving) {
      if (this.lastIsMoving === false) {
        this.lastCm = 0;
        this.direction = 1;
      }
      if (this.lastCm > 40) {
        this.direction = -1;
      }
      if (this.lastCm <= Math.random() * 10) {
        // We might start a new rep not at exactly 0 cm from the bottom
        this.direction = 1;
      }
      this.lastCm += (0.2 + Math.random() * 1) * this.direction;
      this.updateCallback({ cm: this.lastCm, fullDateTimeInMs: Date.now() });
    }
    this.lastIsMoving = this.isMoving;
    if (this.loopRef !== undefined) {
      clearTimeout(this.loopRef);
    }
    this.loopRef = setTimeout(() => this.loop(), 1 + Math.random() * 60); // Next fake fetched data in few ms
  }
}
