<script setup lang="ts">
import LightCard from "@/components/section/light/LightCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <Page title="Licht">
    <CardSubcard class="p-2 flex flex-wrap gap-1">
      <LightCard
        v-for="(light, i) in Object.keys(iobroker.lights ?? {})"
        :key="i"
        :light="iobroker.lights?.[light as keyof typeof iobroker.lights]"
        :value-additive="iobroker.lightsAdditive?.[light as keyof typeof iobroker.lightsAdditive]?.val"
        :name="light"
      />
    </CardSubcard>
  </Page>
</template>
