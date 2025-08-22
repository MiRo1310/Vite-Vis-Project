<script setup lang="ts">
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="['page-section', $props.class]">
    <slot />
  </div>
</template>

<style scoped>
.page-section {
  @apply mt-2;
}
</style>
