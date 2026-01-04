<script setup lang="ts">
import { CalendarDayType } from "@/types/types.ts";
import { getLocalTimeString } from "@/lib/date.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

defineProps<{ data: CalendarDayType[]; title: string }>();

function isNotAllDayEvent(event: CalendarDayType) {
  return getLocalTimeString(event._object.start) !== "00:00:00" && getLocalTimeString(event._object.end) !== "00:00:00";
}
</script>

<template>
  <CardSubcard>
    <p class="text-xs font-bold">{{ title }}</p>
    <TextSeparator />
    <p v-for="(event, index) in data" :key="index" class="text-xs font-bold flex justify-between">
      <span>{{ event._object.summary }}</span>
      <span v-if="isNotAllDayEvent(event)" class="ml-2"
        >{{ getLocalTimeString(event._object.start) }} bis {{ getLocalTimeString(event._object.end) }}</span
      >
    </p>
  </CardSubcard>
</template>
