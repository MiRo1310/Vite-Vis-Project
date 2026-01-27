<script setup lang="ts">
import { mainPages } from "@/config/mainPages.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import NavigationButton from "@/components/layout/NavigationButton.vue";
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <slot />
    <div class="flex-1 w-80">
      <NavigationButton :navigation="mainPages.navigation" small />
    </div>
    <div class="w-30">
      <NavigationButton :navigation="mainPages.home" small />
    </div>
    <slot name="after" />
    <DarkMode small />
  </div>
</template>
