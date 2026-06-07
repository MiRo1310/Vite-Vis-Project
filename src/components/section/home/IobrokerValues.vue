<script setup lang="ts">
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { DataCard } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { routes } from "@/router/routes.ts";
import { useRouter } from "vue-router";
import { miBToGiB, formatUptime } from "@/lib/system";

const { iobroker } = useIobrokerStore();
const router = useRouter();

const pv = computed(() => iobroker.pv);
const energy = computed(() => iobroker.energy);
const heating = computed(() => iobroker.heating);
const pool = computed(() => iobroker.pool);
const system = computed(() => iobroker.system);

const feedIn = computed(() => getStoreValNumber(pv.value?.feedIn));
const charging = computed(() => getStoreValNumber(pv.value?.activeCharging));

const wpModus = computed(() => {
  switch (getStoreValNumber(pool.value?.mode)) {
    case 0:
      return "Kühlen";
    case 1:
      return "Heizen";
    case 2:
      return "Auto";
    default:
      return "Inaktiv";
  }
});

const version = import.meta.env.VITE_APP_VERSION;
</script>

<template>
  <Tabs default-value="pv" class="h-full flex flex-col">
    <TabsList class="shrink-0 w-full">
      <TabsTrigger value="pv" class="flex-1 text-[11px] px-1">PV</TabsTrigger>
      <TabsTrigger value="energie" class="flex-1 text-[11px] px-1">Energie</TabsTrigger>
      <TabsTrigger value="heizung" class="flex-1 text-[11px] px-1">Heizung</TabsTrigger>
      <TabsTrigger value="pool" class="flex-1 text-[11px] px-1">Pool</TabsTrigger>
      <TabsTrigger value="system" class="flex-1 text-[11px] px-1">System</TabsTrigger>
    </TabsList>

    <!-- PV -->
    <TabsContent value="pv" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push(routes.pv.path)">
          → PV Seite
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Grosse PV">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pv?.pvGross).toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Kleine PV">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pv?.smallPv).toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>

        <DataCard :title="feedIn >= 0 ? 'Einspeisung' : 'Bezug'" content-class="flex items-center gap-1.5">
          <span :class="['text-sm font-semibold', feedIn >= 0 ? 'text-green-400' : 'text-destructive']">
            {{ Math.abs(feedIn).toFixed(0) }}
          </span>
          <span class="text-xs text-muted-foreground">W</span>
        </DataCard>

        <DataCard :title="charging > 0 ? 'Batterie laden' : 'Batterie entladen'" content-class="flex items-center gap-1.5">
          <span :class="['text-sm font-semibold', charging > 0 ? 'text-green-400' : charging < 0 ? 'text-orange-400' : '']">
            {{ Math.abs(charging).toFixed(0) }}
          </span>
          <span class="text-xs text-muted-foreground">W</span>
        </DataCard>

        <DataCard title="Ladezustand" content-class="flex items-center gap-1.5">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pv?.batteryCharging) }}</span>
          <span class="text-xs text-muted-foreground">%</span>
        </DataCard>
      </div>
    </TabsContent>

    <!-- Energie -->
    <TabsContent value="energie" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push(routes.energy.path)">
          → Energie Seite
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Bezug heute">
          <span class="text-sm font-semibold text-destructive">{{ getStoreValNumber(energy?.energyReceived).toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">kWh</span>
        </DataCard>
        <DataCard title="Einspeisung heute">
          <span class="text-sm font-semibold text-green-400">{{ getStoreValNumber(energy?.energyReturned).toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">kWh</span>
        </DataCard>
        <DataCard title="Verkauft">
          <span class="text-sm font-semibold text-green-400">{{ getStoreValNumber(pv?.profit).toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
        <DataCard title="Genutzt">
          <span class="text-sm font-semibold">
            {{ (getStoreValNumber(pv?.savedMoney) - getStoreValNumber(pv?.profit)).toFixed(2) }}
          </span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
        <DataCard title="Ersparnis">
          <span class="text-sm font-semibold text-green-400">{{ getStoreValNumber(pv?.savedMoney).toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
      </div>
    </TabsContent>

    <!-- Heizung -->
    <TabsContent value="heizung" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push(routes.heating.path)">
          → Heizung Seite
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Heizung" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(heating?.active)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.active) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Auto" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(heating?.automatic)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.automatic) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Temperatur">
          <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.heatingTemperature) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Solar Auto" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(heating?.autoSolar)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.autoSolar) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Solar Pumpe" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(heating?.solarPump)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.solarPump) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Solar">
          <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.heatingSolar) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Oben">
          <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(heating?.heatingBufferTop) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Mitte">
          <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(heating?.heatingBufferMiddle) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Unten">
          <span class="text-sm font-semibold text-blue-300">{{ getStoreValNumber(heating?.heatingBuffer) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
      </div>
    </TabsContent>

    <!-- Pool / WP -->
    <TabsContent value="pool" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push(routes.heatPump.path)">
          → WP Seite
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Wärmepumpe" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(pool?.heaterState)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(pool?.heaterState) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Silent" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(pool?.silent)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(pool?.silent) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Modus">
          <span class="text-sm font-semibold">{{ wpModus }}</span>
        </DataCard>
        <DataCard title="WP Bezug">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pool?.consumption).toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Eingang">
          <span class="text-sm font-semibold text-blue-300">{{ getStoreValNumber(pool?.tempIn).toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Ausgang">
          <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(pool?.tempOut).toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Soll">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pool?.tempSet).toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Poolpumpe" content-class="flex items-center gap-1.5">
          <StatusDot :active="getStoreValBoolean(pool?.poolPumpSwitch)" />
          <span class="text-sm font-semibold">{{ getStoreValBoolean(pool?.poolPumpSwitch) ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Pumpe Bezug">
          <span class="text-sm font-semibold">{{ getStoreValNumber(pool?.poolPumpPower).toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
      </div>
    </TabsContent>

    <!-- System -->
    <TabsContent value="system" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push('/system')">
          → System Seite
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Version">
          <span class="text-sm font-semibold">{{ version }}</span>
        </DataCard>

        <DataCard title="Uptime">
          <span class="text-sm font-semibold">{{ formatUptime(getStoreValNumber(system?.iobrokerUptime)) }}</span>
        </DataCard>

        <DataCard title="RAM" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ getStoreValNumber(system?.ramIobrokerLevel).toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <p class="text-xs text-muted-foreground">
            {{ miBToGiB(getStoreValNumber(system?.ramIobrokerUsed)) }} / {{ miBToGiB(getStoreValNumber(system?.ramIobrokerMax)) }}
          </p>
          <Progress :model-value="getStoreValNumber(system?.ramIobrokerLevel)" class="h-1.5" />
        </DataCard>

        <DataCard title="CPU" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ getStoreValNumber(system?.cpuIobroker).toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <Progress :model-value="getStoreValNumber(system?.cpuIobroker)" class="h-1.5" />
        </DataCard>

        <DataCard title="Disk" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ getStoreValNumber(system?.diskIobrokerUsage).toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <Progress :model-value="getStoreValNumber(system?.diskIobrokerUsage)" class="h-1.5" />
        </DataCard>
      </div>
    </TabsContent>
  </Tabs>
</template>
