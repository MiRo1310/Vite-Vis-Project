<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { DataCard } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <DataCard :title="iobroker.pv.feedIn.value >= 0 ? 'Einspeisung' : 'Bezug'">
    <MetricValue
      :val="Math.abs(iobroker.pv.feedIn.value)"
      unit="W"
      :decimal-places="0"
      :value-class="iobroker.pv.feedIn.value >= 0 ? 'text-green-400' : 'text-destructive'"
    />
  </DataCard>
</template>
