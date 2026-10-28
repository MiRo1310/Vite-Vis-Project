<script setup lang="ts">
import { DataCard } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import CalendarDay from "@/components/section/home/widget/CalendarDay.vue";
import { routes } from "@/router/routes.ts";
import { isInTimeRange } from "@/lib/calendar.ts";

const { iobroker } = useIobrokerStore();

const data = computed(() => iobroker.calendar.table.parsed([]));

const today = computed(() => {
  return data.value.filter((day) => {
    return day.date.includes("Heute") || isInTimeRange(day);
  });
});

const tomorrow = computed(() => {
  return data.value.filter((day) => {
    return day.date.includes("Morgen") || isInTimeRange(day, 1);
  });
});
</script>

<template>
  <DataCard :to="routes.calender.path" content-class="p-2 flex flex-col gap-2">
    <CalendarDay :data="today" title="Heute" />
    <CalendarDay :data="tomorrow" title="Morgen" />
  </DataCard>
</template>
