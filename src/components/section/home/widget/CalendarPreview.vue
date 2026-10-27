<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { useRouter } from "vue-router";
import CalendarDay from "@/components/section/home/widget/CalendarDay.vue";
import { routes } from "@/router/routes.ts";
import { isInTimeRange } from "@/lib/calendar.ts";

const { iobroker } = useIobrokerStore();
const router = useRouter();

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
  <Card class="py-0 gap-0 rounded-md cursor-pointer hover:bg-accent transition-colors" @click="router.push({ name: routes.calender.name })">
    <CardContent class="p-2 flex flex-col gap-2">
      <CalendarDay :data="today" title="Heute" />
      <CalendarDay :data="tomorrow" title="Morgen" />
    </CardContent>
  </Card>
</template>
