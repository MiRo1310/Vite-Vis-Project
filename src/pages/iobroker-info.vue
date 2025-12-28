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
    <div class="iobroker-info">
      <IobrokerUpdates class="iobroker-info__updates" />
      <IobrokerNews />
    </div>
  </Page>
</template>

<style scoped lang="scss">
.iobroker-info {
  @apply flex flex-wrap space-x-1 space-y-1 -mt-1 -ml-1;

  &__updates {
    @apply mt-1 ml-1;
  }
}
</style>
