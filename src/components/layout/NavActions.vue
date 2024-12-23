<script setup lang="ts">
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { Blinds, Hourglass, UserRoundSearch } from "lucide-vue-next";
import NavActionsShoppingCard from "@/components/layout/NavActionsShopping.vue";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { useRouter } from "vue-router";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { useAppStore } from "@/store/appStore.ts";

const appStore = useAppStore();
const router = useRouter();
const iobrokerStore = useIobrokerStore();
const handleWindowClick = () => {
  router.push({ path: "/fenster" });
};
const handleHolidayClick = () => {
  adminConnection?.setState(
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

</script>
<template>
  <ButtonCard
    :icon="Blinds" :class="getWindowStyle" class-card="ml-1"
    @click="handleWindowClick"
  />
  <ButtonCard
    :icon="UserRoundSearch" :title="getHoliday" class="text-accent-foreground/70 " class-card=" ml-1"
    @click="handleHolidayClick"
  />
  <NavActionsShoppingCard />
  <ButtonCard
    :icon="Hourglass" class="text-accent-foreground/70" class-card="ml-1"
    @click="appStore.toggleTimerVisibility"
  />
</template>
