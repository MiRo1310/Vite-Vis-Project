<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import LightCard from "@/components/section/light/LightCard.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { lightStates } from "@/subscribeIds/light.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";


useDynamicSubscribe(lightStates);

const { lights, lightsAdditive } = useIobrokerStore();
</script>

<template>
  <Card styling="light" class="card">
    <CardHeader>
      <CardTitle>Licht</CardTitle>
    </CardHeader>
    <div class="light__container">
      <LightCard
        v-for="(light, i ) in Object.keys(lights)" :key="i" :light="lights[light as keyof typeof lights]"
        :value-additive="lightsAdditive[light as keyof typeof lightsAdditive]?.val"
        :name="light"
        class="light__card"
      />
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.card {
  @apply h-full
}

.light__container {
  @apply p-2 flex flex-wrap space-x-1 -ml-1 -mt-1 space-y-1
}

.light__card:nth-child(1) {
  @apply ml-1 mt-1
}
</style>
