<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import CardListing from "@/components/shared/card/CardListing.vue";
import { Entries } from "@/types/types.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();

const entries = computed((): Entries[] => {
  const heating = iobroker.heating;
  if (!heating) {
    return [];
  }

  return [
    {
      title: "Automatik Heizung",
      value: heating.automatic?.val,
      type: "boolean",
    },
    { title: "Heizung aktiv", value: heating.active?.val, type: "boolean" },
    { title: "Brennstoff Füllstand", value: heating.level?.val, type: "boolean" },
    { title: "Automatik Solar", value: heating.autoSolar?.val, type: "boolean" },
  ];
});
</script>
<template>
  <CardListing :entries="entries" title="Heizung" />
</template>
