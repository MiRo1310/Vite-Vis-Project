<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, Ref } from "vue";
import { CalendarDayType } from "@/types/types.ts";
import { useRouter } from "vue-router";
import { stringToJSON } from "@/lib/string.ts";
import CalendarDay from "@/components/section/home/CalenderDay.vue";

const { calendar } = storeToRefs(useIobrokerStore());
const router = useRouter();

const data: Ref<CalendarDayType[]> = computed(() => {
  return stringToJSON(calendar.value.table?.val || "[]");
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
  if (data.value) {
    return data.value.filter((day) => {
      return day.date.includes("Morgen") || isInTimeRange(day);
    });
  }
  return [];
});

const isInTimeRange = (day: CalendarDayType): boolean => {
  const now = new Date();
  const start = new Date(day._object.start);
  const end = new Date(day._object.end);
  return now >= start && now <= end;
};
</script>
<template>
  <Card styling="light" class="calendar" @click="router.push({ name: 'calendar' })">
    <CardHeader>
      <CardTitle>Familien Kalendar</CardTitle>
    </CardHeader>
    <CardContent class="calendar__content">
      <CalendarDay :data="today" />
      <CalendarDay :data="tomorrow" />
    </CardContent>
  </Card>
</template>
<style scoped lang="scss">
.calendar {
  @apply w-80;

  &__content {
    @apply flex flex-col gap-2;
  }
}
</style>
