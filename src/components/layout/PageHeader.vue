<script setup lang="ts">
import { homeNavigation } from "@/config/navigation.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import NavigationButton from "@/components/layout/NavigationButton.vue";
</script>

<template>
  <div class="flex gap-2 mb-2">
    <slot />
    <div class="flex-1 w-80">
      <NavigationButton :navigation="homeNavigation" small />
    </div>
    <slot name="after" />
    <DarkMode small />
  </div>
</template>
