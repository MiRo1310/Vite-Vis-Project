<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import CardListing from "../shared/card/CardListing.vue";
import { Entries } from "@/types";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
    { title: "Heizung", value: heating.heatingTemperature, type: "number", unit: "°C" },
    { title: "Solar", value: heating.heatingSolar, type: "number", unit: "°C" },
    { title: "Puffer", value: heating.heatingBuffer, type: "number", unit: "°C" },
    { title: "Solar Max heute", value: heating.solarMaxToday, type: "number", unit: "°C" },
    { title: "Solar Max", value: heating.solarMax, type: "number", unit: "°C" },
];
</script>
<template>
    <CardListing :entries="entries" title="Temperaturen" />
</template>
