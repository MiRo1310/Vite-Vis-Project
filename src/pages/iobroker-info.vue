<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import IobrokerUpdates from "@/components/section/iobroker/IobrokerUpdates.vue";
import IobrokerNews from "@/components/section/iobroker/IobrokerNews.vue";
import Page from "@/components/shared/page/Page.vue";

useDynamicSubscribe(infoStates);
</script>

<template>
  <Page title="IoBroker">
    <div class="flex flex-wrap gap-1">
      <IobrokerUpdates class="mt-1 ml-1" />
      <IobrokerNews />
    </div>
  </Page>
</template>
