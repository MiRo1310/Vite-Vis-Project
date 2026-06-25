<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Button } from "@/components/shared/button/button.variants";
import Page from "@/components/shared/page/Page.vue";
import { DataCard, ToggleCard } from "@/components/shared/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { heatPumpValues } from "@/pages/vis/heat-pump.ts";
import LogTable from "@/components/shared/table/LogTable.vue";
import { computed } from "vue";
import { formatUptime } from "@/lib/system";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { HeatingPumpScriptJson, HeatingPumpSilentJSON } from "@/types/types.ts";

const { getParsedLogs, iobroker } = useIobrokerStore();

function reset() {
  ioBrokerService.connection?.setState("logparser.0.filters.Wärmepumpe.emptyJson", true, false);
}

async function toggleHeater() {
  iobroker.pool.heaterState.toggle();
}

async function togglePump() {
  iobroker.pool.poolPumpSwitch.toggle();
}

const jsonDataActivate = computed(() => iobroker.pool.heaterScriptActivateJSON.parsed({} as HeatingPumpScriptJson));
const jsonDataSilent = computed(() => iobroker.pool.heaterSilentScriptJSON.parsed({} as HeatingPumpSilentJSON));
const pool = computed(() => iobroker.pool);
const listing = computed(() => heatPumpValues.value.listing);

function statusDot(active?: boolean): string {
  return active ? "bg-green-400" : "bg-red-400";
}

function formatDate(iso?: string): string {
  if (!iso) {
    return "–";
  }
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" });
}
</script>

<template>
  <Page title="Wärmepumpe">
    <Tabs default-value="daten">
      <TabsList class="mb-3">
        <TabsTrigger value="daten">Daten</TabsTrigger>
        <TabsTrigger value="aktionen">Aktionen</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>

      <!-- TAB: Daten -->
      <TabsContent value="daten" class="space-y-3">
        <!-- Status -->
        <div>
          <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
          <div class="grid grid-cols-4 gap-2">
            <DataCard title="WP Status" content-class="flex items-center gap-1.5">
              <span :class="['h-2 w-2 rounded-full shrink-0', statusDot(pool.heaterState.value)]" />
              <span class="text-sm font-semibold">{{ pool.heaterState.value ? "An" : "Aus" }}</span>
            </DataCard>

            <DataCard title="Silent" content-class="flex items-center gap-1.5">
              <span :class="['h-2 w-2 rounded-full shrink-0', statusDot(pool.silent.value)]" />
              <span class="text-sm font-semibold">{{ pool.silent.value ? "An" : "Aus" }}</span>
            </DataCard>

            <DataCard title="Modus">
              <span class="text-sm font-semibold">{{ listing?.[2]?.value ?? "–" }}</span>
            </DataCard>

            <DataCard title="Bezug">
              <span class="text-sm font-semibold">{{ pool.consumption.value.toFixed(0) }}</span>
              <span class="text-xs text-muted-foreground ml-1">W</span>
            </DataCard>
          </div>
        </div>

        <!-- Temperaturen -->
        <div>
          <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Temperaturen</p>
          <div class="grid grid-cols-3 gap-2">
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
          </div>
        </div>

        <!-- Automatisierung -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DataCard title="Überschuss" content-class="space-y-2">
            <div class="flex items-baseline gap-1">
              <span class="text-xl font-bold">{{ jsonDataActivate?.surplus ?? 0 }}</span>
              <span class="text-xs text-muted-foreground">W</span>
            </div>
            <Progress :model-value="Math.min(Math.max(jsonDataActivate?.surplus ?? 0, 0), 5000) / 50" class="h-1.5" />
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div class="flex items-center gap-1.5">
                <span
                  :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonDataActivate?.surplusAboveThreshold ? 'bg-green-400' : 'bg-muted-foreground/30']"
                />
                <span class="text-muted-foreground">Über Schwellwert</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span
                  :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonDataActivate?.surplusBelowThreshold ? 'bg-red-400' : 'bg-muted-foreground/30']"
                />
                <span class="text-muted-foreground">Unter Schwellwert</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span
                  :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonDataActivate?.carChargingRequest ? 'bg-yellow-400' : 'bg-muted-foreground/30']"
                />
                <span class="text-muted-foreground">Auto lädt</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonDataActivate?.heaterActive ? 'bg-green-400' : 'bg-muted-foreground/30']" />
                <span class="text-muted-foreground">Heizung aktiv</span>
              </div>
            </div>
          </DataCard>

          <DataCard title="Verzögerungen Ein / Ausschalten" content-class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Einschalten</span>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', jsonDataActivate?.delayOnRunning ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                <span class="font-medium">{{ formatUptime(jsonDataActivate?.delayOnRemainingSeconds) }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Ausschalten</span>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', jsonDataActivate?.delayOffRunning ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                <span class="font-medium">{{ formatUptime(jsonDataActivate?.delayOffRemainingSeconds) }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Cooldown</span>
              <span class="font-medium">{{ formatUptime(jsonDataActivate?.cooldownRemainingSeconds) }}</span>
            </div>
          </DataCard>

          <DataCard title="Silent Mode" content-class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Batterie entladen</span>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', jsonDataSilent?.dischargeBattery ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                <span class="font-medium">{{ jsonDataSilent?.dischargeBattery ? "Ja" : "Nein" }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Timeout aktiv</span>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', jsonDataSilent?.timeoutRunning ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                <span class="font-medium">{{ formatUptime(jsonDataSilent?.timeoutRemainingSeconds) }}</span>
              </div>
            </div>
          </DataCard>

          <DataCard title="Zeitplan" content-class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Aktiviert</span>
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', jsonDataActivate?.scheduleEnabled ? 'bg-green-400' : 'bg-muted-foreground/30']" />
                <span class="font-medium">{{ jsonDataActivate?.scheduleEnabled ? "Ja" : "Nein" }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Einschalten</span>
              <span class="font-mono">{{ jsonDataActivate?.scheduleOnCron ?? "–" }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Ausschalten</span>
              <span class="font-mono">{{ jsonDataActivate?.scheduleOffCron ?? "–" }}</span>
            </div>
          </DataCard>

          <DataCard title="Zeitstempel" content-class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center gap-2">
              <span class="text-muted-foreground shrink-0">Deaktiviert</span>
              <span class="font-medium">{{ formatDate(jsonDataActivate?.lastDeactivatedAt) }}</span>
            </div>
            <div class="flex justify-between items-center gap-2">
              <span class="text-muted-foreground shrink-0">Nächste Aktivierung</span>
              <span class="font-medium">{{ formatDate(jsonDataActivate?.nextActivationAllowedAt) }}</span>
            </div>
            <div class="flex justify-between items-center gap-2">
              <span class="text-muted-foreground shrink-0">Aktualisiert</span>
              <span class="font-medium">{{ formatDate(jsonDataActivate?.updatedAt) }}</span>
            </div>
          </DataCard>
        </div>
      </TabsContent>

      <!-- TAB: Aktionen -->
      <TabsContent value="aktionen" class="space-y-3">
        <div>
          <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Schalten</p>
          <div class="grid grid-cols-2 gap-2">
            <ToggleCard title="Wärmepumpe" :active="pool.heaterState.value" @click="toggleHeater" />
            <ToggleCard title="Poolpumpe" :active="pool.poolPumpSwitch.value" @click="togglePump" />
          </div>
        </div>
        <div>
          <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Temperaturen</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <DataCard title="Solltemperatur" content-class="pt-0.5">
              <InputIobroker :state="pool?.tempSet" unit="°C" />
            </DataCard>
          </div>
        </div>
      </TabsContent>

      <!-- TAB: Logs -->
      <TabsContent value="logs">
        <div class="flex justify-end mb-2">
          <Button variant="destructive" size="sm" @click="reset">Zurücksetzen</Button>
        </div>
        <LogTable :logs="getParsedLogs.heatPump" wrapper-class="max-h-[calc(100vh-220px)]" />
      </TabsContent>
    </Tabs>
  </Page>
</template>
