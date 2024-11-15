<script lang="ts" setup>
import NavLeft from "./components/layout/NavLeft.vue";
import { onMounted } from "vue";
import { init, IOBROKER_ADMIN_PORT, IOBROKER_HOST, loadScript } from "@/lib/iobroker/connecter-to-iobroker";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";


onMounted(async () => {
  useIobrokerStore().resetIdsToSubscribe();
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});
</script>
<template>
  <div>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-48 lg:flex-col py-2 pl-2 pr-1">
      <NavLeft />
    </div>

    <div class="lg:pl-48 min-h-[100vh] bg-backgroundColor">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
