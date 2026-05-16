<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { computed } from "vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getStoreValNumber } from "@/lib/object.ts";

const { pv, heating } = useIobrokerStore();

const infos = computed((): InfoTypes[][] => [
  [
    { title: "Grosse PV", value: getStoreValNumber(pv.pvGross), unit: "Wh" },
    { title: "Kleine PV", value: getStoreValNumber(pv.smallPv), unit: "Wh" },
  ],
  [
    {
      title: getStoreValNumber(pv.feedIn) < 0 ? "Netz Bezug" : "Netz Einspeisung",
      value: getStoreValNumber(pv.feedIn) < 0 ? getStoreValNumber(pv.feedIn) * -1 : getStoreValNumber(pv.feedIn),
      unit: "W",
      valueClass: getStoreValNumber(pv.feedIn) < 0 ? "text-destructive" : "text-success",
    },
    {
      title: getStoreValNumber(pv.activeCharging) > 0 ? "Batterie laden" : "Batterie entladen",
      value: getStoreValNumber(pv.activeCharging),
      unit: "W",
      valueClass: getStoreValNumber(pv.activeCharging) < 0 ? "text-destructive" : "text-success",
    },
    { title: "Ladezustand Batterie", value: getStoreValNumber(pv.batteryCharging), unit: "%" },
  ],
  [
    { title: "Verkauft", value: getStoreValNumber(pv.profit), unit: "€" },
    {
      title: "Genutzt",
      value: (getStoreValNumber(pv.savedMoney) - getStoreValNumber(pv.profit)).toFixed(2),
      unit: "€",
    },
    { title: "Ersparnis", value: getStoreValNumber(pv.savedMoney), unit: "€" },
  ],
  [
    { title: "Heizung", value: getStoreValNumber(heating.heatingTemperature), unit: "°C" },
    { title: "Solar", value: getStoreValNumber(heating.heatingSolar), unit: "°C" },
    { title: "Puffer Oben", value: getStoreValNumber(heating.heatingBufferTop), unit: "°C" },
    { title: "Puffer Mitte", value: getStoreValNumber(heating.heatingBufferMiddle), unit: "°C" },
    { title: "Puffer Unten", value: getStoreValNumber(heating.heatingBuffer), unit: "°C" },
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
