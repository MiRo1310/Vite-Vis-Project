<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "../../shared/card/CardListing.vue";
import { type Entries } from "@/types/types.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();

const entries = computed((): Entries[] => {
  const { snail, spiral, solarPump, heatingPump } = iobroker.heating;
  return [
    { title: "Heizung Schnecke", value: snail.val, type: "boolean" },
    { title: "Förderspirale", value: spiral.val, type: "boolean" },
    { title: "Pumpe Solar", value: solarPump.val, type: "boolean" },
    { title: "Heizung Zusatz", value: heatingPump.val, type: "boolean" },
  ];
});
</script>

<template>
  <CardListing :entries="entries" title="Motoren / Pumpen" />
</template>
