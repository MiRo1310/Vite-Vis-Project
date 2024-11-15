<script setup lang="ts">
import FensterCard from "@/components/section/window/WindowsWindowCard.vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { WindowObject } from "@/types.ts";
import { getWindowInfos } from "@/composables/windows";

const iobrokerStore = useIobrokerStore();
const { fensterOffen } = storeToRefs<any>(iobrokerStore);

const { getOpenWindows } = getWindowInfos();

const windows: WindowObject[] = [
  { name: "Küche Tür", shutter: true, id: "kueche,tuer" },
  { name: "Küche Fenster", shutter: true, id: "kueche,fenster" },
  { name: "Esszimmer", shutter: true, id: "esszimmer,links", id2: "esszimmer,rechts" },
  { name: "Wohnzimmer Ecke", shutter: true, id: "wohnzimmer,ecke" },
  { name: "Wohnzimmer links", shutter: true, id: "wohnzimmer,links" },
  { name: "Wohnzimmer mitte", shutter: true, id: "wohnzimmer,mittig" },
  { name: "Wohnzimmer rechts", shutter: true, id: "wohnzimmer,rechts" },
  { name: "Schlafzimmer Fenster", shutter: true, id: "schlafen,fenster" },
  { name: "Schlafzimmer Tür", shutter: true, id: "schlafen,tuer" },
  { name: "Kinderzimmer", shutter: true, id: "kinderzimmer,fenster" },
  { name: "Bad", shutter: true, id: "bad,fenster" },
  { name: "Gästezimmer", shutter: true, id: "gaestezimmer,fenster" },
  { name: "Abstellraum OG links", shutter: true, id: "abstellraumog,links" },
  { name: "Abstellraum OG rechts", shutter: true, id: "abstellraumog,rechts" },

  { name: "Kellertür", shutter: false, id: "keller,tuer" },
  { name: "Keller Flur", shutter: false, id: "keller,flurFenster" },
  { name: "Büro Keller", shutter: false, id: "buero,fenster" },
  { name: "Gäste-WC links", shutter: false, id: "gaesteWc,links" },
  { name: "Gäste-WC rechts", shutter: false, id: "gaesteWc,rechts" },
  { name: "Flur links", shutter: false, id: "flur,links" },
  { name: "Flur rechts", shutter: false, id: "flur,rechts" },
  { name: "Abstellraum", shutter: false, id: "abstellraum,fenster" },
  { name: "Dachboden rechts", shutter: false, id: "dachboden,rechts" },
  { name: "Dachboden links", shutter: false, id: "dachboden,links" }
];

</script>
<template>
  <div />
  <div class="lg:fixed right-2 lg:left-48 z-10 bg-backgroundColor -mt-2">
    <Card class="mt-2">
      <CardHeader class="p-2">
        <CardTitle class=" flex justify-between">
          <p>Fensterstatus</p>
          <p v-show="getOpenWindows === 1" class="flex ">
            Ein Fenster ist
            <span :class="fensterOffen ? 'text-red-500 animate-pulse' : ''" class="ml-1 ">offen </span>
          </p>

          <p v-show="getOpenWindows !== 1">
            {{ getOpenWindows ? getOpenWindows : "Alle" }}
            Fenster sind
            <span :class="fensterOffen ? 'text-red-500' : ''">{{
              fensterOffen ?
                "offen" : "geschlossen" }}</span>
          </p>

          <p>Sonnenuntergang: {{ iobrokerStore.sonnenuntergang }}</p>
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
  <div class="flex flex-wrap lg:pt-9 -mx-1 ">
    <FensterCard
      v-for="card in windows" :id="card.id" :key="card.name" :shutter="card.shutter"
      :title="card.name"
      :id2="card.id2"
    />
  </div>
</template>
