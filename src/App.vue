<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useNotificationStore } from "@/store/notification-store.ts";
import { useTime } from "@/composables/time.ts";
import { socketIo } from "@/config/config.ts";
import { Toaster } from "@/components/ui/toast";
import { useColorMode } from "@vueuse/core";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import PwaUpdate from "@/components/layout/PwaUpdate.vue";
import ErrorBoundary from "@/components/layout/ErrorBoundary.vue";

useColorMode();

// Lädt den iobrokerTree (und damit alle State-Subscriptions) eager beim App-Start,
// statt erst wenn die erste lazy geladene Seite ihren Router-Chunk auflöst.
// Sonst konkurrieren Chunk-Fetch, Seiten-Mount und die Subscription-Antworten
// im selben Zeitfenster um den Hauptthread.
useIobrokerStore();

onMounted(async () => {
  ioBrokerService.resetSubscribedIds();
  useNotificationStore(); // Store vor dem ersten Socket-Callback initialisieren
  ioBrokerService.loadScript(socketIo);
});

onUnmounted(() => {
  useTime().clear();
});
</script>

<template>
  <ErrorBoundary>
    <PwaUpdate />
    <Toaster />
    <router-view />
  </ErrorBoundary>
</template>
