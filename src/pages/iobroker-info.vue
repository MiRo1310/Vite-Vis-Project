<script setup lang="ts">
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/lib/iobroker/ids-to-subscribe/info.ts";
import IobrokerUpdates from "@/components/section/iobroker/IobrokerUpdates.vue";
import IobrokerNews from "@/components/section/iobroker/IobrokerNews.vue";

useDynamicSubscribe(infoStates);


</script>

<template>
  <div class="pt-2 flex space-x-2 space-y-2 -mt-2 pr-2">
    <IobrokerUpdates class="mt-2 " />
    <IobrokerNews class="mt-2 " />
  </div>
</template>
