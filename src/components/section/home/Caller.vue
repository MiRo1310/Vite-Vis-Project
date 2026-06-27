<script setup lang="ts">
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { formatSecondsToTime } from "@/lib/time.ts";
import { DataCard } from "@/components/shared/card";

const { iobroker } = useIobrokerStore();

const lastCallDuration = computed(() => {
  return formatSecondsToTime(Number(iobroker.phone.lastDuration.value) || 0);
});
</script>

<template>
  <DataCard title="Letzter Anruf" content-class="space-y-0.5">
    <p class="text-sm font-semibold truncate">{{ iobroker.phone?.lastCallerName?.val || "–" }}</p>
    <p class="text-xs text-muted-foreground">{{ iobroker.phone?.lastCaller?.val }}</p>
    <p class="text-xs text-muted-foreground">{{ iobroker.phone?.lastCallTimestamp?.val }}</p>
    <p class="text-xs text-muted-foreground">{{ lastCallDuration }}</p>
  </DataCard>
</template>
