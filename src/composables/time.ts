import { onUnmounted, ref } from 'vue';

export const useTime = () => {

    const d = new Date();
    const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const time = ref<string | null>(d.toLocaleTimeString())
    const date = ref<string | null>(weekdays[d.getDay()] + " " + d.toLocaleDateString())
    const hour = ref(0)
    const minute = ref(0)
    const weekday = ref("")

    const interval = setInterval(() => {
        const d = new Date();
        time.value = d.toLocaleTimeString()
        date.value = weekdays[d.getDay()] + " " + d.toLocaleDateString()
        weekday.value = weekdays[d.getDay()]
        hour.value = d.getHours()
        minute.value = d.getMinutes()
    }, 1000);
    onUnmounted(() => {
        clearInterval(interval);
    });

    return { time, date, weekday, hour, minute }
}