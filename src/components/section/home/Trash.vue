<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { Trash2 } from "lucide-vue-next";
import { DataCard } from "@/components/shared/card";
import { Days, days } from "@/constants/constants.js";

const { iobroker } = useIobrokerStore();

const transformDate = (date: number) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
};

interface TrashType {
  name: string;
  nextDate: number;
  _color: string;
  timestamp: string;
  daysLeft: number;
}

const trashEvents = computed<TrashType[]>(() => {
  const jsonString = iobroker.trash?.json?.val;
  if (jsonString) {
    return JSON.parse(jsonString);
  }
  return [];
});

function shortName(name: string): string {
  if (name === "Papier Tonne") {
    return "Papier";
  }
  if (name === "Restmüll Tonne") {
    return "Restmüll";
  }
  if (name === "Biotonne") {
    return "Bio";
  }
  if (name === "Gelbe Tonne") {
    return "Gelb";
  }
  return name;
}

function getDotColor(name: string): string {
  if (name === "Papier Tonne") {
    return "text-blue-400";
  }
  if (name === "Restmüll Tonne") {
    return "text-gray-400";
  }
  if (name === "Biotonne") {
    return "text-trashBio";
  }
  if (name === "Gelbe Tonne") {
    return "text-yellow-300";
  }
  return "text-muted-foreground";
}

function getAnimation(daysLeft: number): string {
  if (daysLeft <= 1) {
    return "animate-pulse";
  }
  return "";
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <DataCard v-for="(event, index) in trashEvents" :key="index" :title="shortName(event.name)" content-class="space-y-0.5">
      <div :class="['flex items-center gap-1.5', getAnimation(event.daysLeft)]">
        <Trash2 class="size-4 shrink-0" :class="getDotColor(event.name)" />
        <span class="text-sm font-semibold">{{ event.daysLeft }} Tag(e)</span>
      </div>
      <p class="text-xs text-muted-foreground">{{ transformDate(event.nextDate) }} {{ days[new Date(event.nextDate).getDay() as keyof Days] }}</p>
    </DataCard>
  </div>
</template>
