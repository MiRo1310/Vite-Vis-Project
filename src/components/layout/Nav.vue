<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { BatteryFull, CalendarDays, CircleDot, Heater, Home, Info, Logs, PlugZap } from "lucide-vue-next";
import NavActions from "@/components/layout/NavActions.vue";

const buttons = [
  {
    icon: Home,
    text: "Home",
    link: "/"
  },
  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar"
  }, {
    icon: BatteryFull,
    text: "Battery",
    link: "/battery"
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
        class="w-16 h-16 mb-1 p-0 cursor-pointer mt-1 text-accent-foreground/80 ml-1 bg-backgroundCards border-none rounded-none"
      >
        <component :is="button.icon" class="w-10 h-10" />
      </Button>
    </router-link>
    <NavActions />
  </div>
</template>
