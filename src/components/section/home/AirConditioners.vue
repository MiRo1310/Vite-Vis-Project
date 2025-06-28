<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import AirConditioner from "@/components/section/airConditioner/AirConditioner.vue";

const { airConditioners } = storeToRefs(useIobrokerStore());
</script>

<template>
  <Card styling="light">
    <CardHeader>
      <CardTitle>Klimageräte</CardTitle>
      <AirConditioner
        :online="airConditioners?.schlafenOnline?.val ?? false"
        title="Schlafzimmer"
        :power-wh="airConditioners?.schlafenPower?.val ?? 0"
        :temp-is="airConditioners?.schlafenIsTemp?.val ?? 0"
        :temp-set="airConditioners?.schlafenSetTemp"
      />
      <AirConditioner
        :online="airConditioners?.childOnline?.val ?? false"
        title="Kinderzimmer"
        :power-wh="airConditioners?.childPower?.val ?? 0"
        :temp-is="airConditioners?.childIsTemp?.val ?? 0"
        :temp-set="airConditioners?.childSetTemp"
      />
    </CardHeader>
  </Card>
</template>
