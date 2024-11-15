<script setup lang="ts">
import CalendarAdjustDayOrder from "@/components/section/calendar/CalendarAdjustDayOrder.vue";
import CalendarMonthSelector from "@/components/section/calendar/CalendarMonthSelector.vue";
import CalenderMonthDay from "@/components/section/calendar/CalenderMonthDay.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ref } from "vue";

const daysInMonth = ref(0);
const month = ref(0);
const year = ref(0);

const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

</script>
<template>
  <Card class="h-[calc(100vh-1rem)]">
    <CardHeader class="p-2 ">
      <CardTitle>Familien Kalendar</CardTitle>
    </CardHeader>
    <CardContent class="px-2">
      <CalendarMonthSelector v-model:days-in-month="daysInMonth" v-model:month="month" v-model:year="year" />
      <div class="grid grid-cols-7 mt-2 -mx-1">
        <div v-for="(_, i) in 7" :key="i" class="bg-accent h-6 text-xs m-[2px] flex items-center pl-2">
          {{ weekdays[i] }}
        </div>
        <CalendarAdjustDayOrder :month="month" :year="year" />

        <div v-for="(_, i) in daysInMonth" :key="i" class="col-span-1 bg-accent  h-[6.8rem] m-[2px]">
          <CalenderMonthDay :day-index="i" :month="month" :year="year" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>