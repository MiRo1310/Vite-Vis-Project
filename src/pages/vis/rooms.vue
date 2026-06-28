<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { type RoomItems, type RoomType } from "@/types/types.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { notSubscribedIds } from "@/iobroker-states/action-states.iobroker";
import { computed, ref } from "vue";
import Page from "@/components/shared/page/Page.vue";
import RoomMinimal from "@/components/section/window/RoomMinimal.vue";
import WindowCard from "@/components/section/window/WindowCard.vue";
import { Button } from "@/components/shared/button/button.variants";
import DataCard from "@/components/shared/card/DataCard.vue";
import HeatingControlPeriod from "@/components/section/heating/HeatingControlPeriod.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roomNames } from "@/constants/constants.ts";

const iobrokerStore = useIobrokerStore();
const { iobroker } = iobrokerStore;

const rooms = computed((): RoomType[] => {
  const { kueche, esszimmer, wohnzimmer, schlafen, bad, abstellraumog, kinderzimmer, gaestezimmer } = notSubscribedIds;
  const { hmip, fenster, rolladen, shutterAutoUp, shutterAutoDownTime, batteries } = iobroker;

  return [
    {
      name: "Küche",
      shutter: true,
      batteryHeating: [batteries["HMIP Kueche"].lowBat],
      bellStatus: batteries.xioami_fensterkontakt_kueche_klingel.available,
      temp: [hmip.kitchen_valveActualTemp.value],
      windows: [
        {
          name: "Tür",
          door: true,
          isOpenStatus: fenster.kuecheTuer.value,
          shutterPosition: rolladen.kuecheTuerPosition.value,
          shutterAutoDown: shutterAutoDownTime.kuecheTuerAuto,
          shutterAutoUpTime: shutterAutoUp.kuecheTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.kuecheTuerAutoUp,
          shutterAutoDownDelay: shutterAutoDownTime.kuecheTuerDelay,
          idShutterPosition: kueche.shutterPositionDoor,
          windowSensorReachable: batteries.xioami_kitchen_door.available,
        },
        {
          name: "Fenster",
          idShutterPosition: kueche.shutterPositionWindow,
          shutterAutoUpTime: shutterAutoUp.kuecheFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.kuecheFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.kuecheFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.kuecheFensterDelay,
          isOpenStatus: fenster.kuecheFenster.value,
          shutterPosition: rolladen.kuecheFensterPosition.value,
          windowSensorReachable: batteries.xioami_kitchen_window.available,
        },
      ],
    },
    {
      name: "Esszimmer",
      shutter: true,
      batteryHeating: [batteries["HMIP Esszimmer"].lowBat],
      temp: [hmip.dining_valveActualTemp.value],
      windows: [
        {
          name: "links",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: fenster.esszimmerLinks.value,
          shutterPosition: rolladen.esszimmerLinksPosition.value,
          shutterAutoUpTime: shutterAutoUp.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.esszimmerLinksDelay,
          windowSensorReachable: batteries.xioami_diner_window_left.available,
        },
        {
          name: "rechts",
          idShutterPosition: esszimmer.shutterPosition,
          isOpenStatus: fenster.esszimmerRechts.value,
          shutterPosition: rolladen.esszimmerLinksPosition.value,
          shutterAutoUpTime: shutterAutoUp.esszimmerLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.esszimmerLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.esszimmerLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.esszimmerLinksDelay,
          windowSensorReachable: batteries.xioami_diner_window_right.available,
        },
      ],
    },
    {
      name: "Wohnzimmer",
      shutter: true,
      batteryHeating: [batteries["HMIP Wohnzimmer links"].lowBat, batteries["HMIP Wohnzimmer rechts"].lowBat],
      temp: [hmip.living_left_valveActualTemp.value, hmip.living_right_valveActualTemp.value],
      windows: [
        {
          name: "Ecke",
          idShutterPosition: wohnzimmer.shutterPositionCorner,
          isOpenStatus: fenster.wohnzimmerEcke.value,
          shutterPosition: rolladen.wohnzimmerEckePosition.value,
          shutterAutoUp: shutterAutoUp.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.wohnzimmerEckeDelay,
          windowSensorReachable: batteries.xioami_living_small.available,
        },
        {
          name: "links",
          idShutterPosition: wohnzimmer.shutterPositionLeft,
          isOpenStatus: fenster.wohnzimmerLinks.value,
          shutterPosition: rolladen.wohnzimmerLinksPosition.value,
          shutterAutoUp: shutterAutoUp.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.wohnzimmerEckeDelay,
          windowSensorReachable: batteries.xioami_living_left.available,
        },
        {
          name: "mitte",
          idShutterPosition: wohnzimmer.shutterPositionCenter,
          isOpenStatus: fenster.wohnzimmerMitte.value,
          shutterPosition: rolladen.wohnzimmerMittePosition.value,
          shutterAutoUp: shutterAutoUp.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.wohnzimmerEckeDelay,
          windowSensorReachable: batteries.xioami_living_center.available,
        },
        {
          name: "rechts",
          idShutterPosition: wohnzimmer.shutterPositionRight,
          isOpenStatus: fenster.wohnzimmerRechts.value,
          shutterPosition: rolladen.wohnzimmerRechtsPosition.value,
          shutterAutoUp: shutterAutoUp.wohnzimmerEckeAutoUp,
          shutterAutoUpTime: shutterAutoUp.wohnzimmerEckeAutoUpTime,
          shutterAutoDown: shutterAutoDownTime.wohnzimmerEckeAuto,
          shutterAutoDownDelay: shutterAutoDownTime.wohnzimmerEckeDelay,
          windowSensorReachable: batteries.xioami_living_right.available,
        },
      ],
    },

    {
      name: "Schlafzimmer",
      shutter: true,
      batteryHeating: [batteries["HMIP Schlafzimmer"].lowBat],
      temp: [hmip.sleeping_valveActualTemp.value],
      windows: [
        {
          name: "Fenster",
          idShutterPosition: schlafen.shutterPositionWindow,
          isOpenStatus: fenster.schlafenFenster.value,
          shutterPosition: rolladen.schlafenFensterPosition.value,
          shutterAutoUpTime: shutterAutoUp.schlafenFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.schlafenFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.schlafenFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.schlafenFensterDelay,
          windowSensorReachable: batteries.xioami_sleeping_window.available,
        },
        {
          name: "Tür",
          idShutterPosition: schlafen.shutterPositionDoor,
          door: true,
          isOpenStatus: fenster.schlafenTuer.value,
          shutterPosition: rolladen.schlafenTuerPosition.value,
          shutterAutoUpTime: shutterAutoUp.schlafenTuerAutoUpTime,
          shutterAutoUp: shutterAutoUp.schlafenTuerAutoUp,
          shutterAutoDown: shutterAutoDownTime.schlafenTuerAuto,
          shutterAutoDownDelay: shutterAutoDownTime.schlafenTuerDelay,
          windowSensorReachable: batteries.xioami_sleeping_door.available,
        },
      ],
    },

    {
      name: "Kinderzimmer",
      shutter: true,
      batteryHeating: [batteries["HMIP Kinderzimmer"].lowBat],
      temp: [hmip.children_valveActualTemp.value],
      windows: [
        {
          name: "",
          idShutterPosition: kinderzimmer.shutterPosition,
          isOpenStatus: fenster.kinderzimmerFenster.value,
          shutterPosition: rolladen.kinderzimmerFensterPosition.value,
          shutterAutoUpTime: shutterAutoUp.kinderzimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.kinderzimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.kinderzimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.kinderzimmerFensterDelay,
          windowSensorReachable: batteries.xioami_children_window.available,
        },
      ],
    },
    {
      name: "Bad",
      shutter: true,
      batteryHeating: [batteries["HMIP Bad"].lowBat],
      temp: [hmip.bath_valveActualTemp.value],
      windows: [
        {
          name: "",
          idShutterPosition: bad.shutterPosition,
          isOpenStatus: fenster.badFenster.value,
          shutterPosition: rolladen.badFensterPosition.value,
          shutterAutoUpTime: shutterAutoUp.badFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.badFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.badFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.badFensterDelay,
          windowSensorReachable: batteries.xioami_bath_window.available,
        },
      ],
    },
    {
      name: "Gästezimmer",
      shutter: true,
      batteryHeating: [batteries["HMIP Gaestezimmer"].lowBat],
      temp: [hmip.guest_valveActualTemp.value],
      windows: [
        {
          name: "",
          idShutterPosition: gaestezimmer.shutterPosition,
          isOpenStatus: fenster.gaestezimmerFenster.value,
          shutterPosition: rolladen.gaestezimmerFensterPosition.value,
          shutterAutoUpTime: shutterAutoUp.gaestezimmerFensterAutoUpTime,
          shutterAutoUp: shutterAutoUp.gaestezimmerFensterAutoUp,
          shutterAutoDown: shutterAutoDownTime.gaestezimmerFensterAuto,
          shutterAutoDownDelay: shutterAutoDownTime.gaestezimmerFensterDelay,
          windowSensorReachable: batteries.xioami_guest_window.available,
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
          isOpenStatus: fenster.abstellraumOgLinks.value,
          shutterPosition: rolladen.abstellraumOgLinksPosition.value,
          shutterAutoUpTime: shutterAutoUp.abstellraumOgLinksAutoUpTime,
          shutterAutoUp: shutterAutoUp.abstellraumOgLinksAutoUp,
          shutterAutoDown: shutterAutoDownTime.abstellraumOgLinksAuto,
          shutterAutoDownDelay: shutterAutoDownTime.abstellraumOgLinksDelay,
          windowSensorReachable: batteries.xioami_store_og_left.available,
        },
        {
          name: "rechts",
          idShutterPosition: abstellraumog.shutterPositionRight,
          isOpenStatus: fenster.abstellraumOgRechts.value,
          shutterPosition: rolladen.abstellraumOgRechtsPosition.value,
          shutterAutoUpTime: shutterAutoUp.abstellraumOgRechtsAutoUpTime,
          shutterAutoUp: shutterAutoUp.abstellraumOgRechtsAutoUp,
          shutterAutoDown: shutterAutoDownTime.abstellraumOgRechtsAuto,
          shutterAutoDownDelay: shutterAutoDownTime.abstellraumOgRechtsDelay,
          windowSensorReachable: batteries.xioami_store_og_right.available,
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
          isOpenStatus: fenster.haustuer.value,
          windowSensorReachable: batteries.xioami_housedoor_right.available,
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
          isOpenStatus: fenster.kellerTuer.value,
          windowSensorReachable: batteries.xioami_cellar_door.available,
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
          isOpenStatus: fenster.kellerFlurFenster.value,
          windowSensorReachable: batteries.xioami_cellar_stair_window.available,
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
          isOpenStatus: fenster.bueroFenster.value,
          windowSensorReachable: batteries.xioami_office_window.available,
        },
      ],
    },
    {
      name: "Gäste-WC",
      shutter: false,
      temp: [hmip.guest_wc_valveActualTemp.value],
      windows: [
        {
          name: "links",
          door: true,
          isOpenStatus: fenster.gaesteWcLinks.value,
          windowSensorReachable: batteries.xioami_guest_toilet_left.available,
        },
        {
          name: "rechts",
          door: true,
          isOpenStatus: fenster.gaesteWcRechts.value,
          windowSensorReachable: batteries.xioami_guest_toilet_right.available,
        },
      ],
    },
    {
      name: "Flur",
      shutter: false,
      windows: [
        {
          name: "links",
          isOpenStatus: fenster.flurLinks.value,
          windowSensorReachable: batteries.xioami_floor_left.available,
        },
        {
          name: "rechts",
          isOpenStatus: fenster.flurRechts.value,
          windowSensorReachable: batteries.xioami_floor_right.available,
        },
      ],
    },
    {
      name: "Abstellraum",
      shutter: false,
      windows: [
        {
          name: "",
          isOpenStatus: fenster.abstellraumFenster.value,
          windowSensorReachable: batteries.xioami_store_window.available,
        },
      ],
    },
    {
      name: "Dachboden",
      shutter: false,
      windows: [
        {
          name: "left",
          isOpenStatus: fenster.dachbodenLinks.value,
          windowSensorReachable: batteries.xioami_attic_left.available,
        },
        {
          name: "rechts",
          isOpenStatus: fenster.dachbodenRechts.value,
          windowSensorReachable: batteries.xioami_attic_right.available,
        },
      ],
    },
  ];
});

const selectedName = ref<string | null>(null);

const selectedRoom = computed(() => rooms.value.find((room) => room.name === selectedName.value));

const clickRoom = async (roomName: string) => {
  selectedName.value = roomName;

  if (roomNames.includes(roomName as RoomItems)) {
    iobroker.heatingControl.room.setState(roomName);
  }
};

const windowOpen = computed(() => iobroker.windowGlobal.fensterOffen.value);
</script>

<template>
  <Page v-if="!selectedRoom" title="Räume">
    <div class="space-y-3">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DataCard title="Fenster / Türen" content-class="flex items-center gap-1.5">
          <span :class="['h-2 w-2 rounded-full shrink-0', windowOpen ? 'bg-yellow-400' : 'bg-green-400']" />
          <span class="text-sm font-semibold">
            {{ getOpenWindows === 0 ? "alle zu" : getOpenWindows === 1 ? "1 offen" : `${getOpenWindows} offen` }}
          </span>
        </DataCard>
        <DataCard title="Sonnenuntergang">
          <span class="text-sm font-semibold">{{ iobroker.time?.sonnenuntergang?.val }}</span>
        </DataCard>
      </div>

      <div>
        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Räume</p>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          <RoomMinimal v-for="room in rooms" :room :key="room.name" @click-room="clickRoom" />
        </div>
      </div>
    </div>
  </Page>

  <Page v-if="selectedRoom" :title="selectedRoom.name">
    <template #header>
      <Button variant="outline" @click="selectedName = null">Zurück</Button>
    </template>
    <Tabs default-value="fenster">
      <TabsList class="mb-3">
        <TabsTrigger value="fenster">Fenster / Rolladen</TabsTrigger>
        <TabsTrigger value="heizung">Heizung</TabsTrigger>
      </TabsList>
      <TabsContent value="fenster" class="space-y-3">
        <WindowCard :window="selectedRoom" />
      </TabsContent>
      <TabsContent value="heizung" class="space-y-3">
        <HeatingControlPeriod />
      </TabsContent>
    </Tabs>
  </Page>
</template>
