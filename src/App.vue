<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { loadScript } from "@/lib/connecter-to-iobroker.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useTime } from "@/composables/time.ts";
import { socketIo } from "@/config/config.ts";
import { Toaster } from "@/components/ui/toast";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { batteryIds } from "@/subscribeIds/batteriesType.iobroker.js";
import { hmipIds } from "@/subscribeIds/hmip.iobroker.js";
import { useColorMode } from "@vueuse/core";
import { lightStates } from "@/subscribeIds/light.iobroker.js";
import { heating } from "@/subscribeIds/heating.iobroker.js";

useColorMode();

onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(socketIo);

  useDynamicSubscribe([batteryIds, hmipIds, ...lightStates, heating]);
});
onUnmounted(() => {
  useTime().clear();
});
</script>
<template>
  <Toaster />
  <router-view />
</template>
