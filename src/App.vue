<script lang="ts" setup>
import NavLeft from './components/layout/NavLeft.vue';
import { onMounted, ref } from 'vue';
import { loadScript, init, IOBROKER_ADMIN_PORT, IOBROKER_HOST } from '@/lib/iobroker/connecterToIobroker';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Button } from './components/ui/button';
import { MenuIcon, X } from 'lucide-vue-next';


onMounted(async () => {
  loadScript(`http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`, init);
});





const sidebarOpen = ref(false)
</script>
<template>

  <div>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto pb-4">
        <NavLeft />
      </div>
    </div>

    <div class="lg:pl-52 bg-accent min-h-[100vh]">

      <Button :size="'icon'" class="m-2 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
        <MenuIcon class="h-6 w-6" aria-hidden="true" />
      </Button>
      <main>
        <div class="pr-2">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
