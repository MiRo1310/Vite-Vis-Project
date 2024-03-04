<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST, adminConnection } from '@/lib/iobroker-connecter';

import { useIobrokerStore } from "@/store/iobrokerStore";
const iobrokerStore = useIobrokerStore();

const test = ref<string | undefined>(undefined);

onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);

  if (adminConnection.value) adminConnection.value.subscribeStateAsync("0_userdata.0.Testdatenpunkte.Test", (id: string, state: any) => {
    console.log("State changed", id, state);

    iobrokerStore.setTest(state.val);
    console.log(iobrokerStore.getTest);
    console.log(state.val);
    test.value = iobrokerStore.getTest;
  })


  setTimeout(() => {
    console.log(iobrokerStore.getTest)
  }, 5000);
});



</script>


<template>
  <div class="w-full h-[100vh] flex flex-row">
    <div class="left w-48 bg-green-200">

    </div>
    <div class="  w-full h-full">
      <div class="p-4">
        <p class="text-black bg-yellow-50">Test : {{ test === "true" ? "true" : test === "false" ? "false" : undefined
          }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app--container {
  @apply flex flex-row
}

.left {
  @apply w-[19rem] bg-violet-950
}
</style>