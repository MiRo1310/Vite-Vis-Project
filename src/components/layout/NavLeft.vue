<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

import {
  Home,
  Blinds,
  LampCeiling,
  Plug,
  Sun,
  Heater,
  PlugZap,
  WashingMachine,
  Cctv,
  CalendarDays,
} from "lucide-vue-next";
import HomeCardInfoTime from "@/components/layout/NavLeftTime.vue";

const buttons = [
  {
    icon: Home,
    text: "Home",
    link: "/",
  },
  {
    icon: Blinds,
    text: "Rolladen Fenster",
    link: "/fenster",
  },
  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar",
  },
  {
    icon: LampCeiling,
    text: "Licht",
    link: "/licht",
  },
  {
    icon: Plug,
    text: "Steckdosen",
    link: "/steckdosen",
  },
  {
    icon: Sun,
    text: "Wetter",
    link: "/wetter",
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
    icon: WashingMachine,
    text: "Geräte",
    link: "/geraete",
  },
  {
    icon: Cctv,
    text: "Sicherheit",
    link: "/sicherheit",
  },
];
</script>

<template>
  <div class="w-full">
    <HomeCardInfoTime />
    <router-link v-for="(button, index) in buttons" :key="index" :to="button.link">
      <Button variant="outline"
        class="justify-start w-full mb-2 cursor-pointer h-12 text-accent-foreground/80 rounded-xl">
        <component :is="button.icon" class="w-4 h-4" /><span class="ml-2">{{
          button.text
        }}</span>
      </Button>
    </router-link>
  </div>
</template>
