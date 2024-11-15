<script setup lang="ts">
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { Blinds, Hourglass, UserRoundSearch } from "lucide-vue-next";
import HomeShoppingCard from "@/components/section/home/HomeShoppingCard.vue";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { useRouter } from "vue-router";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker.ts";

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
  <ButtonCard
    :icon="Blinds" :title="'Fenster'" :class="getWindowStyle" class-card="mt-2 ml-2"
    @click="handleWindowClick"
  />
  <ButtonCard
    :icon="UserRoundSearch" :title="getHoliday" class="text-accent-foreground/70"
    @click="handleHolidayClick"
  />
  <HomeShoppingCard />
  <ButtonCard :icon="Hourglass" title="Timer" class="text-accent-foreground/70" @click="toggleTimer" />
</template>
