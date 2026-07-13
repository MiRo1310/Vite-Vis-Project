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

// Lädt den iobrokerTree (und damit alle State-Subscriptions) eager beim App-Start,
// statt erst wenn die erste lazy geladene Seite ihren Router-Chunk auflöst.
// Sonst konkurrieren Chunk-Fetch, Seiten-Mount und die Subscription-Antworten
// im selben Zeitfenster um den Hauptthread.
useIobrokerStore();

onMounted(async () => {
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
