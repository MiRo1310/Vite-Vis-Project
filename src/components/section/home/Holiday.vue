<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { UserRoundSearch } from "lucide-vue-next";
import { adminConnection } from "@/lib/iobroker-service.js";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

const handleHolidayClick = () => {
  adminConnection?.setState("0_userdata.0.Urlaub.Urlaub_aktiv", !iobroker.holiday?.urlaubAktiv?.val);
};

const getHoliday = computed(() => (iobroker.holiday?.urlaubAktiv?.val ? "Urlaub" : "Kein Urlaub"));
</script>

<template>
  <Button class="text-accent-foreground/70 h-16 flex-1" @click="handleHolidayClick"><UserRoundSearch /> {{ getHoliday }}</Button>
</template>
