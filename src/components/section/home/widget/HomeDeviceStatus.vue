<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { DataCard, SectionGroup } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { routes } from "@/router/routes.ts";
import OnlineActiveRows from "@/components/shared/display/OnlineActiveRows.vue";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { usePwaUpdateSingleton } from "@/composables/pwaUpdate.ts";
import { landroidData } from "@/constants/landroid.ts";

const ioBrokerStore = useIobrokerStore();
const { iobroker } = ioBrokerStore;
const { infos: infoStore } = ioBrokerStore.iobroker;

const landroidStatusLabel = computed(() => {
  const code = iobroker.landroid.status.value;
  if (!iobroker.landroid.online.value) {
    return "Offline";
  }
  return landroidData.status(code);
});

const logCounts = computed(() => ({
  error: iobroker.logs.error.parsed([]).length,
  warning: iobroker.logs.warning.parsed([]).length,
  info: iobroker.logs.info.parsed([]).length,
}));
const hasLogs = computed(() => logCounts.value.error > 0 || logCounts.value.warning > 0 || logCounts.value.info > 0);
</script>

<template>
  <div class="flex flex-col gap-2 text-xs">
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Updates" :to="routes.iobrokerInfo.path" content-class="flex items-center gap-1.5">
        <MetricValue :val="infoStore.updatesNumber.value + (usePwaUpdateSingleton.updateAvailable.value ? 1 : 0)" unit="verfügbar" />
      </DataCard>

      <DataCard title="Logs" :to="routes.logs.path" content-class="flex flex-wrap gap-1">
        <Badge v-if="logCounts.error" :value="logCounts.error" color="red" />
        <Badge v-if="logCounts.warning" :value="logCounts.warning" color="orange" />
        <Badge v-if="logCounts.info" :value="logCounts.info" color="blue" />
        <span v-if="!hasLogs" class="text-xs text-muted-foreground">–</span>
      </DataCard>
    </div>

    <!-- Klima -->
    <SectionGroup title="Klima">
      <DataCard title="Schlafen" content-class="space-y-1">
        <OnlineActiveRows :online="iobroker.airConditioners.schlafenOnline.value" :active="iobroker.airConditioners.schlafenOnline.value" />
      </DataCard>
      <DataCard title="Kinderzimmer" content-class="space-y-1">
        <OnlineActiveRows :online="iobroker.airConditioners.childOnline.value" :active="iobroker.airConditioners.childPowerStatus.value" />
      </DataCard>
    </SectionGroup>

    <!-- Rasenmäher -->
    <SectionGroup title="Rasenmäher">
      <DataCard title="Status" content-class="flex items-center gap-1.5">
        <StatusDot :active="iobroker.landroid.online.value" />
        <span class="text-xs font-semibold truncate">{{ landroidStatusLabel }}</span>
      </DataCard>
      <DataCard title="Akku">
        <MetricValue v-if="iobroker.landroid.online.value" :number-value="iobroker.landroid.battery" />
        <span v-else>-</span>
      </DataCard>
    </SectionGroup>

    <!-- Wärmepumpe & Pool -->
    <SectionGroup title="Pool">
      <DataCard title="Wärmepumpe" :to="routes.heatPump.path" content-class="flex flex-col gap-1.5">
        <OnlineActiveRows :online="iobroker.pool.heaterOnline.value" :active="iobroker.pool.heaterState.value" />
      </DataCard>
      <DataCard title="Poolpumpe" :to="routes.heatPump.path" content-class="flex flex-col gap-1.5">
        <OnlineActiveRows :online="iobroker.pool.poolPumpSwitch.value" :active="iobroker.pool.poolPumpPower.value > 40" />
      </DataCard>
    </SectionGroup>
  </div>
</template>
