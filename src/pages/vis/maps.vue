<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import LeafletMaps from "@/components/shared/leaflet/Leaflet-maps.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { Markers } from "@/components/shared/leaflet";

const { position } = useIobrokerStore();

interface Coordinates {
  lat: number;
  lng: number;
}

const markers = computed((): Markers[] => {
  const json = position.michaelCoordinates?.val;
  if (!json) {
    return [];
  }
  const parsed = JSON.parse(json) as Coordinates;

  return [{ coordinates: [parsed.lat, parsed.lng], tooltip: "Michael" }];
});
</script>

<template>
  <Page title="Karte">
    <LeafletMaps :markers />
  </Page>
</template>
