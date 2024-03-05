<script setup lang="ts">
import NavLeft from './pages/NavLeft.vue';
import { onMounted } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker-connecter';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from "@/store/iobrokerStore";
const iobrokerStore = useIobrokerStore();
const { iobrokerValues } = storeToRefs<any>(iobrokerStore);



onMounted(async () => {
  // loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});




</script>


<template>
  <div class="w-[1280px] h-[800px] absolute border border-red-600 -z-10"></div>
  <div class="w-full h-[100vh] flex flex-row">
    <div class="nav--left ">
      <NavLeft></NavLeft>
    </div>
    <div class="  w-full h-full">
      <div class="p-4">
        <p class="text-black bg-yellow-50">Test : {{ iobrokerValues["test"] }}{{ iobrokerValues["telegram"] }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app--container {
  @apply flex flex-row
}

.nav--left {
  @apply w-[15rem]
}
</style>