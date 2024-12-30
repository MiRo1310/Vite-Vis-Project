<script lang="ts" setup>
import Nav from "./components/layout/Nav.vue";
import { onMounted, onUnmounted } from "vue";
import { loadScript } from "@/lib/connecter-to-iobroker.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import AlexaTimer from "@/components/section/app/AlexaTimer.vue";
import { useTime } from "@/composables/time.ts";
import { IOBROKER_ADMIN_PORT, IOBROKER_HOST } from "@/config/config.ts";

onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`);
});

onUnmounted(() => {
  useTime().clear();
});

</script>
<template>
  <div class="h-[100vh] flex flex-col bg-backgroundColor">
    <AlexaTimer />
    <main class="px-1 pt-1 flex-1 overflow-hidden">
      <RouterView />
    </main>

    <Nav />
  </div>
</template>
