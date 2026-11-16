<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useAppStore } from "@/store/app-store.ts";
import { getNameByIndex } from "@/lib/timer.ts";
import { DataCard } from "@/components/shared/card";
import { ALEXA_TIMER_DASHBOARD_SLOTS } from "@/constants/timer.ts";

const { iobroker } = useIobrokerStore();
const appStore = useAppStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-2" @click="appStore.toggleTimerVisibility()">
    <DataCard
      v-for="i in ALEXA_TIMER_DASHBOARD_SLOTS"
      :key="i"
      :title="iobroker.timers ? getNameByIndex(iobroker.timers, i) : `Timer ${i}`"
      clickable
      content-class="space-y-0.5"
    >
      <span class="text-sm font-semibold font-mono tabular-nums">
        {{ iobroker.timers[i].timeString.value || "–" }}
      </span>
      <p class="text-xs text-muted-foreground truncate">
        {{ iobroker.timers[i].device.value || "–" }}
      </p>
    </DataCard>
  </div>
</template>
