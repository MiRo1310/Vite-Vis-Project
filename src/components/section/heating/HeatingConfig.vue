<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "@/components/shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { storeToRefs } from "pinia";

const { heating } = storeToRefs(useIobrokerStore());

const entries: Entries[] = [
  {
    title: "Maximale Zeit zum befüllen",
    value: heating.value.maxTimeToFill?.val,
    type: "number",
    unit: "s",
  },
  {
    title: "Nachlauf Spirale",
    value: heating.value.offsetFilling?.val,
    type: "number",
    unit: "s",
  },
  {
    title: "Pumpe Heizung an, ab",
    value: heating.value.tempPumpOn?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Pumpe Heizung aus, ab",
    value: heating.value.tempPumpOff?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Differenz Solar/ Puffer",
    value: heating.value.diffSolarBuffer?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Min. Temp Solar zum Puffer füllen",
    value: heating.value.minFillTemp?.val,
    type: "number",
    unit: "°C",
  },
  {
    title: "Max. Temp des Puffer zum Solar füllen",
    value: heating.value.maxFillTemp?.val,
    type: "number",
    unit: "°C",
  },
];
</script>
<template>
  <CardListing :entries="entries" title="Einstellungen" class="flex-1" />
</template>
