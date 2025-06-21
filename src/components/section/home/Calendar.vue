<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, Ref } from "vue";
import { CalendarDay } from "@/types/types.ts";
import { useRouter } from "vue-router";
import { stringToJSON } from "@/lib/string.ts";

const { calendar } = storeToRefs(useIobrokerStore());
const router = useRouter();

const data: Ref<CalendarDay[]> = computed(() => {
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

const isInTimeRange = (day: CalendarDay): boolean => {
  const now = new Date();
  const start = new Date(day._object.start);
  const end = new Date(day._object.end);
  return now >= start && now <= end;
};

const tomorrow = computed(() => {
  if (data.value) {
    return data.value.filter((day) => {
      return day.date.includes("Morgen") || isInTimeRange(day);
    });
  }
  return [];
});

function getLocalTimeString(event: string) {
  return new Date(event).toLocaleTimeString();
}

function isNotAllDayEvent(event: CalendarDay) {
  return getLocalTimeString(event._object.start) !== "00:00:00" && getLocalTimeString(event._object.end) !== "00:00:00";
}
</script>
<template>
  <Card styling="light" class="w-80" @click="router.push({ name: 'calendar' })">
    <CardHeader>
      <CardTitle>Familien Kalendar</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="calendar__section">
        <p class="text-accent-foreground/70 text-xs font-bold mb-2 line">Heute</p>
        <p v-for="(event, index) in today" :key="index" class="text-accent-foreground/50 text-xs font-bold flex justify-between">
          <span>{{ event._object.summary }}</span>
          <span v-if="isNotAllDayEvent(event)" class="ml-2"
            >{{ getLocalTimeString(event._object.start) }} bis {{ getLocalTimeString(event._object.end) }}</span
          >
        </p>
      </div>
      <div class="calendar__section mt-2">
        <p class="text-accent-foreground/70 text-xs font-bold my-2 line">Morgen</p>
        <p v-for="(event, index) in tomorrow" :key="index" class="text-accent-foreground/50 text-xs font-bold flex justify-between">
          <span>{{ event._object.summary }}</span>
          <span v-if="isNotAllDayEvent(event)">{{ getLocalTimeString(event._object.start) }} bis {{ getLocalTimeString(event._object.end) }}</span>
        </p>
      </div>
    </CardContent>
  </Card>
</template>
<style>
.calendar__section {
  @apply bg-white p-2 shadow-lg;
}
</style>
