<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { computed } from "vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getValNumber } from "@/lib/object.ts";

const { pv, heating } = useIobrokerStore();

const infos = computed((): InfoTypes[][] => [
  [
    { title: "Grosse PV", value: getValNumber(pv.pvGross), unit: "Wh" },
    { title: "Kleine PV", value: getValNumber(pv.smallPv), unit: "Wh" },
  ],
  [
    {
      title: getValNumber(pv.feedIn) < 0 ? "Netz Bezug" : "Netz Einspeisung",
      value: getValNumber(pv.feedIn) < 0 ? getValNumber(pv.feedIn) * -1 : getValNumber(pv.feedIn),
      unit: "W",
      valueClass: getValNumber(pv.feedIn) < 0 ? "text-destructive" : "text-success",
    },
    {
      title: getValNumber(pv.activeCharging) > 0 ? "Batterie laden" : "Batterie entladen",
      value: getValNumber(pv.activeCharging),
      unit: "W",
      valueClass: getValNumber(pv.activeCharging) < 0 ? "text-destructive" : "text-success",
    },
    { title: "Ladezustand Batterie", value: getValNumber(pv.batteryCharging), unit: "%" },
  ],
  [
    { title: "Verkauft", value: getValNumber(pv.profit), unit: "€" },
    {
      title: "Genutzt",
      value: (getValNumber(pv.savedMoney) - getValNumber(pv.profit)).toFixed(2),
      unit: "€",
    },
    { title: "Ersparnis", value: getValNumber(pv.savedMoney), unit: "€" },
  ],
  [
    { title: "Heizung", value: getValNumber(heating.heatingTemperature), unit: "°C" },
    { title: "Solar", value: getValNumber(heating.heatingSolar), unit: "°C" },
    { title: "Puffer Oben", value: getValNumber(heating.heatingBufferTop), unit: "°C" },
    { title: "Puffer Mitte", value: getValNumber(heating.heatingBufferMiddle), unit: "°C" },
    { title: "Puffer Unten", value: getValNumber(heating.heatingBuffer), unit: "°C" },
  ],
]);
</script>

<template>
  <Card styling="small" color="primary">
    <CardHeader>
      <CardTitle> PV & Heizung</CardTitle>
    </CardHeader>
    <CardContent>
      <InfoCard v-for="(info, i) in infos" :key="i" :infos="info" class="mt-2 first:mt-0" />
    </CardContent>
  </Card>
</template>
