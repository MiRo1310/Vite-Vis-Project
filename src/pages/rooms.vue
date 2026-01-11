<script setup lang="ts">
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { RoomItems, RoomType } from "@/types/types.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { notSubscribedIds } from "@/subscribeIds/ids-not-subscribed.ts";
import { computed, ref } from "vue";
import Page from "@/components/shared/page/Page.vue";
import RoomMinimal from "@/components/section/window/RoomMinimal.vue";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { roomNames, updateRoomInHeatingControl } from "@/composables/heatingControl.ts";
import { BatteriesType } from "@/subscribeIds/batteriesType.ts";
import { Button } from "@/components/shared/button";

const iobrokerStore = useIobrokerStore();

const { windowGlobal, time, fenster, rolladen, shutterAutoDownTime, shutterAutoUp, batteries, hmip } = storeToRefs(iobrokerStore);

const getVal = <T,>(storeValue: StoreValue<T>): T | undefined => {
  return storeValue?.val;
};

const rooms = computed((): RoomType[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  const batterie: BatteriesType = batteries.value;
  return [
    {
      name: "Küche",
      shutter: true,
      batteryHeating: [batterie["HMIP Kueche"]?.lowBat],
      bellStatus: batterie.xioami_fensterkontakt_kueche_klingel.available,
      temp: [getVal(hmip.value.kitchen_valveActualTemp)],
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: getVal(fenster.value.kuecheTuer),
          shutterPosition: getVal(rolladen.value.kuecheTuerPosition),
          shutterAutoDown: shutterAutoDownTime.value.kuecheTuerAuto,
          shutterAutoUpTime: shutterAutoUp.value.kuecheTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheTuerAutoUp,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheTuerDelay,
          idShutterPosition: kueche.shutterPositionDoor,
          windowSensorReachable: batterie.xioami_kitchen_door?.available,
        },
        {
          name: "Fenster",
          idShutterPosition: kueche.shutterPositionWindow,
          shutterAutoUpTime: shutterAutoUp.value.kuecheFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kuecheFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheFensterDelay,
          isOpenStatus: getVal(fenster.value.kuecheFenster),
          shutterPosition: getVal(rolladen.value.kuecheFensterPosition),
          windowSensorReachable: batterie.xioami_kitchen_window?.available,
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Esszimmer"]?.lowBat],
      temp: [getVal(hmip.value.dining_valveActualTemp)],
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getVal(fenster.value.esszimmerLinks),
          shutterPosition: getVal(rolladen.value.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
          windowSensorReachable: batterie.xioami_diner_window_left?.available,
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: fenster.value.esszimmerRechts?.val,
          shutterPosition: rolladen.value.esszimmerLinksPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
          windowSensorReachable: batterie.xioami_diner_window_right?.available,
        },
      ],
    },
    {
      name: "Wohnzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Wohnzimmer links"]?.lowBat, batterie["HMIP Wohnzimmer rechts"]?.lowBat],
      temp: [hmip.value.living_left_valveActualTemp?.val, hmip.value.living_right_valveActualTemp?.val],
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: fenster.value.wohnzimmerEcke?.val,
          shutterPosition: rolladen.value.wohnzimmerEckePosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: batterie["xioami_living_small"]?.available,
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: fenster.value.wohnzimmerLinks?.val,
          shutterPosition: rolladen.value.wohnzimmerLinksPosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: batterie["xioami_living_left"]?.available,
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: fenster.value.wohnzimmerMitte?.val,
          shutterPosition: rolladen.value.wohnzimmerMittePosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: batterie["xioami_living_center"]?.available,
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: fenster.value.wohnzimmerRechts?.val,
          shutterPosition: rolladen.value.wohnzimmerRechtsPosition?.val,
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: batterie["xioami_living_right"]?.available,
        },
      ],
    },

    {
      name: "Schlafzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Schlafzimmer"]?.lowBat],
      temp: [hmip.value.sleeping_valveActualTemp?.val],
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: fenster.value.schlafenFenster?.val,
          shutterPosition: rolladen.value.schlafenFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.schlafenFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenFensterDelay,
          windowSensorReachable: batterie.xioami_sleeping_window?.available,
        },
        {
          name: "Tür",
          idShutterPosition: schlafen.shutterPositionDoor,
          door: true,
          isOpenStatus: fenster.value.schlafenTuer?.val,
          shutterPosition: rolladen.value.schlafenTuerPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.schlafenTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenTuerAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenTuerAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenTuerDelay,
          windowSensorReachable: batterie.xioami_sleeping_door?.available,
        },
      ],
    },

    {
      name: "Kinderzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Kinderzimmer"]?.lowBat],
      temp: [hmip.value.children_valveActualTemp?.val],
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: fenster.value.kinderzimmerFenster?.val,
          shutterPosition: rolladen.value.kinderzimmerFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.kinderzimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kinderzimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kinderzimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kinderzimmerFensterDelay,
          windowSensorReachable: batterie.xioami_children_window?.available,
        },
      ],
    },
    {
      name: "Bad",
      shutter: true,
      batteryHeating: [batterie["HMIP Bad"]?.lowBat],
      temp: [hmip.value.bath_valveActualTemp?.val],
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: fenster.value.badFenster?.val,
          shutterPosition: rolladen.value.badFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.badFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.badFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.badFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.badFensterDelay,
          windowSensorReachable: batterie.xioami_bath_window?.available,
        },
      ],
    },
    {
      name: "Gästezimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Gaestezimmer"]?.lowBat],
      temp: [hmip.value.guest_valveActualTemp?.val],
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: fenster.value.gaestezimmerFenster?.val,
          shutterPosition: rolladen.value.gaestezimmerFensterPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.gaestezimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.gaestezimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.gaestezimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.gaestezimmerFensterDelay,
          windowSensorReachable: batterie.xioami_guest_window?.available,
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
          isOpenStatus: fenster.value.abstellraumOgLinks?.val,
          shutterPosition: rolladen.value.abstellraumOgLinksPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgLinksDelay,
          windowSensorReachable: batterie.xioami_store_og_left?.available,
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: fenster.value.abstellraumOgRechts?.val,
          shutterPosition: rolladen.value.abstellraumOgRechtsPosition?.val,
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgRechtsAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgRechtsAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgRechtsAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgRechtsDelay,
          windowSensorReachable: batterie.xioami_store_og_right?.available,
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
          isOpenStatus: fenster.value.haustuer?.val,
          windowSensorReachable: batterie.xioami_housedoor_right?.available,
        },
      ],
    },
    {
      name: "Kellertür",
      shutter: false,
      windows: [
        {
          name: "",
          door: true,
          isOpenStatus: fenster.value.kellerTuer?.val,
          windowSensorReachable: batterie.xioami_cellar_door?.available,
        },
      ],
    },
    {
      name: "Keller Flur",
      shutter: false,
      windows: [
        {
          name: "",
          door: true,
          isOpenStatus: fenster.value.kellerFlurFenster?.val,
          windowSensorReachable: batterie.xioami_cellar_stair_window?.available,
        },
      ],
    },
    {
      name: "Büro Keller",
      shutter: false,
      windows: [
        {
          name: "",
          door: true,
          isOpenStatus: fenster.value.bueroFenster?.val,
          windowSensorReachable: batterie.xioami_office_window?.available,
        },
      ],
    },
    {
      name: "Gäste-WC",
      shutter: false,
      temp: [hmip.value.guest_wc_valveActualTemp?.val],
      windows: [
        {
          name: "links",
          door: true,
          isOpenStatus: fenster.value.gaesteWcLinks?.val,
          windowSensorReachable: batterie.xioami_guest_toilet_left?.available,
        },
        {
          name: "rechts",
          door: true,
          isOpenStatus: fenster.value.gaesteWcRechts?.val,
          windowSensorReachable: batterie.xioami_guest_toilet_right?.available,
        },
      ],
    },
    {
      name: "Flur",
      shutter: false,
      windows: [
        {
          name: "links",
          isOpenStatus: fenster.value.flurLinks?.val,
          windowSensorReachable: batterie.xioami_floor_left?.available,
        },
        {
          name: "rechts",
          isOpenStatus: fenster.value.flurRechts?.val,
          windowSensorReachable: batterie.xioami_floor_right?.available,
        },
      ],
    },
    {
      name: "Abstellraum",
      shutter: false,
      windows: [
        {
          name: "",
          isOpenStatus: fenster.value.abstellraumFenster?.val,
          windowSensorReachable: batterie.xioami_store_window?.available,
        },
      ],
    },
    {
      name: "Dachboden",
      shutter: false,
      windows: [
        {
          name: "left",
          isOpenStatus: fenster.value.dachbodenLinks?.val,
          windowSensorReachable: batterie.xioami_attic_left?.available,
        },
        {
          name: "rechts",
          isOpenStatus: fenster.value.dachbodenRechts?.val,
          windowSensorReachable: batterie.xioami_attic_right?.available,
        },
      ],
    },
  ];
});

const selectedName = ref<string | null>(null);

const selectedRoom = computed(() => rooms.value.find((room) => room.name === selectedName.value));

const clickRoom = (roomName: string) => {
  selectedName.value = roomName;

  if (roomNames.includes(roomName as RoomItems)) {
    updateRoomInHeatingControl(roomName as RoomItems);
  }
};
</script>

<template>
  <Page v-if="!selectedRoom" title="Räume">
    <div class="flex justify-between items-center mb-4">
      <p v-show="getOpenWindows === 1" class="text-muted-foreground">
        Ein Fenster oder eine Tür ist
        <span :class="windowGlobal.fensterOffen ? 'text-red-500 animate-pulse' : ''" class="ml-1">offen </span>
      </p>

      <p v-show="getOpenWindows !== 1" class="text-foreground">
        Fenster / Türen sind
        <span :class="{ 'text-red-500 animate-pulse': windowGlobal.fensterOffen?.val }">{{
          windowGlobal.fensterOffen?.val ? "offen" : "geschlossen"
        }}</span>
      </p>

      <p>Sonnenuntergang: {{ time.sonnenuntergang?.val }}</p>
    </div>
    <div class="grid grid-cols-3 gap-1">
      <RoomMinimal v-for="room in rooms" :room :key="room.name" @click-room="clickRoom" />
    </div>
  </Page>

  <Page v-if="selectedRoom" :title="selectedRoom.name">
    <template #header>
      <Button variant="outline" @click="selectedName = null">Zurück</Button>
    </template>
    <WindowCard :window="selectedRoom" />
  </Page>
</template>
