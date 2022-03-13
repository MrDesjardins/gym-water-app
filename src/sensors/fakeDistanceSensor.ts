export function fakeDistanceSensor(startedTime: number, getData: (cm: number, sec: number) => boolean): void {
  let lastCm = 0;
  let direction = 1;

  const loop = () => {
    if (lastCm > 40) {
      direction = -1;
    }
    if (lastCm <= 0) {
      direction = 1;
    }
    lastCm += (2 + Math.random() * 5) * direction;
    if (direction === 1) {
      lastCm += 0.5;
    }
    if (getData(lastCm, Date.now())) {
      setTimeout(loop, 10 + Math.random() * 300); // Next fake fetched data in few ms
    } else {
      return; // Stop getting data
    }
  };
  setTimeout(loop, 0); // Start getting fake data
}
