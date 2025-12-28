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

const navigations = computed((): NavigationType[] => [
  { icon: Home, text: "Home", link: "/" },
  {
    icon: Blinds,
    text: "Räume",
    link: "/fenster",
    badge: {
      value: getOpenWindows.value,
      color: "yellow",
    },
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
    badge: {
      value: batteryList.value.reduce(
        (prev, curr) => prev + (curr.lowBat || (curr?.timestamp && curr?.timestamp < new Date().getTime() - 30 * 60 * 60 * 1000) ? 1 : 0),
        0,
      ),
      color: "red",
    },
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
  <div class="navigation">
    <template v-for="navigation in navigations" :key="navigation.link">
      <NavigationButton :navigation />
    </template>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply grid grid-cols-3 gap-1;
}
</style>
