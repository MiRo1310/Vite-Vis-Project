<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { RoomItems, RoomType } from "@/types/types.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { notSubscribedIds } from "@/iobroker-states/states-not-subscribed/states.iobroker";
import { computed, ref } from "vue";
import Page from "@/components/shared/page/Page.vue";
import RoomMinimal from "@/components/section/window/RoomMinimal.vue";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { updateRoomInHeatingControl } from "@/composables/heatingControl.ts";
import { BatteriesTypeIobroker, XiaomiWindowSensor } from "@/iobroker-states/states-subscribed/batteriesType.iobroker";
import { Button } from "@/components/shared/button/button.variants";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { roomNames } from "@/constants/constants.ts";

const iobrokerStore = useIobrokerStore();

const { windowGlobal, time, fenster, rolladen, shutterAutoDownTime, shutterAutoUp, batteries, hmip } = storeToRefs(iobrokerStore);

const getAvailable = (val?: XiaomiWindowSensor) => val?.available;

const rooms = computed((): RoomType[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  const batterie: BatteriesTypeIobroker | undefined = batteries.value;
  if (!batterie) {
    return [];
  }
  return [
    {
      name: "Küche",
      shutter: true,
      batteryHeating: [batterie["HMIP Kueche"]?.lowBat],
      bellStatus: getAvailable(batterie.xioami_fensterkontakt_kueche_klingel),
      temp: [getStoreValNumber(hmip.value.kitchen_valveActualTemp)],
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster.value.kuecheTuer),
          shutterPosition: getStoreValNumber(rolladen.value.kuecheTuerPosition),
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
          isOpenStatus: getStoreValBoolean(fenster.value.kuecheFenster),
          shutterPosition: getStoreValNumber(rolladen.value.kuecheFensterPosition),
          windowSensorReachable: getAvailable(batterie.xioami_kitchen_window),
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Esszimmer"]?.lowBat],
      temp: [getStoreValNumber(hmip.value.dining_valveActualTemp)],
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster.value.esszimmerLinks),
          shutterPosition: getStoreValNumber(rolladen.value.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.esszimmerLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_diner_window_left),
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster.value.esszimmerRechts),
          shutterPosition: getStoreValNumber(rolladen.value.esszimmerLinksPosition),
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
      temp: [getStoreValNumber(hmip.value.living_left_valveActualTemp), getStoreValNumber(hmip.value.living_right_valveActualTemp)],
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: getStoreValBoolean(fenster.value.wohnzimmerEcke),
          shutterPosition: getStoreValNumber(rolladen.value.wohnzimmerEckePosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_small),
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: getStoreValBoolean(fenster.value.wohnzimmerLinks),
          shutterPosition: getStoreValNumber(rolladen.value.wohnzimmerLinksPosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_left),
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: getStoreValBoolean(fenster.value.wohnzimmerMitte),
          shutterPosition: getStoreValNumber(rolladen.value.wohnzimmerMittePosition),
          shutterAutoUp: shutterAutoUp.value.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.value.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.value.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_center),
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: getStoreValBoolean(fenster.value.wohnzimmerRechts),
          shutterPosition: getStoreValNumber(rolladen.value.wohnzimmerRechtsPosition),
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
      temp: [getStoreValNumber(hmip.value.sleeping_valveActualTemp)],
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: getStoreValBoolean(fenster.value.schlafenFenster),
          shutterPosition: getStoreValNumber(rolladen.value.schlafenFensterPosition),
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
          isOpenStatus: getStoreValBoolean(fenster.value.schlafenTuer),
          shutterPosition: getStoreValNumber(rolladen.value.schlafenTuerPosition),
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
      temp: [getStoreValNumber(hmip.value.children_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster.value.kinderzimmerFenster),
          shutterPosition: getStoreValNumber(rolladen.value.kinderzimmerFensterPosition),
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
      temp: [getStoreValNumber(hmip.value.bath_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster.value.badFenster),
          shutterPosition: getStoreValNumber(rolladen.value.badFensterPosition),
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
      temp: [getStoreValNumber(hmip.value.guest_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster.value.gaestezimmerFenster),
          shutterPosition: getStoreValNumber(rolladen.value.gaestezimmerFensterPosition),
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
          isOpenStatus: getStoreValBoolean(fenster.value.abstellraumOgLinks),
          shutterPosition: getStoreValNumber(rolladen.value.abstellraumOgLinksPosition),
          shutterAutoUpTime: shutterAutoUp.value.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.value.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.value.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.value.abstellraumOgLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_store_og_left),
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: getStoreValBoolean(fenster.value.abstellraumOgRechts),
          shutterPosition: getStoreValNumber(rolladen.value.abstellraumOgRechtsPosition),
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
          isOpenStatus: getStoreValBoolean(fenster.value.haustuer),
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
          isOpenStatus: getStoreValBoolean(fenster.value.kellerTuer),
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
          isOpenStatus: getStoreValBoolean(fenster.value.kellerFlurFenster),
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
          isOpenStatus: getStoreValBoolean(fenster.value.bueroFenster),
          windowSensorReachable: getAvailable(batterie.xioami_office_window),
        },
      ],
    },
    {
      name: "Gäste-WC",
      shutter: false,
      temp: [getStoreValNumber(hmip.value.guest_wc_valveActualTemp)],
      windows: [
        {
          name: "links",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster.value.gaesteWcLinks),
          windowSensorReachable: getAvailable(batterie.xioami_guest_toilet_left),
        },
        {
          name: "rechts",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster.value.gaesteWcRechts),
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
          isOpenStatus: getStoreValBoolean(fenster.value.flurLinks),
          windowSensorReachable: getAvailable(batterie.xioami_floor_left),
        },
        {
          name: "rechts",
          isOpenStatus: getStoreValBoolean(fenster.value.flurRechts),
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
          isOpenStatus: getStoreValBoolean(fenster.value.abstellraumFenster),
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
          isOpenStatus: getStoreValBoolean(fenster.value.dachbodenLinks),
          windowSensorReachable: getAvailable(batterie.xioami_attic_left),
        },
        {
          name: "rechts",
          isOpenStatus: getStoreValBoolean(fenster.value.dachbodenRechts),
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
    <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1">
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
