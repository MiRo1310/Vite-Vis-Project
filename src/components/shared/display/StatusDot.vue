<script setup lang="ts">
defineProps<{
  active: boolean;
  size?: "sm" | "md";
  color?: string;
  inactiveColor?: TStatusDotColor;
}>();

export type TStatusDotColor = keyof typeof colors;

const colors = {
  red: "bg-red-400",
  yellow: "bg-yellow-500",
} as const;
</script>

<template>
  <span
    :class="[
      'rounded-full shrink-0 inline-block',
      size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
      color ?? (active ? 'bg-green-400 ring-1 ring-green-400/40' : inactiveColor ? colors[inactiveColor] : 'bg-red-400'),
    ]"
  />
</template>
