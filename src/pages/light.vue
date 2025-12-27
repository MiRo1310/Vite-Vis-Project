<script setup lang="ts">
import LightCard from "@/components/section/light/LightCard.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { lightStates } from "@/subscribeIds/light.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import Page from "@/components/shared/page/Page.vue";

useDynamicSubscribe(lightStates);

const { lights, lightsAdditive } = useIobrokerStore();
</script>

<template>
  <Page title="Licht">
    <div class="light__container">
      <LightCard
        v-for="(light, i) in Object.keys(lights)"
        :key="i"
        :light="lights[light as keyof typeof lights]"
        :value-additive="lightsAdditive[light as keyof typeof lightsAdditive]?.val"
        :name="light"
        class="light__card"
      />
    </div>
  </Page>
</template>

<style scoped lang="postcss">
.light__container {
  @apply p-2 flex flex-wrap space-x-1 -ml-1 -mt-1 space-y-1;
}

.light__card:nth-child(1) {
  @apply ml-1 mt-1;
}
</style>
