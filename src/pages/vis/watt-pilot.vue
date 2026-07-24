<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { Card, CardContent, DataCard, ToggleCard } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import Date from "@/components/shared/date-time/Date.vue";
import { priceKW, wpElectricityGridPrice, wpElectricityPrices } from "@/composables/wpElectricityPrices.ts";
import { type WattPilotJson } from "@/types/types.ts";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { chargingTime } from "@/composables/battery.ts";
import { getMostExpensiveFuelPrice } from "@/composables/fuel.ts";
import Surplus from "@/components/section/pv/Surplus.vue";

const { iobroker } = useIobrokerStore();

const lPer100Km = 8;

const data = computed(() => iobroker.wattPilot.jsonScriptChargeLevel.parsed({} as WattPilotJson));

const modeLabel: Record<number, string> = {
  0: "Aus",
  1: "Eco",
  2: "Min+Eco",
  3: "Max",
};
</script>

<template>
  <Page title="Wallbox">
    <Tabs default-value="daten" class="mr-2">
      <div class="sticky top-0 z-10 bg-background flex justify-between items-center">
        <TabsList class="mb-3">
          <TabsTrigger value="daten">Daten</TabsTrigger>
          <TabsTrigger value="einstellungen">Einstellungen</TabsTrigger>
        </TabsList>
        <p v-if="data?.updatedAt" class="text-xs text-muted-foreground">Aktualisiert: <Date :date="data.updatedAt" /></p>
      </div>
      <TabsContent value="daten" class="space-y-3">
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Laden" content-class="flex items-center gap-1.5">
            <StatusDot :active="data?.charging ?? false" />
            <span class="text-sm font-semibold">{{ data?.charging ? "Aktiv" : "Inaktiv" }}</span>
          </DataCard>
          <DataCard title="Überschussladen" content-class="flex items-center gap-1.5">
            <StatusDot :active="iobroker.wattPilot.autoCharging.value" />
            <span class="text-sm font-semibold">{{ iobroker.wattPilot.autoCharging.value ? "Aktiv" : "Inaktiv" }}</span>
          </DataCard>
          <DataCard title="Auto verbunden" content-class="flex items-center gap-1.5">
            <StatusDot :active="data?.carConnected ?? false" />
            <span class="text-sm font-semibold">{{ data?.carConnected ? "Verbunden" : "Nicht verbunden" }}</span>
          </DataCard>
          <DataCard title="Laden freigegeben" content-class="flex items-center gap-1.5">
            <StatusDot :active="data?.allowCharging ?? false" />
            <span class="text-sm font-semibold">{{ data?.allowCharging ? "Freigegeben" : "Nicht freigegeben" }}</span>
          </DataCard>
          <DataCard title="Modus">
            <span class="text-sm font-semibold">{{ data != null ? (modeLabel[data.currentIndex] ?? `Index ${data.currentIndex}`) : "–" }}</span>
          </DataCard>
          <DataCard title="Phasen">
            <span class="text-sm font-semibold">{{ data?.phases ?? "–" }}</span>
          </DataCard>
          <DataCard title="Stop-Gründe">
            <span class="text-sm font-semibold">{{ data?.stopReasons?.length ? data.stopReasons.join(", ") : "–" }}</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Leistung</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Ladeleistung">
            <span class="text-sm font-semibold text-green-400">{{ data?.chargingPowerW ?? 0 }}</span>
            <span class="text-xs text-muted-foreground ml-1">W</span>
          </DataCard>
          <DataCard title="Strom">
            <span class="text-sm font-semibold">{{ data?.ampere ?? "–" }}</span>
            <span class="text-xs text-muted-foreground ml-1">A</span>
          </DataCard>
          <DataCard title="Netzbezug">
            <span class="text-sm font-semibold" :class="(data?.gridPower ?? 0) > 0 ? '' : 'text-orange-300'">
              {{ (data?.gridPower ?? 0) > 0 ? 0 : -(data?.gridPower ?? 0) }}
            </span>
            <span class="text-xs text-muted-foreground ml-1">W</span>
          </DataCard>
          <Surplus />
        </div>
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Auto</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Batterie Ladestatus">
            <MetricValue :number-value="iobroker.car.battery" />
          </DataCard>
          <DataCard title="Geschätzte Restladedauer">
            <MetricValue
              :val="
                chargingTime({
                  chargingLimit: 80,
                  batteryCapacity: 81,
                  currentBatteryPercent: iobroker.car.battery.value,
                  currentPowerW: data?.chargingPowerW ?? 0,
                })
              "
              unit="Std"
            />
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Werte</p>
        <Card class="py-0 gap-0 rounded-md">
          <CardContent class="px-3 py-1 divide-y divide-border">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2">
              <div>
                <p class="text-sm font-medium">Ladeleistung gesamt</p>
                <p class="text-xs text-muted-foreground">Insgesamt über die Wallbox geladene Energie.</p>
              </div>
              <MetricValue :number-value="iobroker.wattPilot.totalCharging" :math="(val) => val / 1000" />
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2">
              <div>
                <p class="text-sm font-medium">Ladeleistung aus Netz</p>
                <p class="text-xs text-muted-foreground">Insgesamt über die Wallbox geladene Energie aus dem Netz.</p>
              </div>
              <MetricValue :number-value="iobroker.wattPilot.totalChargingFromGrid" :decimal-places="3" value-class="text-orange-300" />
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2">
              <div>
                <p class="text-sm font-medium">Netzbezug Kosten</p>
                <p class="text-xs text-muted-foreground">Kosten für den Bezug von Netzstrom, berechnet mit {{ priceKW }}€/KW.</p>
              </div>
              <MetricValue :val="wpElectricityGridPrice" unit="€" value-class="text-orange-300" />
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2">
              <div>
                <p class="text-sm font-medium">Überschussladen Einsparung</p>
                <p class="text-xs text-muted-foreground">
                  Ersparnis durch das Laden mit PV-Überschuss statt Netzstrom, berechnet mit {{ priceKW }}€/KW.
                </p>
              </div>
              <MetricValue :val="wpElectricityPrices" unit="€" value-class="text-green-400" />
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2">
              <div>
                <p class="text-sm font-medium">Vergleich Benzinpreis</p>
                <p class="text-xs text-muted-foreground">
                  {{
                    `Was die geladene Energiemenge mit einem Benziner (${lPer100Km}l/100km) gekostet hätte. Als Preis wird der aktuell günstigste und teuerste Preis genommen`
                  }}
                </p>
              </div>
              <div class="space-x-2">
                <span class="text-xs text-muted-foreground">( {{ iobroker.tankerKoenig.cheapestPrice.value }} €/l )</span>
                <MetricValue
                  :val="((iobroker.wattPilot.totalCharging.value / 1000 / 16) * iobroker.tankerKoenig.cheapestPrice.value * lPer100Km).toFixed(2)"
                  unit="€"
                />
                <span>-</span>
                <span class="text-xs text-muted-foreground">( {{ getMostExpensiveFuelPrice }} €/l )</span>
                <MetricValue
                  :val="((iobroker.wattPilot.totalCharging.value / 1000 / 16) * getMostExpensiveFuelPrice * lPer100Km).toFixed(2)"
                  unit="€"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="einstellungen" class="space-y-3">
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Einstellungen</p>
        <div class="flex items-center flex-wrap gap-2">
          <ToggleCard title="Wallbox Überschussladen" class="flex-1" :boolean-value="iobroker.wattPilot.autoCharging" :ack="true" />
        </div>
      </TabsContent>
    </Tabs>
  </Page>
</template>
