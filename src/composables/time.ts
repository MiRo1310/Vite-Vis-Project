import { ref } from "vue";

let timeFunc: null | ReturnType<typeof timer> = null;
export const useTime = () => {
  if (!timeFunc) {
    timeFunc = timer();
  }
  return timeFunc;
};

const timer = () => {

  const d = new Date();
  const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const time = ref<string | null>(d.toLocaleTimeString());
  const date = ref<string | null>(weekdays[d.getDay()] + " " + d.toLocaleDateString());
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