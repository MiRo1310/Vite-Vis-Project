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
import { getActiveLights } from "@/composables/lights.ts";
import { routes } from "@/router/routes.ts";

const navigations = computed((): NavigationType[] => [
  { icon: Home, text: "Home", to: routes.home.path },
  {
    icon: Blinds,
    text: "Räume",
    to: routes.window.path,
    badges: [
      {
        value: getOpenWindows.value,
        color: "yellow",
      },
    ],
  },
  { icon: ScrollText, text: "Listen", to: routes.lists.path },

  {
    icon: CalendarDays,
    text: "Kalendar",
    to: routes.calender.path,
  },
  {
    icon: BatteryFull,
    text: "Batterie",
    to: routes.battery.path,
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
    to: routes.light.path,
    badges: [
      {
        value: getActiveLights.value,
        color: "yellow",
      },
    ],
  },
  {
    icon: CircleDot,
    text: "Alexa",
    to: routes.alexa.path,
  },
  {
    icon: Heater,
    text: "Heizung",
    to: routes.heating.path,
  },
  {
    icon: PlugZap,
    text: "PV",
    to: routes.pv.path,
  },
  {
    icon: Info,
    text: "Iobroker Info",
    to: routes.iobrokerInfo.path,
  },
  {
    icon: Logs,
    text: "Logs",
    to: routes.logs.path,
  },
  {
    icon: ChartSpline,
    text: "Diagramme",
    to: routes.diagrams.path,
  },
  {
    icon: Utensils,
    text: "Rezepte",
    to: routes.recipe.path,
  },
]);
</script>

<template>
  <DarkMode />
  <div class="navigation grid md:grid-cols-3 grid-cols-2 gap-2 mt-2">
    <template v-for="navigation in navigations" :key="navigation.to">
      <NavigationButton :navigation />
    </template>
  </div>
</template>
