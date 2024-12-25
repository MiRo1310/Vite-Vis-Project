<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import LightCard from "@/pages/LightCard.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { lightStates } from "@/subscribeIds/light.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";


useDynamicSubscribe(lightStates);

const { lights, lightsAdditive } = useIobrokerStore();
</script>

<template>
  <Card styling="blue">
    <CardHeader>
      <CardTitle>Licht</CardTitle>
    </CardHeader>
    <div class="p-2 flex flex-wrap space-x-1 -ml-1 -mt-1 space-y-1">
      <LightCard
        v-for="(light, i ) in Object.keys(lights)" :key="i" :light="lights[light as keyof typeof lights]"
        :value-additive="lightsAdditive[light as keyof typeof lightsAdditive]?.val"
        :name="light"
        :class="i===0? 'ml-1 mt-1':''"
      />
    </div>
  </Card>
</template>

<style scoped lang="postcss">
</style>
