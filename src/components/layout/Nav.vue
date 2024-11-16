<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Blinds, CalendarDays, Heater, Home, Info, Logs, PlugZap } from "lucide-vue-next";
import HomeActions from "@/components/section/home/HomeActions.vue";

const buttons = [
  {
    icon: Home,
    text: "Home",
    link: "/"
  },
  {
    icon: Blinds,
    text: "Rolladen Fenster",
    link: "/fenster"
  },
  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar"
  },
  // {
  //   icon: LampCeiling,
  //   text: "Licht",
  //   link: "/licht",
  // },
  // {
  //   icon: Plug,
  //   text: "Steckdosen",
  //   link: "/steckdosen",
  // },
  // {
  //   icon: Sun,
  //   text: "Wetter",
  //   link: "/wetter",
  // },
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
  }, {
    icon: Logs,
    text: "Logs",
    link: "/logs"
  }
  // {
  //   icon: WashingMachine,
  //   text: "Geräte",
  //   link: "/geraete",
  // },
  // {
  //   icon: Cctv,
  //   text: "Sicherheit",
  //   link: "/sicherheit",
  // },
];
</script>

<template>
  <div class="w-full flex">
    <router-link v-for="(button, index) in buttons" :key="index" :to="button.link">
      <Button
        variant="outline"
        class="w-16 h-16 mb-1 p-0 cursor-pointer mt-2 text-accent-foreground/80 ml-1 bg-backgroundCards border-none rounded-none"
      >
        <component :is="button.icon" class="w-10 h-10" />
      </Button>
    </router-link>
    <HomeActions />
  </div>
</template>
