<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import CardListing from "../shared/card/CardListing.vue";
import { Entries } from "@/types";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
    { title: "Brennstoff vorhanden", value: !heating.pelletExist, type: "boolean" },
    { title: "Überwachung Zugeber", value: !heating.watcherAdmitter, type: "boolean" },
    {
        title: "Temperatur im Brennstoffbehälter",
        value: !heating.tempPelletBuffer,
        type: "boolean",
    },
    { title: "Meldung quittiert", value: !heating.confirmMessage, type: "boolean" },
];
</script>
<template>
    <CardListing :entries="entries" title="Warnungen" />
</template>
