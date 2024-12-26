<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { CalendarDay } from "@/types/types.ts";
import CalenderMonthDayDialog from "@/components/section/calendar/CalendarMonthDayDialog.vue";

const { calendar } = storeToRefs(useIobrokerStore());
const props = defineProps<{ dayIndex: number, month: number, year: number, isToday: boolean }>();

const getDayValue = computed(() => {
  if (!calendar.value.table) {
    return;
  }
  try {
    const cal: CalendarDay[] = JSON.parse(calendar.value.table?.val || "[]");
    return cal.filter((day) => isDateBetween(day));
  } catch (error) {
    console.error(error);
  }
  return [];
});

function isDateBetween(day: CalendarDay): boolean | undefined {
  const start = new Date(day._object.start);
  const end = new Date(day._object.end);
  if (!props.year || !props.month) {
    return;
  }
  return (
    isSameDay(start, end) &&
    isNotStartAtMidNight(start, 2) &&
    isNotStartAtMidNight(end, 1) &&
    isSameMonth(start, end) &&
    isSameYear(start, end)
  );
}

function isSameDay(start: Date, end: Date): boolean {
  if (!props.dayIndex) {
    return false;
  }
  return start.getDate() <= props.dayIndex + 1 && end.getDate() >= props.dayIndex + 1;
}

function isSameMonth(start: Date, end: Date): boolean {
  if (!props.month) {
    return false;
  }
  return start.getMonth() === props.month && end.getMonth() === props.month;
}

function isSameYear(start: Date, end: Date): boolean {
  if (!props.year) {
    return false;
  }
  return start.getFullYear() === props.year && end.getFullYear() === props.year;
}

function isNotStartAtMidNight(date: Date, param: number): boolean {
  if (!props.dayIndex) {
    return false;
  }
  return !(
    date.getDate() === props.dayIndex + param && date.toLocaleTimeString() === "00:00:00"
  );
}

function getColor(event: CalendarDay): string {
  if (event.event.includes("Melanie")) {
    return "bg-green-200";
  }
  if (event.event.includes("Hannah")) {
    return "bg-yellow-200";
  }
  if (event.event.includes("Michael")) {
    return "bg-blue-400";
  }
  return "";
}

const open = ref(false);
</script>
<template>
  <div
    :class="{ 'h-full': true,}"
    @click="open = !open"
  >
    <p class="line">
      <span :class="{ 'ml-1 pb-[1px] px-1 rounded-md inline-block': true, 'bg-blue-300 text-xs': isToday }">
        {{ dayIndex || dayIndex === 0 ? dayIndex + 1 : "" }}
      </span>
    </p>
    <div class=" overflow-auto max-h-[calc(6rem-22px)]">
      <p
        v-for="(event, index) in getDayValue" :key="index"
        class="text-xs px-1 mr-1 whitespace-nowrap truncate"
      >
        <span :class="[[getColor(event)], 'mb-[2px] inline-block']">{{ event.event }}</span>
      </p>
    </div>
  </div>

  <CalenderMonthDayDialog :open="open" :events="getDayValue" v-bind="props" @update:open="open = $event" />
</template>
