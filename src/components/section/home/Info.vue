<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import InfoUpdatesLogs from "@/components/section/home/InfoUpdatesLogs.vue";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { DataCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";

const ioBrokerStore = useIobrokerStore();
const { getParsedLogs, iobroker } = ioBrokerStore;
const { infos: infoStore } = ioBrokerStore.iobroker;

const airConditioners = computed(() => iobroker.airConditioners);
const landroid = computed(() => iobroker.landroid);

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
    <InfoUpdatesLogs :info="infoStore" :get-parsed-logs="getParsedLogs" />

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
  </div>
</template>
