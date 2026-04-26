<script setup lang="ts">
import LightCard from "@/components/section/light/LightCard.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

const { lights, lightsAdditive } = useIobrokerStore();
</script>

<template>
  <Page title="Licht">
    <CardSubcard class="p-2 flex flex-wrap gap-1">
      <LightCard
        v-for="(light, i) in Object.keys(lights)"
        :key="i"
        :light="lights[light as keyof typeof lights]"
        :value-additive="lightsAdditive[light as keyof typeof lightsAdditive]?.val"
        :name="light"
      />
    </CardSubcard>
  </Page>
</template>
