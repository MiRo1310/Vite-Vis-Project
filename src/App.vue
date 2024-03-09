<script setup lang="ts">
import NavLeft from './pages/NavLeft.vue';
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker-connecter';


onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});
</script>


<template>
  <div class="w-[1280px] h-[800px] absolute border border-red-600 -z-10">
    <div class="h-12">
      <Header />
    </div>
    <div class="w-full h-[100vh] flex flex-row">
      <div class="nav--left bg-yellow-50">
        <NavLeft />
      </div>
      <div class="  w-full h-full">
        <div class="p-2">
          <router-view />
        </div>
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