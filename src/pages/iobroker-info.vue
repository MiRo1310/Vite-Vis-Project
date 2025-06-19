<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import IobrokerUpdates from "@/components/section/iobroker/IobrokerUpdates.vue";
import IobrokerNews from "@/components/section/iobroker/IobrokerNews.vue";

useDynamicSubscribe(infoStates);
</script>

<template>
  <div class="iobroker-info">
    <IobrokerUpdates class="iobroker-info__updates" />
    <IobrokerNews />
  </div>
</template>

<style scoped lang="scss">
.iobroker-info {
  @apply flex flex-wrap space-x-1 space-y-1 -mt-1 -ml-1;

  &__updates {
    @apply mt-1 ml-1;
  }
}
</style>
