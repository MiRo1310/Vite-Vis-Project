<script setup lang="ts">
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
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

const feedIn = computed(() => pv.value.feedIn.value);
const charging = computed(() => pv.value.activeCharging.value);

const wpModus = computed(() => {
  switch (pool.value.mode.value) {
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
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push(routes.pv.path)">→ PV Seite</button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Grosse PV">
          <span class="text-sm font-semibold">{{ pv.pvGross.value.toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Kleine PV">
          <span class="text-sm font-semibold">{{ pv.smallPv.value.toFixed(0) }}</span>
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
          <span class="text-sm font-semibold">{{ pv.batteryCharging.value }}</span>
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
          <span class="text-sm font-semibold text-destructive">{{ energy.energyReceived.value.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">kWh</span>
        </DataCard>
        <DataCard title="Einspeisung heute">
          <span class="text-sm font-semibold text-green-400">{{ energy.energyReturned.value.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">kWh</span>
        </DataCard>
        <DataCard title="Verkauft">
          <span class="text-sm font-semibold text-green-400">{{ pv.profit.value.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
        <DataCard title="Genutzt">
          <span class="text-sm font-semibold">
            {{ (pv.savedMoney.value - pv.profit.value).toFixed(2) }}
          </span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
        <DataCard title="Ersparnis">
          <span class="text-sm font-semibold text-green-400">{{ pv.savedMoney.value.toFixed(2) }}</span>
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
          <StatusDot :active="heating.active.value" />
          <span class="text-sm font-semibold">{{ heating.active.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Auto" content-class="flex items-center gap-1.5">
          <StatusDot :active="heating.automatic.value" />
          <span class="text-sm font-semibold">{{ heating.automatic.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Temperatur">
          <span class="text-sm font-semibold">{{ heating.heatingTemperature.value }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Solar Auto" content-class="flex items-center gap-1.5">
          <StatusDot :active="heating.autoSolar.value" />
          <span class="text-sm font-semibold">{{ heating.autoSolar.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Solar Pumpe" content-class="flex items-center gap-1.5">
          <StatusDot :active="heating.solarPump.value" />
          <span class="text-sm font-semibold">{{ heating.solarPump.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Solar">
          <span class="text-sm font-semibold">{{ heating.heatingSolar.value }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Oben">
          <span class="text-sm font-semibold text-orange-300">{{ heating.heatingBufferTop.value }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Mitte">
          <span class="text-sm font-semibold text-orange-300">{{ heating.heatingBufferMiddle.value }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Puffer Unten">
          <span class="text-sm font-semibold text-blue-300">{{ heating.heatingBuffer.value }}</span>
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
          <StatusDot :active="pool.heaterState.value" />
          <span class="text-sm font-semibold">{{ pool.heaterState.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Silent" content-class="flex items-center gap-1.5">
          <StatusDot :active="pool.silent.value" />
          <span class="text-sm font-semibold">{{ pool.silent.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Modus">
          <span class="text-sm font-semibold">{{ wpModus }}</span>
        </DataCard>
        <DataCard title="WP Bezug">
          <span class="text-sm font-semibold">{{ pool.consumption.value.toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Eingang">
          <span class="text-sm font-semibold text-blue-300">{{ pool.tempIn.value.toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Ausgang">
          <span class="text-sm font-semibold text-orange-300">{{ pool.tempOut.value.toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Soll">
          <span class="text-sm font-semibold">{{ pool.tempSet.value.toFixed(1) }}</span>
          <span class="text-xs text-muted-foreground ml-1">°C</span>
        </DataCard>
        <DataCard title="Poolpumpe" content-class="flex items-center gap-1.5">
          <StatusDot :active="pool.poolPumpSwitch.value" />
          <span class="text-sm font-semibold">{{ pool.poolPumpSwitch.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Pumpe Bezug">
          <span class="text-sm font-semibold">{{ pool.poolPumpPower.value.toFixed(0) }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
      </div>
    </TabsContent>

    <!-- System -->
    <TabsContent value="system" class="flex-1 min-h-0 overflow-auto space-y-3">
      <div class="flex justify-end">
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="router.push('/system')">→ System Seite</button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <DataCard title="Version">
          <span class="text-sm font-semibold">{{ version ?? "-" }}</span>
        </DataCard>

        <DataCard title="Uptime">
          <span class="text-sm font-semibold">{{ formatUptime(system.iobrokerUptime.value) }}</span>
        </DataCard>

        <DataCard title="RAM" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ system.ramIobrokerLevel.value.toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <p class="text-xs text-muted-foreground">{{ miBToGiB(system.ramIobrokerUsed.value) }} / {{ miBToGiB(system.ramIobrokerMax.value) }}</p>
          <Progress :model-value="system.ramIobrokerLevel.value" class="h-1.5" />
        </DataCard>

        <DataCard title="CPU" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ system.cpuIobroker.value.toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <Progress :model-value="system.cpuIobroker.value" class="h-1.5" />
        </DataCard>

        <DataCard title="Disk" content-class="space-y-1">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-semibold">{{ system.diskIobrokerUsage.value.toFixed(0) }}</span>
            <span class="text-xs text-muted-foreground">%</span>
          </div>
          <Progress :model-value="system.diskIobrokerUsage.value" class="h-1.5" />
        </DataCard>
      </div>
    </TabsContent>
  </Tabs>
</template>
