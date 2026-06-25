<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import Button from "@/components/shared/button/Button.vue";
import { UserRoundSearch } from "lucide-vue-next";
import { ioBrokerService } from "@/lib/io-broker-service.ts";

const { iobroker } = useIobrokerStore();

const handleHolidayClick = () => {
  ioBrokerService.connection?.setState("0_userdata.0.Urlaub.Urlaub_aktiv", !iobroker.holiday?.urlaubAktiv?.val);
};

const getHoliday = computed(() => (iobroker.holiday?.urlaubAktiv?.val ? "Urlaub" : "Kein Urlaub"));
</script>

<template>
  <div></div>
  <Button class="text-accent-foreground/70 h-full max-h-20 flex-1" @click="handleHolidayClick"><UserRoundSearch /> {{ getHoliday }}</Button>
</template>
