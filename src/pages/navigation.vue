<script setup lang="ts">
import NavigationButton from "@/components/layout/NavigationButton.vue";
import { navigations } from "@/config/navigation.ts";
</script>

<template>
  <div class="navigation">
    <template v-for="navigation in navigations" :key="navigation.link">
      <NavigationButton :navigation />
    </template>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply grid grid-cols-3 gap-2;
}
</style>
