<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
  { title: "Brennstoff vorhanden", value: !heating.pelletExist?.val, type: "boolean" },
  { title: "Überwachung Zugeber", value: !heating.watcherAdmitter?.val, type: "boolean" },
  {
    title: "Temperatur im Brennstoffbehälter",
    value: !heating.tempPelletBuffer?.val,
    type: "boolean"
  },
  { title: "Meldung quittiert", value: !heating.confirmMessage?.val, type: "boolean" }
];
</script>
<template>
  <CardListing :entries="entries" title="Warnungen" />
</template>
