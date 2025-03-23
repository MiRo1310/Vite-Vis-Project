<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {
  BatteryFull,
  CalendarDays,
  CircleDot,
  Heater,
  Home,
  Info,
  LampCeiling,
  Logs,
  PlugZap,
  Utensils
} from "lucide-vue-next";
import NavActions from "@/components/layout/NavActions.vue";
import { FunctionalComponent } from "vue";

interface Buttons {
  icon: FunctionalComponent;
  text: string;
  link: string;
  externalLink?: boolean;
}

const buttons: Buttons[] = [
  {
    icon: Home,
    text: "Home",
    link: "/"
  },
  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar"
  },
  {
    icon: BatteryFull,
    text: "Battery",
    link: "/battery"
  },
  {
    icon: LampCeiling,
    text: "Licht",
    link: "/light"
  },
  {
    icon: CircleDot,
    text: "Alexa",
    link: "/alexa"
  },
  {
    icon: Heater,
    text: "Heizung",
    link: "/heating"
  },
  {
    icon: PlugZap,
    text: "PV",
    link: "/pv"
  },
  {
    icon: Info,
    text: "Iobroker Info",
    link: "/iobroker-info"
  },
  {
    icon: Logs,
    text: "Logs",
    link: "/logs"
  },
  {
    icon: Utensils,
    text: "Rezepte",
    link: "http://192.168.1.13/",
    externalLink: true
  }
];
</script>

<template>
  <div class="nav">
    <div v-for="(button, index) in buttons" :key="index">
      <router-link v-if="!button.externalLink" :to="button.link">
        <Button
          variant="outline"
          class="nav__button"
        >
          <component :is="button.icon" class="nav__button-icon" />
        </Button>
      </router-link>
      <Button
        v-else variant="outline"
        as="div"
        class="nav__button"
      >
        <a :href="button.link" target="_self" rel="noopener noreferrer">
          <component :is="button.icon" class="nav__button-icon" />
        </a>
      </Button>
    </div>
    <NavActions />
  </div>
</template>

<style scoped lang="scss">
.nav {
  @apply w-full flex;

  &__button {
    @apply w-16 h-16 mb-1 p-0 cursor-pointer mt-1 text-accent-foreground/80 ml-1 bg-color__default border-none rounded-none
  }

  &__button-icon {
    @apply w-10 h-10
  }
}
</style>
