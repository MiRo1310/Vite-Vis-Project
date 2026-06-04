<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import AirConditioner from "@/components/section/airConditioner/AirConditioner.vue";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();
const airConditioners = computed(() => iobroker.airConditioners);
</script>

<template>
  <Card styling="info">
    <CardHeader>
      <CardTitle>Klimageräte</CardTitle>
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
    </CardHeader>
  </Card>
</template>
