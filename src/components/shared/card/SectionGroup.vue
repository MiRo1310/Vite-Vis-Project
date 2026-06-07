<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  title: string;
  cols?: 1 | 2 | 3 | 4;
  icon?: Component;
}>();
</script>

<template>
  <div>
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
      <component :is="icon" v-if="icon" class="h-3 w-3" />
      {{ title }}
    </p>
    <div
      :class="{
        'grid gap-2': true,
        'grid-cols-1': cols === 1,
        'grid-cols-2': !cols || cols === 2,
        'grid-cols-3': cols === 3,
        'grid-cols-4': cols === 4,
      }"
    >
      <slot />
    </div>
  </div>
</template>
