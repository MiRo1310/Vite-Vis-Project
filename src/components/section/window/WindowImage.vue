<script setup lang="ts">
import windowOpen from "@/public/window_open.png";
import windowClosed from "@/public/window_closed.png";

defineProps<{ isOpen: boolean }>();
</script>

<template>
  <img v-show="isOpen" :src="windowOpen" alt="FensterAufZu" class="w-8 h-6 mt-1" />
  <img v-show="!isOpen" :src="windowClosed" alt="FensterAufZu" class="w-8 h-6 mt-1" />
</template>
