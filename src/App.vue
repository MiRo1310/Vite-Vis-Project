<script setup lang="ts">
import NavLeft from './pages/NavLeft.vue';
import { onMounted } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker-connecter';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from "@/store/iobrokerStore";
const iobrokerStore = useIobrokerStore();
const { iobrokerValues: io } = storeToRefs<any>(iobrokerStore);

onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});
</script>


<template>
  <div class="w-[1280px] h-[800px] absolute border border-red-600 -z-10"></div>
  <div class="h-12 inline-block">
    <h1 class="text-4xl ml-2 mt-2">Aussentemperatur {{ io.Aussentemperatur }}°C</h1>
  </div>
  <div class="w-full h-[100vh] flex flex-row">
    <div class="nav--left bg-yellow-50">
      <NavLeft></NavLeft>
    </div>
    <div class="  w-full h-full">
      <div class="p-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app--container {
  @apply flex flex-row
}

.nav--left {
  @apply w-[12rem]
}
</style>