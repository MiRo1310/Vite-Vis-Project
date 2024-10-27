<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import CardListing from "../shared/card/CardListing.vue";
import { Entries } from "@/types";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
    { title: "Automatik Heizung", value: heating.automatic, type: "boolean" },
    { title: "Heizung aktiv", value: heating.active, type: "boolean" },
    { title: "Brennstoff Füllstand", value: heating.level, type: "boolean" },
    { title: "Automatik Solar", value: heating.autoSolar, type: "boolean" },
];
</script>
<template>
    <CardListing :entries="entries" title="Heizung" class="mx-2" />
</template>
