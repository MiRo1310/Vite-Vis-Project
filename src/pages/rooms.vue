<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { WindowObject } from "@/types/types.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { notSubscribedIds } from "@/subscribeIds/ids-not-subscribed.ts";
import { computed, onBeforeUnmount, ref } from "vue";
import Page from "@/components/shared/page/Page.vue";
import Room from "@/components/section/window/Room.vue";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { Button } from "@/components/shared/button";

const iobrokerStore = useIobrokerStore();
const { windowGlobal, time, fenster, rolladen, shutterAutoDownTime, shutterAutoUp } = storeToRefs(iobrokerStore);

const rooms = computed((): WindowObject[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  return [
    {
      name: "Küche",
      shutter: true,
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: fenster.value.kuecheTuer?.val ?? false,
          shutterPosition: rolladen.value.kuecheTuerPosition?.val,
          shutterAutoDown: shutterAutoDownTime.value.kuecheTuerAuto,
          shutterAutoUpTime: shutterAutoUp.value.kuecheTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheTuerAutoUp,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheTuerDelay,
          idShutterPosition: kueche.shutterPositionDoor,
        },
        {
          name: "Fenster",
          idShutterPosition: kueche.shutterPositionWindow,
          shutterAutoUpTime: shutterAutoUp.value.kuecheFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kuecheFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheFensterDelay,
          isOpenStatus: fenster.value.kuecheFenster?.val ?? false,
          shutterPosition: rolladen.value.kuecheFensterPosition?.val,
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: fenster.value.esszimmerLinks?.val ?? false,
          shutterPosition: rolladen.value.esszimmerLinksPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: fenster.value.esszimmerRechts?.val ?? false,
          shutterPosition: rolladen.value.esszimmerLinksPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
        },
      ],
    },
    {
      name: "Wohnzimmer",
      shutter: true,
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: fenster.value.wohnzimmerEcke?.val ?? false,
          shutterPosition: rolladen.value.wohnzimmerEckePosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: fenster.value.wohnzimmerLinks?.val ?? false,
          shutterPosition: rolladen.value.wohnzimmerLinksPosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: fenster.value.wohnzimmerMitte?.val ?? false,
          shutterPosition: rolladen.value.wohnzimmerMittePosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: fenster.value.wohnzimmerRechts?.val ?? false,
          shutterPosition: rolladen.value.wohnzimmerRechtsPosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
        },
      ],
    },

    {
      name: "Schlafzimmer",
      shutter: true,
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: fenster.value.schlafenFenster?.val ?? false,
          shutterPosition: rolladen.value.schlafenFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.schlafenFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenFensterDelay,
        },
        {
          name: "Tür",
          idShutterPosition: schlafen.shutterPositionDoor,
          door: true,
          isOpenStatus: fenster.value.schlafenTuer?.val ?? false,
          shutterPosition: rolladen.value.schlafenTuerPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.schlafenTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenTuerAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenTuerAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenTuerDelay,
        },
      ],
    },

    {
      name: "Kinderzimmer",
      shutter: true,
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: fenster.value.kinderzimmerFenster?.val ?? false,
          shutterPosition: rolladen.value.kinderzimmerFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.kinderzimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kinderzimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kinderzimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kinderzimmerFensterDelay,
        },
      ],
    },
    {
      name: "Bad",
      shutter: true,
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: fenster.value.badFenster?.val ?? false,
          shutterPosition: rolladen.value.badFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.badFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.badFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.badFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.badFensterDelay,
        },
      ],
    },
    {
      name: "Gästezimmer",
      shutter: true,
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: fenster.value.gaestezimmerFenster?.val ?? false,
          shutterPosition: rolladen.value.gaestezimmerFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.gaestezimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.gaestezimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.gaestezimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.gaestezimmerFensterDelay,
        },
      ],
    },
    {
      name: "Abstellraum OG",
      shutter: true,
      windows: [
        {
          name: "links",
          idShutterPosition: abstellraumog.shutterPositionLeft,
          isOpenStatus: fenster.value.abstellraumOgLinks?.val ?? false,
          shutterPosition: rolladen.value.abstellraumOgLinksPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgLinksDelay,
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: fenster.value.abstellraumOgRechts?.val ?? false,
          shutterPosition: rolladen.value.abstellraumOgRechtsPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgRechtsAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgRechtsAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgRechtsAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgRechtsDelay,
        },
      ],
    },
    {
      name: "Haustür",
      shutter: false,
      windows: [
        {
          name: "Haustür",
          door: true,
          isOpenStatus: fenster.value.haustuer?.val ?? false,
        },
      ],
    },
    { name: "Kellertür", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.kellerTuer?.val ?? false }] },
    { name: "Keller Flur", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.kellerFlurFenster?.val ?? false }] },
    { name: "Büro Keller", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.bueroFenster?.val ?? false }] },
    { name: "Gäste-WC links", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.gaesteWcLinks?.val ?? false }] },
    { name: "Gäste-WC rechts", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.gaesteWcRechts?.val ?? false }] },
    { name: "Flur links", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.flurLinks?.val ?? false }] },
    { name: "Flur rechts", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.flurRechts?.val ?? false }] },
    { name: "Abstellraum", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.abstellraumFenster?.val ?? false }] },
    { name: "Dachboden rechts", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.dachbodenRechts?.val ?? false }] },
    { name: "Dachboden links", shutter: false, windows: [{ name: "", door: true, isOpenStatus: fenster.value.dachbodenLinks?.val ?? false }] },
  ];
});

const selectedName = ref<string | null>(null);

const selectedRoom = computed(() => rooms.value.find((room) => room.name === selectedName.value));
</script>

<template>
  <Page v-if="!selectedRoom" title="Räume">
    <template #title>
      <p v-show="getOpenWindows === 1" class="text-muted-foreground">
        Ein Fenster oder eine Tür ist
        <span :class="windowGlobal.fensterOffen ? 'windows__notification' : ''" class="ml-1">offen </span>
      </p>

      <p v-show="getOpenWindows !== 1" class="text-muted-foreground">
        {{ getOpenWindows ? getOpenWindows : "Alle" }}
        Fenster / Türen sind
        <span :class="{ window__notification: windowGlobal.fensterOffen }">{{ windowGlobal.fensterOffen ? "offen" : "geschlossen" }}</span>
      </p>

      <p>Sonnenuntergang: {{ time.sonnenuntergang?.val }}</p>
    </template>
    <div class="windows__cards">
      <Room v-for="room in rooms" :room :key="room.name" @click-room="selectedName = $event" />
    </div>
  </Page>

  <Page v-if="selectedRoom" :title="selectedRoom.name">
    <WindowCard :window="selectedRoom" @click-back="selectedName = null" />
  </Page>
</template>

<style scoped lang="scss">
.windows {
  @apply lg:fixed right-1 left-1 top-[4rem] border-t-4 border-t-backgroundColor z-50;

  &__header {
    @apply p-1;
  }

  &__title {
    @apply flex justify-between;
  }

  &__cards {
    @apply grid grid-cols-3 gap-1;
  }

  &__notification {
    @apply text-red-500 animate-pulse;
  }
}
</style>
