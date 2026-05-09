<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { loadScript } from "@/lib/iobroker-service.js";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useTime } from "@/composables/time.ts";
import { socketIo } from "@/config/config.ts";
import { Toaster } from "@/components/ui/toast";
import { useColorMode } from "@vueuse/core";

useColorMode();

onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(socketIo);
});

onUnmounted(() => {
  useTime().clear();
});
</script>
<template>
  <Toaster />
  <router-view />
</template>
