<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useNotificationStore } from "@/store/notification-store.ts";
import { useTime } from "@/composables/time.ts";
import { socketIo } from "@/config/config.ts";
import { Toaster } from "@/components/ui/toast";
import { useColorMode } from "@vueuse/core";
import { ioBrokerService } from "@/lib/io-broker-service.ts";

useColorMode();

onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  useNotificationStore(); // Store vor dem ersten Socket-Callback initialisieren
  ioBrokerService.loadScript(socketIo);
});

onUnmounted(() => {
  useTime().clear();
});
</script>
<template>
  <Toaster />
  <router-view />
</template>
