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
  <div class="w-full h-[100vh] absolute -z-10 background">
    <div class="h-12">
      <Header />
    </div>
    <div class="w-full h-[100vh] flex flex-row">
      <div class="nav--left ">
        <NavLeft />
      </div>
      <div class="p-1  w-full h-full">
        <div>
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

.background {
  background-color: #0a1a58;
}
</style>