<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
  {
    title: "Maximale Zeit zum befüllen",
    value: heating.maxTimeToFill?.val,
    type: "number",
    unit: "s"
  },
  {
    title: "Laufzeit Spirale nach Füllstandsensors aktiv",
    value: heating.offsetFilling?.val,
    type: "number",
    unit: "s"
  },
  {
    title: "Pumpe Heizung an ab",
    value: heating.tempPumpOn?.val,
    type: "number",
    unit: "°C"
  },
  {
    title: "Pumpe Heizung aus ab",
    value: heating.tempPumpOff?.val,
    type: "number",
    unit: "°C"
  },
  {
    title: "Differenz Solar zu Puffer",
    value: heating.diffSolarBuffer?.val,
    type: "number",
    unit: "°C"
  },
  {
    title: "Minimale Temperatur Solar zum Puffer füllen",
    value: heating.minFillTemp?.val,
    type: "number",
    unit: "°C"
  },
  {
    title: "Maximale Temperatur des Puffer zum Solar füllen",
    value: heating.maxFillTemp?.val,
    type: "number",
    unit: "°C"
  }
];
</script>
<template>
  <CardListing :entries="entries" title="Einstellungen" class="flex-1" />
</template>
