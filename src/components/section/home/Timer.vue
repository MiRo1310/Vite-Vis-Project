<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useAppStore } from "@/store/app-store.js";
import { type Timers } from "@/iobroker-states/subscribed-states.iobroker.ts";
import { getNameByIndex } from "@/composables/timer.ts";
import { DataCard } from "@/components/shared/card";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-2" @click="useAppStore().toggleTimerVisibility()">
    <DataCard
      v-for="i in 4"
      :key="i"
      :title="iobroker.timers ? getNameByIndex(iobroker.timers, i) : `Timer ${i}`"
      class="cursor-pointer hover:bg-accent transition-colors"
      content-class="space-y-0.5"
    >
      <span class="text-sm font-semibold font-mono tabular-nums">
        {{ iobroker.timers?.[i as keyof Timers]?.timeString?.value || "–" }}
      </span>
      <p class="text-xs text-muted-foreground truncate">
        {{ iobroker.timers?.[i as keyof Timers]?.device?.value || "–" }}
      </p>
    </DataCard>
  </div>
</template>
