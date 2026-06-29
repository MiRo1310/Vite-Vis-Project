<script setup lang="ts">
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { DataCard } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { routes } from "@/router/routes.ts";
import { useRouter } from "vue-router";
import { formatUptime, miBToGiB } from "@/lib/system";
import MetricValue from "@/components/shared/display/MetricValue.vue";

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
          <MetricValue v-bind="pv.pvGross.valAndUnit" :decimal-places="0" />
        </DataCard>
        <DataCard title="Kleine PV">
          <MetricValue v-bind="pv.smallPv.valAndUnit" :decimal-places="0" />
        </DataCard>

        <DataCard :title="feedIn >= 0 ? 'Einspeisung' : 'Bezug'">
          <MetricValue :val="Math.abs(feedIn)" unit="W" :decimal-places="0" :value-class="feedIn >= 0 ? 'text-green-400' : 'text-destructive'" />
        </DataCard>

        <DataCard :title="charging > 0 ? 'Batterie laden' : 'Batterie entladen'">
          <MetricValue
            :val="Math.abs(charging)"
            unit="W"
            :decimal-places="0"
            :value-class="charging > 0 ? 'text-green-400' : charging < 0 ? 'text-orange-400' : ''"
          />
        </DataCard>

        <DataCard title="Ladezustand" content-class="flex items-center gap-1.5">
          <MetricValue v-bind="pv.batteryCharging.valAndUnit" :decimal-places="0" />
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
          <MetricValue v-bind="energy.energyReceived.valAndUnit" :decimal-places="2" />
        </DataCard>
        <DataCard title="Einspeisung heute">
          <MetricValue v-bind="energy.energyReturned.valAndUnit" :decimal-places="2" value-class="text-green-400" />
        </DataCard>
        <DataCard title="Verkauft">
          <MetricValue v-bind="pv.profit.valAndUnit" :decimal-places="2" value-class="text-green-400" />
        </DataCard>
        <DataCard title="Genutzt">
          <MetricValue :val="pv.savedMoney.value - pv.profit.value" unit="€" :decimal-places="2" />
        </DataCard>
        <DataCard title="Ersparnis">
          <MetricValue v-bind="pv.savedMoney.valAndUnit" :decimal-places="2" value-class="text-green-400" />
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
          <MetricValue v-bind="heating.heatingTemperature.valAndUnit" />
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
          <StatusDot :active="pool.poolPumpSwitch.value" />
          <span class="text-sm font-semibold">{{ pool.poolPumpSwitch.value ? "An" : "Aus" }}</span>
        </DataCard>
        <DataCard title="Pumpe Bezug">
          <MetricValue v-bind="pool.poolPumpPower.valAndUnit" :decimal-places="0" />
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
          <MetricValue v-bind="system.ramIobrokerLevel.valAndUnit" :decimal-places="0" />
          <p class="text-xs text-muted-foreground">{{ miBToGiB(system.ramIobrokerUsed.value) }} / {{ miBToGiB(system.ramIobrokerMax.value) }}</p>
          <Progress :model-value="system.ramIobrokerLevel.value" class="h-1.5" />
        </DataCard>

        <DataCard title="CPU" content-class="space-y-1">
          <MetricValue v-bind="system.cpuIobroker.valAndUnit" :decimal-places="0" />
          <Progress :model-value="system.cpuIobroker.value" class="h-1.5" />
        </DataCard>

        <DataCard title="Disk" content-class="space-y-1">
          <MetricValue v-bind="system.diskIobrokerUsage.valAndUnit" :decimal-places="0" />
          <Progress :model-value="system.diskIobrokerUsage.value" class="h-1.5" />
        </DataCard>
      </div>
    </TabsContent>
  </Tabs>
</template>
