<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "@/components/shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { storeToRefs } from "pinia";

const { heating } = storeToRefs(useIobrokerStore());

const entries: Entries[] = [
  {
    title: "Automatik Heizung",
    value: heating.value.automatic?.val,
    type: "boolean",
  },
  { title: "Heizung aktiv", value: heating.value.active?.val, type: "boolean" },
  { title: "Brennstoff Füllstand", value: heating.value.level?.val, type: "boolean" },
  { title: "Automatik Solar", value: heating.value.autoSolar?.val, type: "boolean" },
];
</script>
<template>
  <CardListing :entries="entries" title="Heizung" />
</template>
