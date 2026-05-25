<script setup lang="ts">
import { Card, CardContent } from "@/components/shared/card";
import { computed } from "vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getStoreValBoolean, getStoreValNumber, getStoreValString } from "@/lib/object.ts";
import { activeStatus } from "@/composables/status.ts";

const { pv, heating, pool } = useIobrokerStore();

const modus = computed(() => {
  switch (getStoreValString(pool.mode)) {
    case "0":
      return "Kühlen";
    case "1":
      return "Heizen";
    case "2":
      return "Auto";
    default:
      return "None";
  }
});

const infos = computed((): InfoTypes[] => [
  {
    route: "/pv",
    listing: [
      { title: "Grosse PV", value: getStoreValNumber(pv.pvGross), unit: "Wh" },
      { title: "Kleine PV", value: getStoreValNumber(pv.smallPv), unit: "Wh" },
    ],
  },
  {
    route: "/energy",
    listing: [
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
        valueClass: getStoreValNumber(pv.activeCharging) < 0 ? "text-destructive" : getStoreValNumber(pv.activeCharging) === 0 ? "" : "text-success",
      },
      { title: "Ladezustand Batterie", value: getStoreValNumber(pv.batteryCharging), unit: "%" },
    ],
  },
  {
    listing: [
      { title: "Verkauft", value: getStoreValNumber(pv.profit), unit: "€" },
      {
        title: "Genutzt",
        value: (getStoreValNumber(pv.savedMoney) - getStoreValNumber(pv.profit)).toFixed(2),
        unit: "€",
      },
      { title: "Ersparnis", value: getStoreValNumber(pv.savedMoney), unit: "€" },
    ],
  },
  {
    route: "/heating",
    listing: [
      { title: "Heizung", ...activeStatus.value(getStoreValBoolean(heating.active)) },
      { title: "Heizung Auto", ...activeStatus.value(getStoreValBoolean(heating.automatic)) },
      { title: "Heizung Temp", value: getStoreValNumber(heating.heatingTemperature), unit: "°C" },
      { title: "Solar Auto", ...activeStatus.value(getStoreValBoolean(heating.autoSolar)) },
      { title: "Solar Pumpe", ...activeStatus.value(getStoreValBoolean(heating.solarPump)) },
      { title: "Solar", value: getStoreValNumber(heating.heatingSolar), unit: "°C" },
      { title: "Puffer Oben", value: getStoreValNumber(heating.heatingBufferTop), unit: "°C" },
      { title: "Puffer Mitte", value: getStoreValNumber(heating.heatingBufferMiddle), unit: "°C" },
      { title: "Puffer Unten", value: getStoreValNumber(heating.heatingBuffer), unit: "°C" },
    ],
  },
  {
    listing: [
      { title: "Wärmepumpe", ...activeStatus.value(getStoreValBoolean(pool.poolPumpSwitch)) },
      { title: "Wärmepumpe Modus", value: modus.value },
      { title: "Wärmepumpe Silent", ...activeStatus.value(getStoreValBoolean(pool.silent)) },
      { title: "Wärmepumpe Bezug", value: getStoreValNumber(pool.consumption).toFixed(2), unit: "W" },
      { title: "Wärmepumpe In", value: getStoreValNumber(pool.tempIn), unit: "°C", valueClass: "text-blue-200" },
      { title: "Wärmepumpe Out", value: getStoreValNumber(pool.tempOut), unit: "°C", valueClass: "text-orange-200" },
      { title: "Wärmepumpe Soll", value: getStoreValNumber(pool.tempSet), unit: "°C" },
    ],
  },
  {
    listing: [
      { title: "Poolpumpe", ...activeStatus.value(getStoreValBoolean(pool.poolPumpSwitch)) },
      { title: "Poolpumpe Bezug", value: getStoreValNumber(pool.poolPumpPower), unit: "W" },
    ],
  },
]);
</script>

<template>
  <Card styling="small" color="primary">
    <CardContent>
      <InfoCard v-for="(info, i) in infos" :key="i" :infos="info" class="mt-2 first:mt-0" />
    </CardContent>
  </Card>
</template>
