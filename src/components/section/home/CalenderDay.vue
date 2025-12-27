<script setup lang="ts">
import { CalendarDayType } from "@/types/types.ts";
import { getLocalTimeString } from "@/lib/date.ts";

defineProps<{ data: CalendarDayType[]; title: string }>();

function isNotAllDayEvent(event: CalendarDayType) {
  return getLocalTimeString(event._object.start) !== "00:00:00" && getLocalTimeString(event._object.end) !== "00:00:00";
}
</script>

<template>
  <div class="calendar-day">
    <p class="calendar-day__title line">{{ title }}</p>
    <p v-for="(event, index) in data" :key="index" class="calendar-day__event-wrapper">
      <span>{{ event._object.summary }}</span>
      <span v-if="isNotAllDayEvent(event)" class="calendar-day__event"
        >{{ getLocalTimeString(event._object.start) }} bis {{ getLocalTimeString(event._object.end) }}</span
      >
    </p>
  </div>
</template>

<style scoped lang="scss">
.calendar-day {
  @apply bg-cardCustom-info p-2 shadow-lg;

  &__title {
    @apply text-accent-foreground/70 text-xs font-bold mb-2;
  }

  &__event-wrapper {
    @apply text-accent-foreground/50 text-xs font-bold flex justify-between;
  }

  &__event {
    @apply ml-2;
  }
}
</style>
