export const getNameByIndex = (timers: { [key: number]: { name?: { value: string } } }, index: number): string => {
  const timerName = timers[index].name?.value;
  return timerName && timerName !== "Timer" ? timerName : `Timer ${index}`;
};
