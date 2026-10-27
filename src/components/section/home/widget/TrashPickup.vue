<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { Trash2 } from "lucide-vue-next";
import { DataCard } from "@/components/shared/card";
import { type Days, days } from "@/constants/constants.ts";
import { trashData } from "@/constants/trash.ts";

const { iobroker } = useIobrokerStore();

const transformDate = (date: number) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
};

const trashEvents = computed(() => iobroker.trash.json.parsed([]));

function getAnimation(daysLeft: number): string {
  if (daysLeft <= 1) {
    return "animate-pulse";
  }
  return "";
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <DataCard v-for="(event, index) in trashEvents" :key="index" :title="trashData.shortName(event.name)" content-class="space-y-0.5">
      <div :class="['flex items-center gap-1.5', getAnimation(event.daysLeft)]">
        <Trash2 class="size-4 shrink-0" :class="trashData.color(event.name)" />
        <span class="text-sm font-semibold">{{ event.daysLeft }} Tag(e)</span>
      </div>
      <p class="text-xs text-muted-foreground">{{ transformDate(event.nextDate) }} {{ days[new Date(event.nextDate).getDay() as keyof Days] }}</p>
    </DataCard>
  </div>
</template>
