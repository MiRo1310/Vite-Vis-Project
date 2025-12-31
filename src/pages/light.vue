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
    <div class="p-2 flex flex-wrap gap-1">
      <LightCard
        v-for="(light, i) in Object.keys(lights)"
        :key="i"
        :light="lights[light as keyof typeof lights]"
        :value-additive="lightsAdditive[light as keyof typeof lightsAdditive]?.val"
        :name="light"
      />
    </div>
  </Page>
</template>
