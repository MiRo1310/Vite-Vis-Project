<script lang="ts" setup>
import NavLeft from './components/layout/NavLeft.vue';
import { onMounted } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker/connecter-to-iobroker';

onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});

</script>
<template>
  <div>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-48 lg:flex-col py-2 pl-2 pr-1">

      <NavLeft />

    </div>

    <div class="lg:pl-48 bg-accent min-h-[100vh]">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
