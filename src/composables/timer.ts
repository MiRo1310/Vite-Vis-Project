import { computed } from "vue";
import { Timers } from "@/types/types.ts";

export const getNameByIndex = computed(() => (timers: Timers, index: number): string => {
  const timerName = timers[index as keyof Timers]?.name?.val;
  return timerName && timerName !== "Timer" ? timerName : `Timer ${index}`;
});
