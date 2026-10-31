<script setup lang="ts">
import { Card, CardContent } from "@/components/shared/card";
import { TabsContent } from "@/components/ui/tabs";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { priceKW, wpElectricityGridPrice, wpElectricityPrices, wpPricePerHundredKm } from "@/composables/wpElectricityPrices.ts";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { getMostExpensiveFuelPrice } from "@/composables/fuel.ts";
import Enbw from "@/data/enbw.ts";

defineProps<{ value: string }>();

const { iobroker } = useIobrokerStore();

const lPer100Km = 8;

const valueRows = computed((): Array<{ title: string; description: string; metricProps: InstanceType<typeof MetricValue>["$props"] }> => {
  return [
    {
      title: "Gefahrene Kilometer",
      description: "",
      metricProps: { numberValue: iobroker.car.odometer },
    },
    {
      title: "Lademenge gesamt",
      description: "Insgesamt über die Wallbox geladene Energie.",
      metricProps: { numberValue: iobroker.wattPilot.totalCharging, math: (val: number) => val / 1000 },
    },
    {
      title: "Lademenge aus Netz",
      description: "Insgesamt über die Wallbox geladene Energie aus dem Netz.",
      metricProps: { numberValue: iobroker.wattPilot.totalChargingFromGrid, decimalPlaces: 3, valueClass: "text-orange-300" },
    },
    {
      title: "Lademenge von Ladesäulen",
      description: "Insgesamt über Ladesäulen geladene Energie.",
      metricProps: { val: Enbw.totalKW.toString, decimalPlaces: 3, valueClass: "text-blue-200" },
    },
    {
      title: "Netzbezug Kosten",
      description: `Kosten für den Bezug von Netzstrom, berechnet mit ${priceKW} €/KW.`,
      metricProps: { val: wpElectricityGridPrice.value, unit: "€", valueClass: "text-orange-300" },
    },
    {
      title: "Kosten von Ladesäulen",
      description: "Kosten gesamt über Ladesäulen geladene Energie.",
      metricProps: { val: Enbw.totalPrice.toString, decimalPlaces: 3, valueClass: "text-blue-200" },
    },
    {
      title: "Überschussladen Einsparung",
      description: `Ersparnis durch das Laden mit PV-Überschuss statt Netzstrom, berechnet mit ${priceKW} €/KW.`,
      metricProps: { val: wpElectricityPrices.value, unit: "€", valueClass: "text-green-400" },
    },
    {
      title: "Preis pro 100 km",
      description: "Preis für 100 km mit dem Auto.",
      metricProps: { val: wpPricePerHundredKm.value, unit: "€/100km", valueClass: "text-green-400" },
    },
  ];
});
</script>

<template>
  <TabsContent :value class="space-y-3">
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
</template>
