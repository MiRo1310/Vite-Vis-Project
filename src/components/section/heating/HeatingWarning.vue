<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { storeToRefs } from "pinia";

const { heating } = storeToRefs(useIobrokerStore());

const entries: Entries[] = [
  {
    title: "Brennstoff vorhanden",
    value: !heating.value.pelletExist?.val,
    type: "boolean",
  },
  {
    title: "Überwachung Zugeber",
    value: !heating.value.watcherAdmitter?.val,
    type: "boolean",
  },
  {
    title: "Überwachung Brennstoffbehälter",
    value: !heating.value.tempPelletBuffer?.val,
    type: "boolean",
  },
  {
    title: "Meldung quittiert",
    value: !heating.value.confirmMessage?.val,
    type: "boolean",
  },
];
</script>
<template>
  <CardListing :entries="entries" title="Warnungen" />
</template>
