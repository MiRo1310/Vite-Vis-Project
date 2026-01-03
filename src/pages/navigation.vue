<script setup lang="ts">
import NavigationButton from "@/components/layout/NavigationButton.vue";
import {
  BatteryFull,
  Blinds,
  CalendarDays,
  ChartSpline,
  CircleDot,
  Heater,
  Home,
  Info,
  LampCeiling,
  Logs,
  PlugZap,
  ScrollText,
  Utensils,
} from "lucide-vue-next";
import { NavigationType } from "@/types/types.ts";
import { batteryList } from "@/composables/battery.ts";
import { computed } from "vue";
import { getOpenWindows } from "@/composables/windows.ts";
import DarkMode from "@/components/layout/DarkMode.vue";

const navigations = computed((): NavigationType[] => [
  { icon: Home, text: "Home", link: "/" },
  {
    icon: Blinds,
    text: "Räume",
    link: "/fenster",
    badges: [
      {
        value: getOpenWindows.value,
        color: "yellow",
      },
    ],
  },
  { icon: ScrollText, text: "Listen", link: "/listen" },

  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar",
  },
  {
    icon: BatteryFull,
    text: "Batterie",
    link: "/battery",
    badges: [
      {
        value: batteryList.value.reduce((prev, curr) => prev + (curr.lowBat ? 1 : 0), 0),
        color: "orange",
      },
      {
        value: batteryList.value.reduce(
          (prev, curr) => prev + (curr?.timestamp && curr?.timestamp < new Date().getTime() - 30 * 60 * 60 * 1000 ? 1 : 0),
          0,
        ),
        color: "red",
        class: "animate-pulse",
      },
    ],
  },
  {
    icon: LampCeiling,
    text: "Licht",
    link: "/light",
  },
  {
    icon: CircleDot,
    text: "Alexa",
    link: "/alexa",
  },
  {
    icon: Heater,
    text: "Heizung",
    link: "/heating",
  },
  {
    icon: PlugZap,
    text: "PV",
    link: "/pv",
  },
  {
    icon: Info,
    text: "Iobroker Info",
    link: "/iobroker-info",
  },
  {
    icon: Logs,
    text: "Logs",
    link: "/logs",
  },
  {
    icon: ChartSpline,
    text: "Diagramme",
    link: "/diagrams",
  },
  {
    icon: Utensils,
    text: "Rezepte",
    link: "/rezepte",
  },
]);
</script>

<template>
  <DarkMode />
  <div class="navigation grid grid-cols-3 gap-2 mt-2">
    <template v-for="navigation in navigations" :key="navigation.link">
      <NavigationButton :navigation />
    </template>
  </div>
</template>
