import { WeightSensorObserverPayload } from "../../common/weightSensorObserverPayload";

export class WeightGpio {
  private loopRef: NodeJS.Timer | undefined = undefined;
  private desiredWeightLbs: number = 0;
  private lastSensorReceivedWeightLbs: number = 0;

  public constructor(
    private useFakeSensors: boolean,
    private updateCallback: (data: WeightSensorObserverPayload) => void,
  ) {
    if (this.useFakeSensors) {
      this.runFakeWeightLoop();
    } else {
      this.listenGpioPin();
    }
  }
  public setDesiredWeight(lbs: number): void {
    this.desiredWeightLbs = lbs;
  }
  public listenGpioPin(): void {
    // Todo
  }
  public runFakeWeightLoop(): void {
    this.loopRef = setInterval(() => this.loop(), 500);
  }
  private loop() {
    if (this.desiredWeightLbs !== this.lastSensorReceivedWeightLbs) {
      console.log("Weight", this.desiredWeightLbs, this.lastSensorReceivedWeightLbs);
      const diff = this.desiredWeightLbs - this.lastSensorReceivedWeightLbs;
      if (Math.abs(diff) >= 5) {
        this.lastSensorReceivedWeightLbs += diff > 0 ? 5 : -5; // Fake the water moving
      } else {
        this.lastSensorReceivedWeightLbs = this.desiredWeightLbs;
      }
    }
    this.updateCallback({ lbs: this.lastSensorReceivedWeightLbs }); // Fake still send all the time back data to the client
  }
}
