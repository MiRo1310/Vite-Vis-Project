<script setup lang="ts">
import { computed } from "vue";
import { DataCard } from "@/components/shared/card";
import { Progress } from "@/components/ui/progress";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { ioBrokerService } from "@/lib/io-broker-service.ts";

const total = computed(() => ioBrokerService.subscribedIdsCount.value);
const done = computed(() => ioBrokerService.subscribedDoneIdsCount.value);
const progress = computed(() => (total.value > 0 ? (done.value / total.value) * 100 : 0));
</script>

<template>
  <DataCard title="Subscribed IDs" content-class="space-y-1">
    <MetricValue :val="`${done} / ${total}`" />
    <Progress :model-value="progress" class="h-1.5" />
  </DataCard>
</template>
