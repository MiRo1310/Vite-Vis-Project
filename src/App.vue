<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { loadScript } from "@/lib/connecter-to-iobroker.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { useTime } from "@/composables/time.ts";
import { IOBROKER_ADMIN_PORT, IOBROKER_HOST } from "@/config/config.ts";
import { Toaster } from "@/components/ui/toast";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { batteryIds } from "@/subscribeIds/batteriesType.ts";
import { hmipIds } from "@/subscribeIds/hmip.ts";
import { useColorMode } from "@vueuse/core";

useColorMode();

onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`);

  useDynamicSubscribe([batteryIds, hmipIds]);
});

onUnmounted(() => {
  useTime().clear();
});
</script>
<template>
  <Toaster />
  <router-view />
</template>
