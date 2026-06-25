<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import AirConditioner from "@/components/section/airConditioner/AirConditioner.vue";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();
const airConditioners = computed(() => iobroker.airConditioners);
</script>

<template>
  <AirConditioner
    :online="airConditioners.schlafenOnline.value"
    title="Schlafzimmer"
    :power-wh="airConditioners.schlafenPower.value"
    :temp-is="airConditioners.schlafenIsTemp.value"
    :temp-set="airConditioners.schlafenSetTemp"
    :power="airConditioners.schlafenPowerStatus"
  />
  <AirConditioner
    :online="airConditioners?.childOnline?.val ?? false"
    title="Kinderzimmer"
    :power-wh="airConditioners.childPower.value"
    :temp-is="airConditioners.childIsTemp.value"
    :temp-set="airConditioners.childSetTemp"
    :power="airConditioners.childPowerStatus"
  />
</template>
