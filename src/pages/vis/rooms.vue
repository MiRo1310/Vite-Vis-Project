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
const { iobroker } = iobrokerStore;

const { batteries } = storeToRefs(iobrokerStore);

const getAvailable = (val?: XiaomiWindowSensor) => val?.available;

// eslint-disable-next-line complexity
const rooms = computed((): RoomType[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  const { hmip, fenster, rolladen, shutterAutoUp, shutterAutoDownTime } = iobroker;
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
      temp: [getStoreValNumber(hmip?.kitchen_valveActualTemp)],
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster?.kuecheTuer),
          shutterPosition: getStoreValNumber(rolladen?.kuecheTuerPosition),
          shutterAutoDown: shutterAutoDownTime?.kuecheTuerAuto,
          shutterAutoUpTime: shutterAutoUp?.kuecheTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp?.kuecheTuerAutoUp,
          shutterAutoDownDelay: shutterAutoDownTime?.kuecheTuerDelay,
          idShutterPosition: kueche.shutterPositionDoor,
          windowSensorReachable: getAvailable(batterie.xioami_kitchen_door),
        },
        {
          name: "Fenster",
          idShutterPosition: kueche.shutterPositionWindow,
          shutterAutoUpTime: shutterAutoUp?.kuecheFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp?.kuecheFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime?.kuecheFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.kuecheFensterDelay,
          isOpenStatus: getStoreValBoolean(fenster?.kuecheFenster),
          shutterPosition: getStoreValNumber(rolladen?.kuecheFensterPosition),
          windowSensorReachable: getAvailable(batterie.xioami_kitchen_window),
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Esszimmer"]?.lowBat],
      temp: [getStoreValNumber(hmip?.dining_valveActualTemp)],
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster?.esszimmerLinks),
          shutterPosition: getStoreValNumber(rolladen?.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp?.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp?.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime?.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.esszimmerLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_diner_window_left),
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster?.esszimmerRechts),
          shutterPosition: getStoreValNumber(rolladen?.esszimmerLinksPosition),
          shutterAutoUpTime: shutterAutoUp?.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp?.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime?.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.esszimmerLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_diner_window_right),
        },
      ],
    },
    {
      name: "Wohnzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Wohnzimmer links"]?.lowBat, batterie["HMIP Wohnzimmer rechts"]?.lowBat],
      temp: [getStoreValNumber(hmip?.living_left_valveActualTemp), getStoreValNumber(hmip?.living_right_valveActualTemp)],
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: getStoreValBoolean(fenster?.wohnzimmerEcke),
          shutterPosition: getStoreValNumber(rolladen?.wohnzimmerEckePosition),
          shutterAutoUp: shutterAutoUp?.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp?.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime?.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_small),
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: getStoreValBoolean(fenster?.wohnzimmerLinks),
          shutterPosition: getStoreValNumber(rolladen?.wohnzimmerLinksPosition),
          shutterAutoUp: shutterAutoUp?.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp?.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime?.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_left),
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: getStoreValBoolean(fenster?.wohnzimmerMitte),
          shutterPosition: getStoreValNumber(rolladen?.wohnzimmerMittePosition),
          shutterAutoUp: shutterAutoUp?.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp?.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime?.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_center),
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: getStoreValBoolean(fenster?.wohnzimmerRechts),
          shutterPosition: getStoreValNumber(rolladen?.wohnzimmerRechtsPosition),
          shutterAutoUp: shutterAutoUp?.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp?.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime?.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.wohnzimmerEckeDelay,
          windowSensorReachable: getAvailable(batterie.xioami_living_right),
        },
      ],
    },

    {
      name: "Schlafzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Schlafzimmer"]?.lowBat],
      temp: [getStoreValNumber(hmip?.sleeping_valveActualTemp)],
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: getStoreValBoolean(fenster?.schlafenFenster),
          shutterPosition: getStoreValNumber(rolladen?.schlafenFensterPosition),
          shutterAutoUpTime: shutterAutoUp?.schlafenFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp?.schlafenFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime?.schlafenFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.schlafenFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_sleeping_window),
        },
        {
          name: "Tür",
          idShutterPosition: schlafen.shutterPositionDoor,
          door: true,
          isOpenStatus: getStoreValBoolean(fenster?.schlafenTuer),
          shutterPosition: getStoreValNumber(rolladen?.schlafenTuerPosition),
          shutterAutoUpTime: shutterAutoUp?.schlafenTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp?.schlafenTuerAutoUp,
          shutterAutoDown: shutterAutoDownTime?.schlafenTuerAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.schlafenTuerDelay,
          windowSensorReachable: getAvailable(batterie.xioami_sleeping_door),
        },
      ],
    },

    {
      name: "Kinderzimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Kinderzimmer"]?.lowBat],
      temp: [getStoreValNumber(hmip?.children_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster?.kinderzimmerFenster),
          shutterPosition: getStoreValNumber(rolladen?.kinderzimmerFensterPosition),
          shutterAutoUpTime: shutterAutoUp?.kinderzimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp?.kinderzimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime?.kinderzimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.kinderzimmerFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_children_window),
        },
      ],
    },
    {
      name: "Bad",
      shutter: true,
      batteryHeating: [batterie["HMIP Bad"]?.lowBat],
      temp: [getStoreValNumber(hmip?.bath_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster?.badFenster),
          shutterPosition: getStoreValNumber(rolladen?.badFensterPosition),
          shutterAutoUpTime: shutterAutoUp?.badFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp?.badFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime?.badFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.badFensterDelay,
          windowSensorReachable: getAvailable(batterie.xioami_bath_window),
        },
      ],
    },
    {
      name: "Gästezimmer",
      shutter: true,
      batteryHeating: [batterie["HMIP Gaestezimmer"]?.lowBat],
      temp: [getStoreValNumber(hmip?.guest_valveActualTemp)],
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: getStoreValBoolean(fenster?.gaestezimmerFenster),
          shutterPosition: getStoreValNumber(rolladen?.gaestezimmerFensterPosition),
          shutterAutoUpTime: shutterAutoUp?.gaestezimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp?.gaestezimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime?.gaestezimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.gaestezimmerFensterDelay,
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
          isOpenStatus: getStoreValBoolean(fenster?.abstellraumOgLinks),
          shutterPosition: getStoreValNumber(rolladen?.abstellraumOgLinksPosition),
          shutterAutoUpTime: shutterAutoUp?.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp?.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime?.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.abstellraumOgLinksDelay,
          windowSensorReachable: getAvailable(batterie.xioami_store_og_left),
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: getStoreValBoolean(fenster?.abstellraumOgRechts),
          shutterPosition: getStoreValNumber(rolladen?.abstellraumOgRechtsPosition),
          shutterAutoUpTime: shutterAutoUp?.abstellraumOgRechtsAutoUpTime,
          shutterAutoUp: shutterAutoUp?.abstellraumOgRechtsAutoUp,
          shutterAutoDown: shutterAutoDownTime?.abstellraumOgRechtsAuto,
          shutterAutoDownDelay: shutterAutoDownTime?.abstellraumOgRechtsDelay,
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
          isOpenStatus: getStoreValBoolean(fenster?.haustuer),
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
          isOpenStatus: getStoreValBoolean(fenster?.kellerTuer),
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
          isOpenStatus: getStoreValBoolean(fenster?.kellerFlurFenster),
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
          isOpenStatus: getStoreValBoolean(fenster?.bueroFenster),
          windowSensorReachable: getAvailable(batterie.xioami_office_window),
        },
      ],
    },
    {
      name: "Gäste-WC",
      shutter: false,
      temp: [getStoreValNumber(hmip?.guest_wc_valveActualTemp)],
      windows: [
        {
          name: "links",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster?.gaesteWcLinks),
          windowSensorReachable: getAvailable(batterie.xioami_guest_toilet_left),
        },
        {
          name: "rechts",
          door: true,
          isOpenStatus: getStoreValBoolean(fenster?.gaesteWcRechts),
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
          isOpenStatus: getStoreValBoolean(fenster?.flurLinks),
          windowSensorReachable: getAvailable(batterie.xioami_floor_left),
        },
        {
          name: "rechts",
          isOpenStatus: getStoreValBoolean(fenster?.flurRechts),
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
          isOpenStatus: getStoreValBoolean(fenster?.abstellraumFenster),
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
          isOpenStatus: getStoreValBoolean(fenster?.dachbodenLinks),
          windowSensorReachable: getAvailable(batterie.xioami_attic_left),
        },
        {
          name: "rechts",
          isOpenStatus: getStoreValBoolean(fenster?.dachbodenRechts),
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

const windowOpen = computed(() => getStoreValBoolean(iobroker.windowGlobal?.fensterOffen));
</script>

<template>
  <Page v-if="!selectedRoom" title="Räume">
    <div class="flex justify-between items-center mb-4">
      <p v-show="getOpenWindows === 1" class="text-muted-foreground">
        Ein Fenster oder eine Tür ist
        <span :class="windowOpen ? 'text-red-500 animate-pulse' : ''" class="ml-1">offen </span>
      </p>

      <p v-show="getOpenWindows !== 1" class="text-foreground">
        Fenster / Türen sind
        <span :class="{ 'text-red-500 animate-pulse': windowOpen }">{{ windowOpen ? "offen" : "geschlossen" }}</span>
      </p>

      <p>Sonnenuntergang: {{ iobroker.time?.sonnenuntergang?.val }}</p>
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
