<script setup lang="ts">
import CalendarAdjustDayOrder from "@/components/section/calendar/CalendarAdjustDayOrder.vue";
import CalendarMonthSelector from "@/components/section/calendar/CalendarMonthSelector.vue";
import CalenderMonthDay from "@/components/section/calendar/CalenderMonthDay.vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { computed, ref } from "vue";
import ColorSettings from "@/components/section/calendar/ColorSettings.vue";
import DialogSettings from "@/components/section/calendar/DialogSettings.vue";

const daysInMonth = ref(0);
const month = ref(0);
const year = ref(0);

const weekdays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

const isToday = computed(() => (i: number) => {
  const today = new Date();
  return (
    today.getDate() - 1 === i - 1 &&
    today.getMonth() === month.value &&
    today.getFullYear() === year.value
  );
});
const open = ref(false);
</script>
<template>
  <Card styling="light" class="h-full">
    <CardHeader class="p-2">
      <CardTitle>Familien Kalendar</CardTitle>
    </CardHeader>
    <CardContent class="px-2">
      <CalendarMonthSelector
        v-model:days-in-month="daysInMonth"
        v-model:month="month"
        v-model:year="year"
      >
        <ColorSettings v-model:open="open" />
      </CalendarMonthSelector>

      <div class="grid grid-cols-7 mt-2 -mx-1">
        <div
          v-for="i in 7"
          :key="i"
          class="h-6 text-xs m-[2px] flex items-center pl-2 default_card"
        >
          {{ weekdays[i - 1] }}
        </div>
        <CalendarAdjustDayOrder :month="month" :year="year" />

        <div
          v-for="i in daysInMonth"
          :key="i"
          :class="{
            'col-span-1 default_card pt-0 max-h-[7rem] m-[2px] flex': true,
            'border-blue-500 border-2 ': isToday(i),
          }"
        >
          <CalenderMonthDay
            :day-index="i - 1"
            :month="month"
            :year="year"
            :is-today="isToday(i)"
          />
        </div>
      </div>
    </CardContent>
  </Card>
  <DialogSettings v-model:open="open" />
</template>
