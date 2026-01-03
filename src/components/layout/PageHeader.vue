<script setup lang="ts">
import { homeNavigation } from "@/config/navigation.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import NavigationButton from "@/components/layout/NavigationButton.vue";
</script>

<template>
  <div class="flex gap-2 mb-2">
    <div class="flex-1 w-80">
      <NavigationButton :navigation="homeNavigation" small />
    </div>
    <DarkMode small />
  </div>
  <slot />
</template>
