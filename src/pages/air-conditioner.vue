<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import AirConditioner from "@/components/section/airConditioner/AirConditioner.vue";

const { airConditioners } = storeToRefs(useIobrokerStore());
</script>

<template>
  <AirConditioner
    :online="airConditioners?.schlafenOnline?.val ?? false"
    title="Schlafzimmer"
    :power-wh="airConditioners?.schlafenPower?.val ?? 0"
    :temp-is="airConditioners?.schlafenIsTemp?.val ?? 0"
    :temp-set="airConditioners?.schlafenSetTemp"
    :power="airConditioners?.schlafenPowerStatus"
  />
  <AirConditioner
    :online="airConditioners?.childOnline?.val ?? false"
    title="Kinderzimmer"
    :power-wh="airConditioners?.childPower?.val ?? 0"
    :temp-is="airConditioners?.childIsTemp?.val ?? 0"
    :temp-set="airConditioners?.childSetTemp"
    :power="airConditioners?.childPowerStatus"
  />
</template>

<style scoped lang="scss"></style>
