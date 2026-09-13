<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { Card, CardContent, DataCard } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
import { ChargingStatusEnum } from "@/enum/enum.ts";
import ButtonStringIobroker from "@/components/shared/button/ButtonStringIobroker.vue";
import { tabToLocalStorage } from "@/composables/tabToLocalStorage.ts";
import { filterEnum } from "@/lib/enum.ts";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";

const { iobroker } = useIobrokerStore();

const lPer100Km = 8;

const data = computed(() => iobroker.wattPilot.jsonScriptChargeLevel.parsed({} as WattPilotJson));

const modeLabel: Record<number, string> = {
  0: "Aus",
  1: "Eco",
  2: "Min+Eco",
  3: "Max",
};

const isAutoCharging = computed(() => iobroker.wattPilot.chargingMode.value === ChargingStatusEnum.AUTO);

const { clickTab, activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "wattpilot" });

const statusCards = computed((): Array<{ title: string; active?: boolean; text: string }> => {
  return [
    { title: "Laden", active: data.value.charging, text: data.value.charging ? "Aktiv" : "Inaktiv" },
    { title: "Überschussladen", active: isAutoCharging.value, text: isAutoCharging.value ? "Aktiv" : "Inaktiv" },
    { title: "Auto verbunden", active: data.value.carConnected, text: data.value.carConnected ? "Verbunden" : "Nicht verbunden" },
    { title: "Laden freigegeben", active: data.value.allowCharging, text: data.value.allowCharging ? "Freigegeben" : "Nicht freigegeben" },
    { title: "Modus", text: modeLabel[data.value.currentIndex] ?? `Index ${data.value.currentIndex}` },
    { title: "Phasen", text: `${data.value.phases ?? "–"}` },
    { title: "Stop-Gründe", text: data.value.stopReasons.length ? data.value.stopReasons.join(", ") : "–" },
  ];
});

const powerCards = computed((): Array<{ title: string; value: number | string; unit: string; valueClass?: string }> => {
  return [
    { title: "Ladeleistung", value: data.value.chargingPowerW ?? 0, unit: "W", valueClass: "text-green-400" },
    { title: "Strom", value: data.value.ampere ?? "–", unit: "A" },
    {
      title: "Netzbezug",
      value: data.value.gridPower > 0 ? 0 : -data.value.gridPower,
      unit: "W",
      valueClass: data.value.gridPower > 0 ? "" : "text-orange-300",
    },
  ];
});

const valueRows = computed((): Array<{ title: string; description: string; metricProps: InstanceType<typeof MetricValue>["$props"] }> => {
  return [
    {
      title: "Ladeleistung gesamt",
      description: "Insgesamt über die Wallbox geladene Energie.",
      metricProps: { numberValue: iobroker.wattPilot.totalCharging, math: (val: number) => val / 1000 },
    },
    {
      title: "Ladeleistung aus Netz",
      description: "Insgesamt über die Wallbox geladene Energie aus dem Netz.",
      metricProps: { numberValue: iobroker.wattPilot.totalChargingFromGrid, decimalPlaces: 3, valueClass: "text-orange-300" },
    },
    {
      title: "Netzbezug Kosten",
      description: `Kosten für den Bezug von Netzstrom, berechnet mit ${priceKW}€/KW.`,
      metricProps: { val: wpElectricityGridPrice.value, unit: "€", valueClass: "text-orange-300" },
    },
    {
      title: "Überschussladen Einsparung",
      description: `Ersparnis durch das Laden mit PV-Überschuss statt Netzstrom, berechnet mit ${priceKW}€/KW.`,
      metricProps: { val: wpElectricityPrices.value, unit: "€", valueClass: "text-green-400" },
    },
  ];
});

const CHARGE_CURVE = {
  [ChargingStatusEnum["1P6A"]]: 1380,
  [ChargingStatusEnum["1P7A"]]: 1610,
  [ChargingStatusEnum["1P8A"]]: 1840,
  [ChargingStatusEnum["1P9A"]]: 2070,
  [ChargingStatusEnum["1P10A"]]: 2300,
  [ChargingStatusEnum["1P11A"]]: 2530,
  [ChargingStatusEnum["1P12A"]]: 2760,
  [ChargingStatusEnum["1P13A"]]: 2990,
  [ChargingStatusEnum["1P14A"]]: 3220,
  [ChargingStatusEnum["1P15A"]]: 3450,
  [ChargingStatusEnum["1P16A"]]: 3680,
  [ChargingStatusEnum["3P6A"]]: 4140,
  [ChargingStatusEnum["3P7A"]]: 4830,
  [ChargingStatusEnum["3P8A"]]: 5520,
  [ChargingStatusEnum["3P9A"]]: 6210,
  [ChargingStatusEnum["3P10A"]]: 6900,
  [ChargingStatusEnum["3P11A"]]: 7590,
  [ChargingStatusEnum["3P12A"]]: 8280,
  [ChargingStatusEnum["3P13A"]]: 8970,
  [ChargingStatusEnum["3P14A"]]: 9660,
  [ChargingStatusEnum["3P15A"]]: 10350,
  [ChargingStatusEnum["3P16A"]]: 11040,
};
</script>

<template>
  <Page title="Wallbox">
    <Tabs default-value="daten" :model-value="activeTab" class="mr-2">
      <div class="sticky top-0 z-10 bg-background flex justify-between items-center">
        <TabsList class="mb-3">
          <TabsTrigger value="daten" @click="clickTab('daten')">Daten</TabsTrigger>
          <TabsTrigger value="werte" @click="clickTab('werte')">Werte</TabsTrigger>
        </TabsList>
        <p v-if="data?.updatedAt" class="text-xs text-muted-foreground">Aktualisiert: <Date :date="data.updatedAt" /></p>
      </div>
      <TabsContent value="daten" class="space-y-3">
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard
            v-for="status in statusCards"
            :title="status.title"
            :key="status.title"
            :content-class="status.active !== undefined ? 'flex items-center gap-1.5' : undefined"
          >
            <StatusDot v-if="status.active !== undefined" :active="status.active" />
            <span class="text-sm font-semibold">{{ status.text }}</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Leistung</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard v-for="power in powerCards" :title="power.title" :key="power.title">
            <span class="text-sm font-semibold" :class="power.valueClass">{{ power.value }}</span>
            <span class="text-xs text-muted-foreground ml-1">{{ power.unit }}</span>
          </DataCard>
          <DataCard title="Netzbezug-Freigabe genutzt" content-class="space-y-1.5">
            <div>
              <span class="text-sm font-semibold">{{ data.gridDrawAllowanceUsedPercent }} </span>
              <span class="text-xs text-muted-foreground ml-1">% / </span>
              <span class="text-sm font-semibold"> {{ iobroker.wattPilot.gridDrawAllowanceWatt.value }} </span>
              <span class="text-xs text-muted-foreground ml-1"> {{ iobroker.wattPilot.gridDrawAllowanceWatt.unit }} </span>
            </div>
            <Progress :model-value="Math.min(Math.max(data.gridDrawAllowanceUsedPercent ?? 0, 0), 100)" class="h-1.5" />
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
          <DataCard title="Batterie Ladeziel Standart">
            <MetricValue :number-value="iobroker.car.batteryStandardTarget" />
          </DataCard>
          <DataCard title="Batterie Ladeziel schnell">
            <MetricValue :number-value="iobroker.car.batteryQuickTarget" />
          </DataCard>
        </div>
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Einstellungen</p>

        <p class="text-[10px] text-muted-foreground">Darf aus dem Netz gezogen werden bei Überschuss</p>

        <InputIobroker
          :state="iobroker.wattPilot.gridDrawAllowanceWatt"
          :unit="iobroker.wattPilot.gridDrawAllowanceWatt.unit"
          class="w-40"
          :step="100"
        />
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Schalten</p>
        <div class="flex items-center flex-wrap gap-2">
          <ButtonStringIobroker
            class="capitalize min-w-17.5"
            active-border="success"
            :state="iobroker.wattPilot.chargingMode"
            :value="ChargingStatusEnum.AUTO"
            use-active
            >{{ ChargingStatusEnum.AUTO }}</ButtonStringIobroker
          >
          <ButtonStringIobroker
            class="capitalize min-w-17.5"
            active-border="danger"
            :state="iobroker.wattPilot.chargingMode"
            :value="ChargingStatusEnum.DISABLED"
            use-active
            >{{ ChargingStatusEnum.DISABLED }}</ButtonStringIobroker
          >
        </div>
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Laden mit einer Phase</p>
        <div class="flex items-center flex-wrap gap-2">
          <ButtonStringIobroker
            v-for="(statusEnum, i) in filterEnum(ChargingStatusEnum, ['3P', ChargingStatusEnum.AUTO, ChargingStatusEnum.DISABLED])"
            :key="i"
            class="capitalize min-w-28"
            active-border="success"
            :state="iobroker.wattPilot.chargingMode"
            :value="ChargingStatusEnum[statusEnum as keyof typeof ChargingStatusEnum]"
            use-active
            >{{ statusEnum.replace("1P", "") }} =>
            {{ CHARGE_CURVE[ChargingStatusEnum[statusEnum as keyof typeof ChargingStatusEnum] as keyof typeof CHARGE_CURVE] }}</ButtonStringIobroker
          >
        </div>
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Laden mit Drei Phasen</p>
        <div class="flex items-center flex-wrap gap-2">
          <ButtonStringIobroker
            v-for="(statusEnum, i) in filterEnum(ChargingStatusEnum, ['1P', ChargingStatusEnum.AUTO, ChargingStatusEnum.DISABLED])"
            :key="i"
            class="capitalize min-w-28"
            active-border="success"
            :state="iobroker.wattPilot.chargingMode"
            :value="ChargingStatusEnum[statusEnum as keyof typeof ChargingStatusEnum]"
            use-active
            >{{ statusEnum.replace("3P", "") }} =>
            {{ CHARGE_CURVE[ChargingStatusEnum[statusEnum as keyof typeof ChargingStatusEnum] as keyof typeof CHARGE_CURVE] }}</ButtonStringIobroker
          >
        </div>
      </TabsContent>

      <TabsContent value="werte" class="space-y-3">
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Werte</p>
        <Card class="py-0 gap-0 rounded-md">
          <CardContent class="px-3 py-1 divide-y divide-border">
            <div
              v-for="row in valueRows"
              :key="row.title"
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 first:pt-2 last:pb-2"
            >
              <div>
                <p class="text-sm font-medium">{{ row.title }}</p>
                <p class="text-xs text-muted-foreground">{{ row.description }}</p>
              </div>
              <MetricValue v-bind="row.metricProps" />
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
    </Tabs>
  </Page>
</template>
