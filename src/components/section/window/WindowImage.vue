<script setup lang="ts">
import windowOpen from "@/public/window_open.png";
import windowClosed from "@/public/window_closed.png";

defineProps<{ isOpen: boolean; exist: boolean }>();
</script>

<template>
  <div v-if="exist">
    <img v-show="isOpen" :src="windowOpen" alt="FensterAufZu" />
    <img v-show="!isOpen" :src="windowClosed" alt="FensterAufZu" />
  </div>
</template>

<style scoped lang="postcss">
img {
  @apply w-8 h-6 mt-1;
}
</style>
