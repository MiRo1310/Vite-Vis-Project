<script setup lang="ts">
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { Blinds, UserRoundSearch, Hourglass, ListStart } from "lucide-vue-next";
import HomeShoppingCard from "@/components/section/HomeShoppingCard.vue";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { useRouter } from "vue-router";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";

const router = useRouter();
const iobrokerStore = useIobrokerStore();
const handleWindowClick = () => {
  router.push({ path: "/fenster" });
};
const handleHolidayClick = () => {
  adminConnection.value?.setState(
    "0_userdata.0.Urlaub.Urlaub_aktiv",
    !iobrokerStore.urlaubAktiv
  );
};
const getWindowStyle = computed(() => {
  if (iobrokerStore.fensterOffen) return "text-red-500";
  return "text-green-500";
});
const getHoliday = computed(() => {
  if (iobrokerStore.urlaubAktiv) return "Urlaub";
  return "Kein Urlaub";
});

const toggleTimer = () => {
  iobrokerStore.setValueToKey("showTimerCard", !iobrokerStore.showTimerCard);
};
</script>
<template>
  <ButtonCard :icon="Blinds" :title="'Fenster'" :class="getWindowStyle" @click="handleWindowClick" />
  <ButtonCard :icon="UserRoundSearch" :title="getHoliday" class="text-accent-foreground/70"
    @click="handleHolidayClick" />
  <HomeShoppingCard />
  <ButtonCard :icon="Hourglass" title="Timer" @click="toggleTimer" class="text-accent-foreground/70" />
  <a href="http://192.168.1.81:8082/vis/index.html?FireHD10#1_Startseite" target="_self" rel="noopener noreferrer">
    <ButtonCard :icon="ListStart" title="Alte VIS" class="text-accent-foreground/70" />
  </a>
</template>
