<script lang="ts" setup>
import Nav from "./components/layout/Nav.vue";
import { onMounted } from "vue";
import { init, IOBROKER_ADMIN_PORT, IOBROKER_HOST, loadScript } from "@/lib/iobroker/connecter-to-iobroker";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";


onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});
</script>
<template>
  <div class="h-[100vh] flex flex-col bg-backgroundColor">
    <main class="px-1 pt-1 flex-1 overflow-auto">
      <RouterView />
    </main>

    <Nav />
  </div>
</template>
