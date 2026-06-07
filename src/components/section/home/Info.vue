<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { DataCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { routes } from "@/router/routes.ts";

const ioBrokerStore = useIobrokerStore();
const { getParsedLogs, iobroker } = ioBrokerStore;
const { infos: infoStore } = ioBrokerStore.iobroker;

const airConditioners = computed(() => iobroker.airConditioners);
const landroid = computed(() => iobroker.landroid);
const pool = computed(() => iobroker.pool);

const landroidStatusMap: Record<number, string> = {
  0: "Leerlauf",
  1: "Zuhause",
  2: "Startet",
  3: "Verlässt",
  4: "Folgt",
  5: "Sucht Heim",
  7: "Mäht",
  8: "Angehoben",
  9: "Blockiert",
  30: "Fährt heim",
  34: "Pause",
};

const landroidStatusLabel = computed(() => {
  const code = getStoreValNumber(landroid.value?.status);
  return landroidStatusMap[code] ?? `Status ${code}`;
});
</script>

<template>
  <div class="flex flex-col gap-2 text-xs">
    <div class="grid grid-cols-2 gap-2">
      <RouterLink :to="routes.iobrokerInfo.path">
        <DataCard title="Updates" clickable content-class="flex items-center gap-1.5">
          <span class="text-sm font-semibold">{{ infoStore?.updatesNumber?.val ?? 0 }}</span>
          <span class="text-xs text-muted-foreground">verfügbar</span>
        </DataCard>
      </RouterLink>
      <RouterLink :to="routes.logs.path">
        <DataCard title="Logs" clickable content-class="flex flex-wrap gap-1 cursor-pointer">
          <Badge v-if="getParsedLogs.error?.length" :value="getParsedLogs.error.length" color="red" />
          <Badge v-if="getParsedLogs.warn?.length" :value="getParsedLogs.warn.length" color="orange" />
          <Badge v-if="getParsedLogs.info?.length" :value="getParsedLogs.info.length" color="blue" />
          <span
            v-if="!getParsedLogs.error?.length && !getParsedLogs.warn?.length && !getParsedLogs.info?.length"
            class="text-xs text-muted-foreground"
            >–</span
          >
        </DataCard>
      </RouterLink>
    </div>

    <!-- Klima -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Klima</p>
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Schlafen" content-class="space-y-1">
        <div class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(airConditioners?.schlafenOnline)" size="sm" />
          <span class="text-xs">{{ getStoreValBoolean(airConditioners?.schlafenOnline) ? "Online" : "Offline" }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(airConditioners?.schlafenPowerStatus)" size="sm" />
          <span class="text-xs">{{ getStoreValBoolean(airConditioners?.schlafenPowerStatus) ? "An" : "Aus" }}</span>
        </div>
      </DataCard>
      <DataCard title="Kinderzimmer" content-class="space-y-1">
        <div class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(airConditioners?.childOnline)" size="sm" />
          <span class="text-xs">{{ getStoreValBoolean(airConditioners?.childOnline) ? "Online" : "Offline" }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(airConditioners?.childPowerStatus)" size="sm" />
          <span class="text-xs">{{ getStoreValBoolean(airConditioners?.childPowerStatus) ? "An" : "Aus" }}</span>
        </div>
      </DataCard>
    </div>

    <!-- Rasenmäher -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Rasenmäher</p>
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Status" content-class="flex items-center gap-1.5">
        <StatusDot :active="getStoreValBoolean(landroid?.online)" />
        <span class="text-xs font-semibold truncate">{{ landroidStatusLabel }}</span>
      </DataCard>
      <DataCard title="Akku">
        <span class="text-sm font-semibold">{{ landroid?.battery?.val ?? 0 }}</span>
        <span class="text-xs text-muted-foreground ml-1">%</span>
      </DataCard>
    </div>

    <!-- Wärmepumpe & Pool -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Wärmepumpe</p>
    <div class="grid grid-cols-2 gap-2">
      <RouterLink :to="routes.heatPump.path">
        <DataCard title="Wärmepumpe" clickable content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(pool?.heaterState)" />
          <span class="text-xs font-semibold">{{ getStoreValBoolean(pool?.heaterState) ? "An" : "Aus" }}</span>
        </DataCard>
      </RouterLink>
      <RouterLink :to="routes.heatPump.path">
        <DataCard title="Poolpumpe" clickable content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(pool?.poolPumpSwitch)" />
          <span class="text-xs font-semibold">{{ getStoreValBoolean(pool?.poolPumpSwitch) ? "An" : "Aus" }}</span>
        </DataCard>
      </RouterLink>
    </div>
  </div>
</template>
