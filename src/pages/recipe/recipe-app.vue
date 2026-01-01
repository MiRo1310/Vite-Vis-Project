<script setup lang="ts">
import NavigationList from "@/components/layout/NavigationList.vue";
import Toaster from "../../components/ui/toast/Toaster.vue";
</script>

<template>
  <Suspense>
    <div class="relative w-full h-screen bg-cover bg-center">
      <NavigationList />
      <div class="pt-[calc(48px+8px)] h-[calc(100vh-8px)] overflow-hidden w-full inline-block px-2">
        <router-view />
      </div>
    </div>
  </Suspense>
  <Toaster />
</template>
