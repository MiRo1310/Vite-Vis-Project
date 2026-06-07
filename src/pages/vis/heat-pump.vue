<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Button } from "@/components/shared/button/button.variants";
import { adminConnection } from "@/lib/iobroker-service.js";
import Page from "@/components/shared/page/Page.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { heatPumpValues } from "@/pages/vis/heat-pump.ts";
import { useToast } from "@/components/ui/toast";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import LogTable from "@/components/shared/table/LogTable.vue";
import { toJSON } from "@michaelroling/ts-library";
import { computed } from "vue";
import { formatUptime } from "@/lib/system";

const { getParsedLogs, iobroker } = useIobrokerStore();
const { toast } = useToast();

function reset() {
  adminConnection?.setState("logparser.0.filters.Wärmepumpe.emptyJson", true, false);
}

async function toggleHeater() {
  checkAdminConnection();
  const id = iobroker.pool?.heaterState?.id;
  if (!id) {
    return;
  }
  await adminConnection?.setState(id, !getStoreValBoolean(iobroker.pool?.heaterState), false);
}

async function togglePump() {
  const id = iobroker.pool?.poolPumpSwitch?.id;
  if (!id) {
    return;
  }
  await adminConnection?.setState(id, !getStoreValBoolean(iobroker.pool?.poolPumpSwitch), false);
}

function checkAdminConnection() {
  if (!adminConnection) {
    toast({ title: "AdminConnection ist nicht vorhanden", variant: "destructive" });
    throw new Error("AdminConnection is nicht vorhanden");
  }
}

interface HeatingPumpScriptJson {
  carChargingRequest: boolean;
  surplus: number;
  heaterActive: boolean;
  surplusAboveThreshold: boolean;
  surplusBelowThreshold: boolean;
  delayOnRunning: boolean;
  delayOffRunning: boolean;
  delayOnRemainingSeconds: number;
  delayOffRemainingSeconds: number;
  cooldownRemainingSeconds: number;
  lastDeactivatedAt: string;
  nextActivationAllowedAt: string;
  scheduleEnabled: boolean;
  scheduleOnCron: string;
  scheduleOffCron: string;
  updatedAt: string;
}

const jsonData = computed(() => toJSON<HeatingPumpScriptJson>(iobroker.pool?.heaterScriptActivateJSON?.val ?? "").json);
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
    <!-- Buttons -->
    <div class="flex gap-2 mb-3">
      <Button size="sm" :class="pool?.heaterState?.val ? 'border-green-400!' : 'border-destructive!'" @click="toggleHeater">
        WP {{ pool?.heaterState?.val ? "aus" : "ein" }}
      </Button>
      <Button size="sm" :class="pool?.poolPumpSwitch?.val ? 'border-green-400!' : 'border-destructive!'" @click="togglePump">
        Pumpe {{ pool?.poolPumpSwitch?.val ? "aus" : "ein" }}
      </Button>
      <Button variant="outline" size="sm" class="ml-auto" @click="reset">Zurücksetzen</Button>
    </div>

    <Tabs default-value="daten">
      <TabsList class="mb-3">
        <TabsTrigger value="daten">Daten</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>

      <!-- TAB: Daten -->
      <TabsContent value="daten" class="space-y-3">

        <!-- Status + Temperaturen in einer Zeile -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <!-- Status -->
          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">WP Status</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 flex items-center gap-1.5">
              <span :class="['h-2 w-2 rounded-full shrink-0', statusDot(getStoreValBoolean(pool?.heaterState))]" />
              <span class="text-sm font-semibold">{{ getStoreValBoolean(pool?.heaterState) ? "An" : "Aus" }}</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Silent</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 flex items-center gap-1.5">
              <span :class="['h-2 w-2 rounded-full shrink-0', statusDot(getStoreValBoolean(pool?.silent))]" />
              <span class="text-sm font-semibold">{{ getStoreValBoolean(pool?.silent) ? "An" : "Aus" }}</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Modus</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <span class="text-sm font-semibold">{{ listing?.[2]?.value ?? "–" }}</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Bezug</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <span class="text-sm font-semibold">{{ getStoreValNumber(pool?.consumption).toFixed(0) }}</span>
              <span class="text-xs text-muted-foreground ml-1">W</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Eingang</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <span class="text-sm font-semibold text-blue-300">{{ getStoreValNumber(pool?.tempIn).toFixed(1) }}</span>
              <span class="text-xs text-muted-foreground ml-1">°C</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Ausgang</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(pool?.tempOut).toFixed(1) }}</span>
              <span class="text-xs text-muted-foreground ml-1">°C</span>
            </CardContent>
          </Card>

          <Card class="col-span-1">
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs text-muted-foreground">Soll</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <span class="text-sm font-semibold">{{ getStoreValNumber(pool?.tempSet).toFixed(1) }}</span>
              <span class="text-xs text-muted-foreground ml-1">°C</span>
            </CardContent>
          </Card>
        </div>

        <!-- Automatisierung: 2 Spalten -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

          <!-- Überschuss -->
          <Card>
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs font-medium text-muted-foreground">Überschuss</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 space-y-2">
              <div class="flex items-baseline gap-1">
                <span class="text-xl font-bold">{{ jsonData?.surplus ?? 0 }}</span>
                <span class="text-xs text-muted-foreground">W</span>
              </div>
              <Progress :model-value="Math.min(Math.max(jsonData?.surplus ?? 0, 0), 5000) / 50" class="h-1.5" />
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-0.5">
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonData?.surplusAboveThreshold ? 'bg-green-400' : 'bg-muted-foreground/30']" />
                  <span class="text-muted-foreground">Über Schwellwert</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonData?.surplusBelowThreshold ? 'bg-red-400' : 'bg-muted-foreground/30']" />
                  <span class="text-muted-foreground">Unter Schwellwert</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonData?.carChargingRequest ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                  <span class="text-muted-foreground">Auto lädt</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full shrink-0', jsonData?.heaterActive ? 'bg-green-400' : 'bg-muted-foreground/30']" />
                  <span class="text-muted-foreground">Heizung aktiv</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Verzögerungen -->
          <Card>
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs font-medium text-muted-foreground">Verzögerungen</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 space-y-1.5 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Einschalten</span>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full', jsonData?.delayOnRunning ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                  <span class="font-medium">{{ formatUptime(jsonData?.delayOnRemainingSeconds) }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Ausschalten</span>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full', jsonData?.delayOffRunning ? 'bg-yellow-400' : 'bg-muted-foreground/30']" />
                  <span class="font-medium">{{ formatUptime(jsonData?.delayOffRemainingSeconds) }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Cooldown</span>
                <span class="font-medium">{{ formatUptime(jsonData?.cooldownRemainingSeconds) }}</span>
              </div>
            </CardContent>
          </Card>

          <!-- Zeitplan -->
          <Card>
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs font-medium text-muted-foreground">Zeitplan</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 space-y-1.5 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Aktiviert</span>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-1.5 w-1.5 rounded-full', jsonData?.scheduleEnabled ? 'bg-green-400' : 'bg-muted-foreground/30']" />
                  <span class="font-medium">{{ jsonData?.scheduleEnabled ? "Ja" : "Nein" }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Einschalten</span>
                <span class="font-mono">{{ jsonData?.scheduleOnCron ?? "–" }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Ausschalten</span>
                <span class="font-mono">{{ jsonData?.scheduleOffCron ?? "–" }}</span>
              </div>
            </CardContent>
          </Card>

          <!-- Zeitstempel -->
          <Card>
            <CardHeader class="p-3 pb-1">
              <CardTitle class="text-xs font-medium text-muted-foreground">Zeitstempel</CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0 space-y-1.5 text-xs">
              <div class="flex justify-between items-center gap-2">
                <span class="text-muted-foreground shrink-0">Deaktiviert</span>
                <span class="font-medium">{{ formatDate(jsonData?.lastDeactivatedAt) }}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-muted-foreground shrink-0">Nächste Aktivierung</span>
                <span class="font-medium">{{ formatDate(jsonData?.nextActivationAllowedAt) }}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-muted-foreground shrink-0">Aktualisiert</span>
                <span class="font-medium">{{ formatDate(jsonData?.updatedAt) }}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- TAB: Logs -->
      <TabsContent value="logs" class="overflow-auto">
        <LogTable :logs="getParsedLogs.heatPump" />
      </TabsContent>
    </Tabs>
  </Page>
</template>