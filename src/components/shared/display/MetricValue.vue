<script setup lang="ts">
import type { HTMLAttributes } from "vue";

defineProps<{
  value: string | number;
  unit?: string;
  valueClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span class="inline-flex items-baseline gap-0.5">
    <span :class="['text-sm font-semibold', valueClass]">{{ value }}</span>
    <span v-if="unit" class="text-xs text-muted-foreground">{{ unit }}</span>
  </span>
</template>
