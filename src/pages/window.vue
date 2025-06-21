<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { WindowObject } from "@/types/types.ts";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { getOpenWindows } from "@/composables/windows.ts";

const iobrokerStore = useIobrokerStore();
const { windowGlobal, time } = storeToRefs(iobrokerStore);

const windows: WindowObject[] = [
  { name: "Küche Tür", shutter: true, id: "kuecheTuer", door: true },
  { name: "Küche Fenster", shutter: true, id: "kuecheFenster" },
  {
    name: "Esszimmer",
    shutter: true,
    id: "esszimmerLinks",
    id2: "esszimmerRechts",
  },
  { name: "Wohnzimmer Ecke", shutter: true, id: "wohnzimmerEcke" },
  { name: "Wohnzimmer links", shutter: true, id: "wohnzimmerLinks" },
  { name: "Wohnzimmer mitte", shutter: true, id: "wohnzimmerMittig" },
  { name: "Wohnzimmer rechts", shutter: true, id: "wohnzimmerRechts" },
  { name: "Schlafzimmer Fenster", shutter: true, id: "schlafenFenster" },
  { name: "Schlafzimmer Tür", shutter: true, id: "schlafenTuer", door: true },
  { name: "Kinderzimmer", shutter: true, id: "kinderzimmerFenster" },
  { name: "Bad", shutter: true, id: "badFenster" },
  { name: "Gästezimmer", shutter: true, id: "gaestezimmerFenster" },
  { name: "Abstellraum OG links", shutter: true, id: "abstellraumOgLinks" },
  { name: "Abstellraum OG rechts", shutter: true, id: "abstellraumOgRechts" },
  { name: "Haustür", shutter: false, id: "haustuer", door: true },
  { name: "Kellertür", shutter: false, id: "kellerTuer", door: true },
  { name: "Keller Flur", shutter: false, id: "kellerFlurFenster" },
  { name: "Büro Keller", shutter: false, id: "bueroFenster" },
  { name: "Gäste-WC links", shutter: false, id: "gaesteWcLinks" },
  { name: "Gäste-WC rechts", shutter: false, id: "gaesteWcRechts" },
  { name: "Flur links", shutter: false, id: "flurLinks" },
  { name: "Flur rechts", shutter: false, id: "flurRechts" },
  { name: "Abstellraum", shutter: false, id: "abstellraumFenster" },
  { name: "Dachboden rechts", shutter: false, id: "dachbodenRechts" },
  { name: "Dachboden links", shutter: false, id: "dachbodenLinks" },
];
</script>
<template>
  <div
    class="lg:fixed right-1 left-1 top-0 border-t-4 border-t-backgroundColor z-50"
  >
    <Card styling="light">
      <CardHeader class="p-1">
        <CardTitle class="flex justify-between">
          <p>Fensterstatus</p>
          <p v-show="getOpenWindows === 1" class="flex text-muted-foreground">
            Ein Fenster ist
            <span
              :class="
                windowGlobal.fensterOffen ? 'text-red-500 animate-pulse' : ''
              "
              class="ml-1"
              >offen
            </span>
          </p>

          <p v-show="getOpenWindows !== 1" class="text-muted-foreground">
            {{ getOpenWindows ? getOpenWindows : "Alle" }}
            Fenster sind
            <span :class="windowGlobal.fensterOffen ? 'text-red-500' : ''">{{
              windowGlobal.fensterOffen ? "offen" : "geschlossen"
            }}</span>
          </p>

          <p>Sonnenuntergang: {{ time.sonnenuntergang }}</p>
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
  <div
    class="flex flex-wrap space-x-1 space-y-1 pt-8 -ml-1 z-10 overflow-auto max-h-full"
  >
    <WindowCard
      v-for="card in windows"
      :id="card.id"
      :key="card.name"
      :shutter="card.shutter"
      :door="card.door || false"
      :title="card.name"
      :id2="card.id2"
    />
  </div>
</template>
