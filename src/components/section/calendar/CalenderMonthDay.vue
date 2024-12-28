<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { CalendarDay } from "@/types/types.ts";
import CalenderMonthDayDialog from "@/components/section/calendar/CalendarMonthDayDialog.vue";
import { stringToJSON } from "@/lib/string.ts";
import { JSONStyle } from "@/components/section/calendar/DialogSettings.vue";

const { calendar, styles } = storeToRefs(useIobrokerStore());
const props = defineProps<{ dayIndex: number, month: number, year: number, isToday: boolean }>();

const getDayValue = computed(() => {

  if (!calendar.value.table) {
    return;
  }
  try {
    const cal: CalendarDay[] = JSON.parse(calendar.value.table?.val || "[]");
    return cal.filter((day) => {
      return isDateBetween(day);
    });
  } catch (error) {
    console.error(error);
  }
  return [];
});

function isDateBetween(day: CalendarDay): boolean | undefined {

  const start = new Date(day._object.start);
  const end = new Date(day._object.end);

  if (!props.year) {

    return;
  }

  return (
    isSameDay(start, end)
    && isNotStartAtMidNight(start, 2)
    && isNotStartAtMidNight(end, 1)
    && isSameMonth(start, end)
    && isSameYear(start, end)
  );
}

function isSameDay(start: Date, end: Date): boolean {
  return start.getDate() <= props.dayIndex + 1 && end.getDate() >= props.dayIndex + 1;
}

function isSameMonth(start: Date, end: Date): boolean {
  return start.getMonth() === props.month && end.getMonth() === props.month;
}

function isSameYear(start: Date, end: Date): boolean {
  if (!props.year) {
    return false;
  }
  return start.getFullYear() === props.year && end.getFullYear() === props.year;
}

function isNotStartAtMidNight(date: Date, param: number): boolean {
  return !(
    date.getDate() === props.dayIndex + param && date.toLocaleTimeString() === "00:00:00"
  );
}


const getColor = computed(() => (event: CalendarDay): string => {

  let keys = stringToJSON(styles.value?.calendarStyle?.val) as JSONStyle[];
  if (!Array.isArray(keys)) {
    keys = [];
  }

  for (const key of keys) {
    if (event.event.includes(key.name)) {
      return key.color;
    }
  }
  return "";
});

const open = ref(false);
</script>
<template>
  <div class="flex-1 max-w-full" @click="open = !open">
    <p class="line block">
      <span :class="{ 'ml-1 pb-[1px] px-1 rounded-md inline-block text-xs': true, 'bg-blue-300 text-xs': isToday }">
        {{ dayIndex || dayIndex === 0 ? dayIndex + 1 : "" }}
      </span>
    </p>
    <div class="overflow-auto max-h-[calc(6rem-22px)] ">
      <div
        v-for="(event, index) in getDayValue" :key="index"
        class="text-xs"
      >
        <p :class="[[getColor(event)], 'mb-[2px] px-2 mt-[1px] block truncate']">
          {{ event.event }}
        </p>
      </div>
    </div>
  </div>

  <CalenderMonthDayDialog :open="open" :events="getDayValue" v-bind="props" @update:open="open = $event" />
</template>
