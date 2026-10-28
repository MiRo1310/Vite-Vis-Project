<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import DotWithValue from "@/components/shared/display/DotWithValue.vue";
import OverviewTabContent from "@/components/section/home/overview/OverviewTabContent.vue";
import { DataCard } from "@/components/shared/card";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";

defineProps<{ value: string }>();
const { iobroker } = useIobrokerStore();

const heating = computed(() => iobroker.heating);
</script>

<template>
  <OverviewTabContent :value :to="routes.heating.path" label="Heizung">
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Heizung" content-class="flex items-center gap-1.5">
        <DotWithValue :value="heating.active" />
      </DataCard>
      <DataCard title="Auto" content-class="flex items-center gap-1.5">
        <DotWithValue :value="heating.automatic" />
      </DataCard>
      <DataCard title="Temperatur">
        <MetricValue v-bind="heating.heatingTemperature.valAndUnit" />
      </DataCard>
      <DataCard title="Solar Auto" content-class="flex items-center gap-1.5">
        <DotWithValue :value="heating.autoSolar" />
      </DataCard>
      <DataCard title="Solar Pumpe" content-class="flex items-center gap-1.5">
        <DotWithValue :value="heating.solarPump" />
      </DataCard>
      <DataCard title="Solar">
        <MetricValue v-bind="heating.heatingSolar.valAndUnit" />
      </DataCard>
      <DataCard title="Puffer Oben">
        <MetricValue v-bind="heating.heatingBufferTop.valAndUnit" value-class="text-orange-300" />
      </DataCard>
      <DataCard title="Puffer Mitte">
        <MetricValue v-bind="heating.heatingBufferMiddle.valAndUnit" value-class="text-orange-300" />
      </DataCard>
      <DataCard title="Puffer Unten">
        <MetricValue v-bind="heating.heatingBuffer.valAndUnit" value-class="text-blue-300" />
      </DataCard>
    </div>
  </OverviewTabContent>
</template>
