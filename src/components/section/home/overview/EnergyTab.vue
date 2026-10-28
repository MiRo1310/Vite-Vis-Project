<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import OverviewTabContent from "@/components/section/home/overview/OverviewTabContent.vue";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { DataCard } from "@/components/shared/card";

defineProps<{ value: string }>();
const { iobroker } = useIobrokerStore();

const pv = computed(() => iobroker.pv);
const energy = computed(() => iobroker.energy);
</script>

<template>
  <OverviewTabContent :value :to="routes.energy.path" label="Energie">
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Bezug heute">
        <MetricValue v-bind="energy.energyReceived.valAndUnit" :decimal-places="2" />
      </DataCard>
      <DataCard title="Einspeisung heute">
        <MetricValue v-bind="energy.energyReturned.valAndUnit" :decimal-places="2" value-class="text-green-400" />
      </DataCard>
      <DataCard title="Verkauft">
        <MetricValue v-bind="pv.profit.valAndUnit" :decimal-places="2" value-class="text-green-400" />
      </DataCard>
      <DataCard title="Genutzt">
        <MetricValue :val="pv.savedMoney.value - pv.profit.value" unit="€" :decimal-places="2" />
      </DataCard>
      <DataCard title="Ersparnis">
        <MetricValue v-bind="pv.savedMoney.valAndUnit" :decimal-places="2" value-class="text-green-400" />
      </DataCard>
    </div>
  </OverviewTabContent>
</template>
