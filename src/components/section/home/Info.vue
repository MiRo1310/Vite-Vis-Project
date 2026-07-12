<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { DataCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { routes } from "@/router/routes.ts";
import OnlineActiveRows from "@/components/shared/display/OnlineActiveRows.vue";
import { type WattPilotJson } from "@/types/types.ts";
import { chargingTime } from "@/composables/battery.ts";
import MetricValue from "@/components/shared/display/MetricValue.vue";

const ioBrokerStore = useIobrokerStore();
const { iobroker } = ioBrokerStore;
const { infos: infoStore } = ioBrokerStore.iobroker;

const wallbox = computed(() => iobroker.wattPilot.jsonScriptChargeLevel.parsed({} as WattPilotJson));

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
  const code = landroid.value.status.value;
  return landroidStatusMap[code] ?? `Status ${code}`;
});
</script>

<template>
  <div class="flex flex-col gap-2 text-xs">
    <div class="grid grid-cols-2 gap-2">
      <RouterLink :to="routes.iobrokerInfo.path">
        <DataCard title="Updates" clickable content-class="flex items-center gap-1.5">
          <span class="text-sm font-semibold">{{ infoStore.updatesNumber.value }}</span>
          <span class="text-xs text-muted-foreground">verfügbar</span>
        </DataCard>
      </RouterLink>
      <RouterLink :to="routes.logs.path">
        <DataCard title="Logs" clickable content-class="flex flex-wrap gap-1 cursor-pointer">
          <Badge v-if="iobroker.logs.error.parsed([]).length" :value="iobroker.logs.error.parsed([]).length" color="red" />
          <Badge v-if="iobroker.logs.warning.parsed([]).length" :value="iobroker.logs.warning.parsed([]).length" color="orange" />
          <Badge v-if="iobroker.logs.info.parsed([]).length" :value="iobroker.logs.info.parsed([]).length" color="blue" />
          <span
            v-if="!iobroker.logs.error.parsed([]).length && !iobroker.logs.warning.parsed([]).length && !iobroker.logs.info.parsed([]).length"
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
        <OnlineActiveRows :online="airConditioners.schlafenOnline.value" :active="airConditioners.schlafenOnline.value" />
      </DataCard>
      <DataCard title="Kinderzimmer" content-class="space-y-1">
        <OnlineActiveRows :online="airConditioners.childOnline.value" :active="airConditioners.childPowerStatus.value" />
      </DataCard>
    </div>

    <!-- Rasenmäher -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Rasenmäher</p>
    <div class="grid grid-cols-2 gap-2">
      <DataCard title="Status" content-class="flex items-center gap-1.5">
        <StatusDot :active="landroid.online.value" />
        <span class="text-xs font-semibold truncate">{{ landroidStatusLabel }}</span>
      </DataCard>
      <DataCard title="Akku">
        <span class="text-sm font-semibold">{{ landroid.battery.value ?? 0 }}</span>
        <span class="text-xs text-muted-foreground ml-1">%</span>
      </DataCard>
    </div>

    <!-- Wärmepumpe & Pool -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Pool</p>
    <div class="grid grid-cols-2 gap-2">
      <RouterLink :to="routes.heatPump.path">
        <DataCard title="Wärmepumpe" clickable content-class="flex flex-col gap-1.5">
          <OnlineActiveRows :online="pool.heaterOnline.value" :active="pool.heaterState.value" />
        </DataCard>
      </RouterLink>
      <RouterLink :to="routes.heatPump.path">
        <DataCard title="Poolpumpe" clickable content-class="flex flex-col gap-1.5">
          <OnlineActiveRows :online="pool.poolPumpSwitch.value" :active="pool.poolPumpPower.value > 40" />
        </DataCard>
      </RouterLink>
    </div>

    <!-- Wallbox -->
    <p class="text-xs text-muted-foreground uppercase tracking-wide">Wallbox</p>
    <div class="grid grid-cols-2 gap-2">
      <RouterLink :to="routes.wattPilot.path">
        <DataCard title="Laden" class="h-full" clickable>
          <div class="flex items-center gap-1.5">
            <StatusDot :active="wallbox?.charging ?? false" />
            <span class="text-xs font-semibold">{{ wallbox?.charging ? "Aktiv" : "Inaktiv" }}</span>
          </div>
          <span v-if="wallbox?.chargingPowerW" class="text-xs font-semibold"> {{ wallbox.chargingPowerW }} W</span>
        </DataCard>
      </RouterLink>
      <RouterLink :to="routes.wattPilot.path">
        <DataCard title="Ladeleistung" clickable content-class="flex flex-col gap-1.5">
          <MetricValue :number-value="iobroker.car.battery" />

          <MetricValue
            :val="
              chargingTime({
                chargingLimit: 80,
                batteryCapacity: 81,
                currentBatteryPercent: iobroker.car.battery.value,
                currentPowerW: wallbox?.chargingPowerW ?? 0,
              })
            "
            unit="Std"
          />
        </DataCard>
      </RouterLink>
    </div>
  </div>
</template>
