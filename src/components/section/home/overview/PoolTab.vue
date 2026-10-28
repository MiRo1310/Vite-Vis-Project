<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import DotWithValue from "@/components/shared/display/DotWithValue.vue";
import OverviewTabContent from "@/components/section/home/overview/OverviewTabContent.vue";
import { DataCard } from "@/components/shared/card";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { wpModus } from "@/composables/heat-pump.ts";

defineProps<{ value: string }>();
const { iobroker } = useIobrokerStore();

const pool = computed(() => iobroker.pool);
</script>

<template>
  <OverviewTabContent :value :to="routes.heatPump.path" label="WP">
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Wärmepumpe" content-class="flex items-center gap-1.5">
        <DotWithValue :value="pool.heaterState" />
      </DataCard>
      <DataCard title="Silent" content-class="flex items-center gap-1.5">
        <DotWithValue :value="pool.silent" />
      </DataCard>
      <DataCard title="Modus">
        <MetricValue :val="wpModus" unit="" />
      </DataCard>
      <DataCard title="WP Bezug">
        <MetricValue v-bind="pool.consumption.valAndUnit" :decimal-places="0" />
      </DataCard>
      <DataCard title="Eingang">
        <MetricValue v-bind="pool.tempIn.valAndUnit" :decimal-places="1" value-class="text-blue-300" />
      </DataCard>
      <DataCard title="Ausgang">
        <MetricValue v-bind="pool.tempOut.valAndUnit" :decimal-places="1" value-class="text-orange-300" />
      </DataCard>
      <DataCard title="Soll">
        <MetricValue v-bind="pool.tempSet.valAndUnit" :decimal-places="1" />
      </DataCard>
      <DataCard title="Poolpumpe" content-class="flex items-center gap-1.5">
        <DotWithValue :value="pool.poolPumpSwitch" />
      </DataCard>
      <DataCard title="Pumpe Bezug">
        <MetricValue v-bind="pool.poolPumpPower.valAndUnit" :decimal-places="0" />
      </DataCard>
    </div>
  </OverviewTabContent>
</template>
