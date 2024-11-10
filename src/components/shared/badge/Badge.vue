<script lang="ts" setup>
import { HTMLAttributes } from "vue";

defineProps<{ value: string | number, class?: HTMLAttributes["class"] }>();
</script>
<template>
  <span
    :class="['inline-block border-2 border-accent-foreground/50 h-5 min-w-5 px-1 text-xs font-bold bg-blue-200 rounded-full mx-auto text-center align-middle leading-4', $props.class]"
  >
    {{ value }}
  </span>
</template>