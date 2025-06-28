<script setup lang="ts">
import Dialog from "@/components/shared/dialog/Dialog.vue";

import { ref, watchEffect } from "vue";
import { CalendarDayType } from "@/types/types.ts";

const props = defineProps<CalendarMonthDayDialog>();

interface CalendarMonthDayDialog {
  open: boolean;
  events: CalendarDayType[] | undefined;
  dayIndex?: number | undefined;
  month?: number;
  year?: number;
}

const emit = defineEmits(["update:open"]);

const localOpen = ref(false);

watchEffect(() => {
  localOpen.value = props.open;
});

const updateOpen = (value: boolean) => {
  localOpen.value = value;
  emit("update:open", value);
};
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>
<template>
  <Dialog :open="localOpen" @update:open="updateOpen($event)">
    <template #title>
      {{ dayIndex ? `${dayIndex + 1}.${month}.${year}` : "" }}
    </template>
    <template #description>
      <div v-if="events">
        <div v-for="event in events" :key="event._IDID" class="flex justify-between mt-2">
          <div>{{ event._object.summary }}</div>
          <div v-if="!event._allDay" class="flex">
            <div>{{ formatTime(event._object.start) }}</div>
            <span class="mx-1">-</span>
            <div>{{ formatTime(event._object.end) }}</div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
