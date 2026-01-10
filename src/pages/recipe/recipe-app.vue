<script setup lang="ts">
import NavigationList from "@/components/layout/NavigationList.vue";
import Toaster from "../../components/ui/toast/Toaster.vue";
</script>

<template>
  <Suspense>
    <div class="relative w-full h-screen bg-cover bg-center">
      <NavigationList />
      <div class="pt-13.25 h-[calc(100vh-53px)] overflow-hidden w-full inline-block px-2">
        <router-view />
      </div>
    </div>
  </Suspense>
  <Toaster />
</template>
