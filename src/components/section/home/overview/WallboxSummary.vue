<script setup lang="ts">
import { computed } from "vue";
import type { WattPilotJson } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { DataCard, SectionGroup } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import CarCharging from "@/components/section/watt-pilot-and-car/CarCharging.vue";

const { iobroker } = useIobrokerStore();

const wallboxJson = computed((): WattPilotJson => iobroker.wattPilot.jsonScriptChargeLevel.parsed({} as WattPilotJson));
</script>

<template>
  <SectionGroup title="Wallbox">
    <RouterLink :to="routes.wattPilot.path">
      <DataCard title="Laden" class="h-full" clickable>
        <div class="flex items-center gap-1.5">
          <StatusDot :active="wallboxJson.charging ?? false" />
          <span class="text-xs font-semibold">{{ wallboxJson.charging ? "Aktiv" : "Inaktiv" }}</span>
        </div>
        <span v-if="wallboxJson.chargingPowerW" class="text-xs font-semibold"> {{ wallboxJson.chargingPowerW }} W</span>
      </DataCard>
    </RouterLink>
    <RouterLink :to="routes.wattPilot.path">
      <DataCard title="Ladestatus Auto-Batterie" clickable content-class="flex flex-col gap-1.5">
        <MetricValue :number-value="iobroker.car.battery" />
        <CarCharging :data="wallboxJson" />
      </DataCard>
    </RouterLink>
  </SectionGroup>
</template>
