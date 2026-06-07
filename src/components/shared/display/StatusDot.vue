<script setup lang="ts">
defineProps<{
  active: boolean;
  size?: "sm" | "md";
  color?: string;
}>();
</script>

<template>
  <span
    :class="[
      'rounded-full shrink-0 inline-block',
      size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
      color ?? (active ? 'bg-green-400 ring-1 ring-green-400/40' : 'bg-red-400'),
    ]"
  />
</template>
