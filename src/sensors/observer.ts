import { Unpacked } from "../TypeScript/utilityTypes";

export class Observers<T extends (...args: any) => any> {
  private observers: T[] = [];
  public subscribe(observer: T): void {
    this.observers.push(observer);
  }
  public unSubscribe(observer: T): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notify(payload: Unpacked<Parameters<T>>): void {
    this.observers.forEach((o) => o(payload));
  }
}
