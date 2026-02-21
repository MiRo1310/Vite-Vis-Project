<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { storeToRefs } from "pinia";

const { heating } = storeToRefs(useIobrokerStore());

const entries: Entries[] = [
  { title: "Heizung Schnecke", value: heating.value.snail?.val, type: "boolean" },
  { title: "Förderspirale", value: heating.value.spiral?.val, type: "boolean" },
  { title: "Pumpe Solar", value: heating.value.solarPump?.val, type: "boolean" },
  { title: "Heizung Zusatz", value: heating.value.heatingPump?.val, type: "boolean" },
];
</script>
<template>
  <CardListing :entries="entries" title="Motoren / Pumpen" />
</template>
