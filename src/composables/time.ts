import { ref } from "vue";

let timeFunc: null | ReturnType<typeof timer> = null;
export const useTime = () => {
  timeFunc ??= timer();
  return timeFunc;
};

const timer = () => {
  const newDate = new Date();
  const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const time = ref<string | null>(newDate.toLocaleTimeString());
  const date = ref<string | null>(weekdays[newDate.getDay()] + " " + newDate.toLocaleDateString());
  const hour = ref<number | null>(null);
  const minute = ref(0);
  const weekday = ref("");

  const interval = setInterval(() => {
    const d = new Date();
    time.value = d.toLocaleTimeString();
    date.value = weekdays[d.getDay()] + " " + d.toLocaleDateString();
    weekday.value = weekdays[d.getDay()];
    hour.value = d.getHours();
    minute.value = d.getMinutes();
  }, 1000);

  function clear() {
    clearInterval(interval);
    timeFunc = null;
  }

  return { time, date, weekday, hour, minute, clear };
};
