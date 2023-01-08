export class Time {
  static deltaTime: number = 0;
  private static lastTime: DOMHighResTimeStamp = 0;

  static update(now: DOMHighResTimeStamp) {
    if (this.lastTime === 0) {
      this.lastTime = now;
    }

    this.deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;
  }
}
