<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import CardListing from "../shared/card/CardListing.vue";
import { Entries } from "@/types";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
    { title: "Heizung Schnecke", value: heating.snail, type: "boolean" },
    { title: "Förderspirale", value: heating.spiral, type: "boolean" },
    { title: "Pumpe Solar", value: heating.solarPump, type: "boolean" },
    { title: "Heizung Zusatz", value: heating.heatingPump, type: "boolean" },
];
</script>
<template>
    <CardListing :entries="entries" title="Motoren / Pumpen" />
</template>
