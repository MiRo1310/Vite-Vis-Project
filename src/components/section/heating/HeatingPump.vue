<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";

const { heating } = useIobrokerStore();

const entries: Entries[] = [
  { title: "Heizung Schnecke", value: heating.snail?.val, type: "boolean" },
  { title: "Förderspirale", value: heating.spiral?.val, type: "boolean" },
  { title: "Pumpe Solar", value: heating.solarPump?.val, type: "boolean" },
  { title: "Heizung Zusatz", value: heating.heatingPump?.val, type: "boolean" },
];
</script>
<template>
  <CardListing :entries="entries" title="Motoren / Pumpen" />
</template>
