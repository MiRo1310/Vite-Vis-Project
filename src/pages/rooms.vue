<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { RoomItems, RoomType } from "@/types/types.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { notSubscribedIds } from "@/subscribeIds/ids-not-subscribed.ts";
import { computed, ref } from "vue";
import Page from "@/components/shared/page/Page.vue";
import RoomMinimal from "@/components/section/window/RoomMinimal.vue";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { roomNames, updateRoomInHeatingControl } from "@/composables/heatingControl.ts";
import { BatteriesType, XiaomiWindowSensor } from "@/subscribeIds/batteriesType.ts";
import { Button } from "@/components/shared/button";
import { getValBoolean, getValNumber } from "@/lib/object.ts";

const iobrokerStore = useIobrokerStore();

const { windowGlobal, time, fenster, rolladen, shutterAutoDownTime, shutterAutoUp, batteries, hmip } = storeToRefs(iobrokerStore);

const getAvailable = (val?: XiaomiWindowSensor) => val?.available;

const rooms = computed((): RoomType[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  const batterie: BatteriesType | undefined = batteries.value;
  if (!batterie) {
    return [];
  }
  return [
    {
      name: "Küche",
      shutter: true,
      batteryHeating: [batterie["HMIP Kueche"]?.lowBat],
      bellStatus: getAvailable(batterie.xioami_fensterkontakt_kueche_klingel),
      temp: [getValNumber(hmip.value.kitchen_valveActualTemp)],
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: getValBoolean(fenster.value.kuecheTuer),
          shutterPosition: getValNumber(rolladen.value.kuecheTuerPosition),
          shutterAutoDown: shutterAutoDownTime.value.kuecheTuerAuto,
          shutterAutoUpTime: shutterAutoUp.value.kuecheTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheTuerAutoUp,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheTuerDelay,
          idShutterPosition: kueche.shutterPositionDoor,
          windowSensorReachable: getAvailable(batterie.xioami_kitchen_door),
        },
        {
          name: "Fenster",
          idShutterPosition: kueche.shutterPositionWindow,
          shutterAutoUpTime: shutterAutoUp.value.kuecheFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kuecheFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kuecheFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kuecheFensterDelay,
          isOpenStatus: getValBoolean(fenster.value.kuecheFenster),
          shutterPosition: getValNumber(rolladen.value.kuecheFensterPosition),
          windowSensorReachable: getAvailable(batterie.xioami_kitchen_window),
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Esszimmer"]?.lowBat],
      temp: [getValNumber(hmip.value.dining_valveActualTemp)],
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getValBoolean(fenster.value.esszimmerLinks),
          shutterPosition: getValNumber(rolladen.value.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_diner_window_left),
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getValBoolean(fenster.value.esszimmerRechts),
          shutterPosition: getValNumber(rolladen.value.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_diner_window_right),
        },
      ],
    },
    {
      name: "Wohnzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Wohnzimmer links"]?.lowBat, batterie["HMIP Wohnzimmer rechts"]?.lowBat],
      temp: [getValNumber(hmip.value.living_left_valveActualTemp), getValNumber(hmip.value.living_right_valveActualTemp)],
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: getValBoolean(fenster.value.wohnzimmerEcke),
          shutterPosition: getValNumber(rolladen.value.wohnzimmerEckePosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_small),
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: getValBoolean(fenster.value.wohnzimmerLinks),
          shutterPosition: getValNumber(rolladen.value.wohnzimmerLinksPosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_left),
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: getValBoolean(fenster.value.wohnzimmerMitte),
          shutterPosition: getValNumber(rolladen.value.wohnzimmerMittePosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_center),
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: getValBoolean(fenster.value.wohnzimmerRechts),
          shutterPosition: getValNumber(rolladen.value.wohnzimmerRechtsPosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_right),
        },
      ],
    },

    {
      name: "Schlafzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Schlafzimmer"]?.lowBat],
      temp: [getValNumber(hmip.value.sleeping_valveActualTemp)],
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: getValBoolean(fenster.value.schlafenFenster),
          shutterPosition: getValNumber(rolladen.value.schlafenFensterPosition),
          shutterAutoUpTime: shutterAutoUp.value.schlafenFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_sleeping_window),
        },
        {
          name: "Tür",
          idShutterPosition: schlafen.shutterPositionDoor,
          door: true,
          isOpenStatus: getValBoolean(fenster.value.schlafenTuer),
          shutterPosition: getValNumber(rolladen.value.schlafenTuerPosition),
          shutterAutoUpTime: shutterAutoUp.value.schlafenTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.schlafenTuerAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.schlafenTuerAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.schlafenTuerDelay,
          windowSensorReachable: getAvailable(batterie.xioami_sleeping_door),
        },
      ],
    },

    {
      name: "Kinderzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Kinderzimmer"]?.lowBat],
      temp: [getValNumber(hmip.value.children_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: getValBoolean(fenster.value.kinderzimmerFenster),
          shutterPosition: getValNumber(rolladen.value.kinderzimmerFensterPosition),
          shutterAutoUpTime: shutterAutoUp.value.kinderzimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.kinderzimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.kinderzimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.kinderzimmerFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_children_window),
        },
      ],
    },
    {
      name: "Bad",
      shutter: true,
      batteryHeating: [batterie["HMIP Bad"]?.lowBat],
      temp: [getValNumber(hmip.value.bath_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: getValBoolean(fenster.value.badFenster),
          shutterPosition: getValNumber(rolladen.value.badFensterPosition),
          shutterAutoUpTime: shutterAutoUp.value.badFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.badFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.badFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.badFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_bath_window),
        },
      ],
    },
    {
      name: "Gästezimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Gaestezimmer"]?.lowBat],
      temp: [getValNumber(hmip.value.guest_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: getValBoolean(fenster.value.gaestezimmerFenster),
          shutterPosition: getValNumber(rolladen.value.gaestezimmerFensterPosition),
          shutterAutoUpTime: shutterAutoUp.value.gaestezimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.gaestezimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.gaestezimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.gaestezimmerFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_guest_window),
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
          isOpenStatus: getValBoolean(fenster.value.abstellraumOgLinks),
          shutterPosition: getValNumber(rolladen.value.abstellraumOgLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_store_og_left),
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: getValBoolean(fenster.value.abstellraumOgRechts),
          shutterPosition: getValNumber(rolladen.value.abstellraumOgRechtsPosition),
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgRechtsAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgRechtsAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgRechtsAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgRechtsDelay,
          windowSensorReachable: getAvailable(batterie.xioami_store_og_right),
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
          isOpenStatus: getValBoolean(fenster.value.haustuer),
          windowSensorReachable: getAvailable(batterie.xioami_housedoor_right),
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
          isOpenStatus: getValBoolean(fenster.value.kellerTuer),
          windowSensorReachable: getAvailable(batterie.xioami_cellar_door),
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
          isOpenStatus: getValBoolean(fenster.value.kellerFlurFenster),
          windowSensorReachable: getAvailable(batterie.xioami_cellar_stair_window),
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
          isOpenStatus: getValBoolean(fenster.value.bueroFenster),
          windowSensorReachable: getAvailable(batterie.xioami_office_window),
        },
      ],
    },
    {
      name: "Gäste-WC",
      shutter: false,
      temp: [getValNumber(hmip.value.guest_wc_valveActualTemp)],
      windows: [
        {
          name: "links",
          door: true,
          isOpenStatus: getValBoolean(fenster.value.gaesteWcLinks),
          windowSensorReachable: getAvailable(batterie.xioami_guest_toilet_left),
        },
        {
          name: "rechts",
          door: true,
          isOpenStatus: getValBoolean(fenster.value.gaesteWcRechts),
          windowSensorReachable: getAvailable(batterie.xioami_guest_toilet_right),
        },
      ],
    },
    {
      name: "Flur",
      shutter: false,
      windows: [
        {
          name: "links",
          isOpenStatus: getValBoolean(fenster.value.flurLinks),
          windowSensorReachable: getAvailable(batterie.xioami_floor_left),
        },
        {
          name: "rechts",
          isOpenStatus: getValBoolean(fenster.value.flurRechts),
          windowSensorReachable: getAvailable(batterie.xioami_floor_right),
        },
      ],
    },
    {
      name: "Abstellraum",
      shutter: false,
      windows: [
        {
          name: "",
          isOpenStatus: getValBoolean(fenster.value.abstellraumFenster),
          windowSensorReachable: getAvailable(batterie.xioami_store_window),
        },
      ],
    },
    {
      name: "Dachboden",
      shutter: false,
      windows: [
        {
          name: "left",
          isOpenStatus: getValBoolean(fenster.value.dachbodenLinks),
          windowSensorReachable: getAvailable(batterie.xioami_attic_left),
        },
        {
          name: "rechts",
          isOpenStatus: getValBoolean(fenster.value.dachbodenRechts),
          windowSensorReachable: getAvailable(batterie.xioami_attic_right),
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
