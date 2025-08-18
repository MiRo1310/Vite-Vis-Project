<script setup lang="ts">
import Navigation from "@/components/layout/Navigation.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <Suspense>
    <div class="app__background">
      <Navigation />
      <div class="app__content">
        <router-view />
      </div>
    </div>
  </Suspense>
  <Toaster />
</template>

<style scoped>
.app__background {
  background-image: url("/cook.jpg");
  @apply relative w-full h-screen bg-cover bg-center;
}

.app__content {
  @apply pt-[calc(48px+8px)] h-[calc(100vh-8px)] overflow-hidden w-full inline-block px-2;
}
</style>
