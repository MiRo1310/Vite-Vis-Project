<script setup lang="ts">
import { CalendarDayType } from "@/types/types.ts";
import { getLocalTimeString } from "@/lib/date.ts";

defineProps<{ data: CalendarDayType[]; title: string }>();

function isNotAllDayEvent(event: CalendarDayType) {
  return getLocalTimeString(event._object.start) !== "00:00:00" && getLocalTimeString(event._object.end) !== "00:00:00";
}
</script>

<template>
  <div class="rounded-lg bg-muted/40 px-3 py-2">
    <p class="text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wide">{{ title }}</p>
    <template v-if="data.length">
      <p v-for="(event, index) in data" :key="index" class="text-xs flex justify-between gap-2 py-0.5">
        <span class="font-medium">{{ event._object.summary }}</span>
        <span v-if="isNotAllDayEvent(event)" class="text-muted-foreground shrink-0">
          {{ getLocalTimeString(event._object.start) }}
        </span>
      </p>
    </template>
    <p v-else class="text-xs text-muted-foreground italic">Keine Termine</p>
  </div>
</template>
