<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { CalendarDayType } from "@/types/types.ts";
import { useRouter } from "vue-router";
import CalendarDay from "@/components/section/home/CalenderDay.vue";
import { toJSON } from "@michaelroling/ts-library";
import { getValString } from "@/lib/object.ts";

const { calendar } = storeToRefs(useIobrokerStore());
const router = useRouter();

const data = computed((): CalendarDayType[] => {
  return toJSON<CalendarDayType[]>(getValString(calendar.value.table)).json ?? [];
});

const today = computed(() => {
  if (data.value) {
    return data.value.filter((day) => {
      return day.date.includes("Heute") || isInTimeRange(day);
    });
  }
  return [];
});

const tomorrow = computed(() => {
  if (!data.value) {
    return [];
  }
  return data.value.filter((day) => {
    return day.date.includes("Morgen") || isInTimeRange(day, 1);
  });
});

const isInTimeRange = (day: CalendarDayType, offsetDay = 0): boolean => {
  const now = new Date();
  if (offsetDay) {
    now.setDate(now.getDate() + offsetDay);
  }
  const start = new Date(day._object.start);
  const end = new Date(day._object.end);
  return now >= start && now <= end;
};
</script>

<template>
  <Card styling="small" color="primary" @click="router.push({ name: 'calendar' })">
    <CardHeader>
      <CardTitle>Familien Kalendar</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-2">
      <CalendarDay :data="today" title="Heute" />
      <CalendarDay :data="tomorrow" title="Morgen" />
    </CardContent>
  </Card>
</template>
