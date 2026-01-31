<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { storeToRefs } from "pinia";

const { heating } = storeToRefs(useIobrokerStore());

const entries: Entries[] = [
  {
    title: "Heizung",
    value: heating.value.heatingTemperature?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Solar",
    value: heating.value.heatingSolar?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Puffer",
    value: heating.value.heatingBuffer?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Solar Max heute",
    value: heating.value.solarMaxToday?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Solar Max",
    value: heating.value.solarMax?.val,
    type: "number",
    unit: "°C",
  },
];
</script>
<template>
  <CardListing :entries="entries" title="Temperaturen" />
</template>
