<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { DataCard } from "@/components/shared/card";
import MetricValue from "@/components/shared/display/MetricValue.vue";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <DataCard title="Günstigster Sprit" :to="routes.tanker_koenig.path" content-class="space-y-0.5">
    <MetricValue :number-value="iobroker.tankerKoenig.cheapestPrice" />

    <p class="text-xs text-muted-foreground truncate">{{ iobroker.tankerKoenig.cheapestName.value }}</p>
    <p class="text-xs text-muted-foreground truncate">{{ iobroker.tankerKoenig.cheapestFullStreet.value }}</p>
    <p v-if="iobroker.tankerKoenig.cheapestPrice.ts" class="text-xs text-muted-foreground">
      {{ new Date(iobroker.tankerKoenig.cheapestPrice.ts).toLocaleString() }}
    </p>
  </DataCard>
</template>
