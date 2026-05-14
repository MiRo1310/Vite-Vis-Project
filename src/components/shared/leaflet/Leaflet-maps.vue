<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LPopup, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { LatLngBoundsExpression, LatLngTuple, Map as LeafletMap } from "leaflet";
import { computed, ref, watch } from "vue";
import { Markers } from "@/components/shared/leaflet/index.ts";

// const customIcon = L.icon({
//   iconRetinaUrl: markerIcon,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// import * as L from "leaflet";
// import myImage from "@/assets/my-marker.png";
//
// const customIcon = L.icon({
//   iconUrl: myImage,
//
//   iconSize: [40, 40], // Größe deines Bildes
//   iconAnchor: [20, 40], // „Spitze“ des Pins
//   popupAnchor: [0, -40],
// });

const props = defineProps<{ markers: Markers[] }>();

const map = ref<LeafletMap | null>(null);
const zoom = 13;

const normalizedMarkers = computed<LatLngTuple[]>(() =>
  props.markers.map((m) => m.coordinates).filter((m): m is LatLngTuple => Array.isArray(m) && typeof m[0] === "number" && typeof m[1] === "number"),
);

const center = computed<LatLngTuple>(() => {
  if (normalizedMarkers.value.length === 0) {
    return [51.1657, 10.4515];
  }
  const sum = normalizedMarkers.value.reduce(
    (acc, marker) => {
      acc.lat += marker[0];
      acc.lng += marker[1];
      return acc;
    },
    { lat: 0, lng: 0 },
  );
  return [sum.lat / normalizedMarkers.value.length, sum.lng / normalizedMarkers.value.length];
});

function fitAllMarkers() {
  if (!map.value) {
    return;
  }

  if (normalizedMarkers.value.length === 0) {
    map.value.setView([51.1657, 10.4515], zoom);
    return;
  }

  if (normalizedMarkers.value.length === 1) {
    map.value.setView(normalizedMarkers.value[0], 17);
    return;
  }

  const bounds: LatLngBoundsExpression = normalizedMarkers.value;
  map.value.fitBounds(bounds, {
    padding: [30, 30],
    maxZoom: 17,
  });
}

function onMapReady(leafletMap: LeafletMap) {
  map.value = leafletMap;

  setTimeout(() => {
    leafletMap.invalidateSize();
    fitAllMarkers();
  }, 100);
}

watch(normalizedMarkers, () => {
  fitAllMarkers();
});
</script>

<template>
  <LMap
    @ready="onMapReady"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
    :options="{
      zoomSnap: 0.5,
    }"
  >
    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <template v-for="(marker, index) in markers" :key="index">
      <LMarker v-if="marker.coordinates.length === 2 && marker.tooltip" :lat-lng="marker.coordinates">
        <LPopup>{{ marker.tooltip }}</LPopup>
      </LMarker>
      <LMarker v-else-if="marker.coordinates.length === 2" :lat-lng="marker.coordinates" />
    </template>
    <!--    <LPolyline-->
    <!--      :lat-lngs="[-->
    <!--        [51.934, 7.174],-->
    <!--        [51.935, 7.18],-->
    <!--        [51.94, 7.19],-->
    <!--      ]"-->
    <!--    />-->
  </LMap>
</template>
