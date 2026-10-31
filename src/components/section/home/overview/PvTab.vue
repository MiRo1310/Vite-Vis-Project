<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import Surplus from "@/components/section/pv/Surplus.vue";
import WallboxSummary from "@/components/section/home/overview/WallboxSummary.vue";
import OverviewTabContent from "@/components/section/home/overview/OverviewTabContent.vue";
import { DataCard } from "@/components/shared/card";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { chargingTime } from "@/composables/battery.ts";
import { routes } from "@/router/routes.ts";

defineProps<{ value: string }>();

const { iobroker } = useIobrokerStore();

const pv = computed(() => iobroker.pv);
const charging = computed(() => pv.value.activeCharging.value);
</script>

<template>
  <OverviewTabContent :value :to="routes.pv.path" label="PV">
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Große PV">
        <MetricValue v-bind="pv.pvGross.valAndUnit" :decimal-places="0" />
      </DataCard>
      <DataCard title="Kleine PV">
        <MetricValue v-bind="pv.smallPv.valAndUnit" :decimal-places="0" />
      </DataCard>

      <Surplus />

      <DataCard :title="charging > 0 ? 'Batterie laden' : 'Batterie entladen'">
        <MetricValue
          :val="Math.abs(charging)"
          unit="W"
          :decimal-places="0"
          :value-class="charging > 0 ? 'text-green-400' : charging < 0 ? 'text-orange-400' : ''"
        />
      </DataCard>
      <DataCard title="Ladestatus Haus-Batterie" content-class="flex items-center gap-1.5">
        <MetricValue v-bind="pv.batteryCharging.valAndUnit" :decimal-places="0" />
      </DataCard>
      <DataCard :title="charging > 0 ? 'Geschätzte Restladedauer' : 'Geschätzte Restentladedauer'">
        <MetricValue
          :value-class="charging > 0 ? 'text-green-400' : charging < 0 ? 'text-orange-400' : ''"
          :val="chargingTime({ batteryCapacity: 6.5, currentBatteryPercent: pv.batteryCharging.value, currentPowerW: charging })"
          unit="Std"
        />
      </DataCard>

      <div class="w-full col-span-2">
        <WallboxSummary />
      </div>
    </div>
  </OverviewTabContent>
</template>
