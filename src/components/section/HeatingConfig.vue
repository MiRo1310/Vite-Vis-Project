<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import CardListing from "../shared/card/CardListing.vue";
import { Entries } from "@/types";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
    {
        title: "Maximale Zeit zum befüllen",
        value: heating.maxTimeToFill,
        type: "number",
        unit: "s",
    },
    {
        title: "Laufzeit Spirale nach Füllstandsensors aktiv",
        value: heating.offsetFilling,
        type: "number",
        unit: "s",
    },
    { title: "Pumpe Heizung an ab", value: heating.tempPumpOn, type: "number", unit: "°C" },
    {
        title: "Pumpe Heizung aus ab",
        value: heating.tempPumpOff,
        type: "number",
        unit: "°C",
    },
    {
        title: "Differenz Solar zu Puffer",
        value: heating.diffSolarBuffer,
        type: "number",
        unit: "°C",
    },
    {
        title: "Minimale Temperatur Solar zum Puffer füllen",
        value: heating.minFillTemp,
        type: "number",
        unit: "°C",
    },
    {
        title: "Maximale Temperatur des Puffer zum Solar füllen",
        value: heating.maxFillTemp,
        type: "number",
        unit: "°C",
    },
];
</script>
<template>
    <CardListing :entries="entries" title="Einstellungen" class="mx-2" />
</template>
