<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { UserRoundSearch } from "lucide-vue-next";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const iobrokerStore = useIobrokerStore();

const handleHolidayClick = () => {
  adminConnection?.setState("0_userdata.0.Urlaub.Urlaub_aktiv", !iobrokerStore.holiday.urlaubAktiv?.val);
};

const getHoliday = computed(() => (iobrokerStore.holiday.urlaubAktiv?.val ? "Urlaub" : "Kein Urlaub"));
</script>

<template>
  <Button class="text-accent-foreground/70" class-card=" ml-1" @click="handleHolidayClick"><UserRoundSearch /> {{ getHoliday }}</Button>
</template>
