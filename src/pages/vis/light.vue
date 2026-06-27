<script setup lang="ts">
import LightCard from "@/components/section/light/LightCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Page from "@/components/shared/page/Page.vue";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <Page title="Licht">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      <LightCard
        v-for="(light, i) in Object.keys(iobroker.lights ?? {})"
        :key="i"
        :light="iobroker.lights?.[light as keyof typeof iobroker.lights]"
        :value-additive="light in iobroker.lightsAdditive ? iobroker.lightsAdditive[light as keyof typeof iobroker.lightsAdditive].value : false"
        :name="light"
      />
    </div>
  </Page>
</template>
