<script setup lang="ts">
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="['text-foreground/50 bg-cardSubcard/30 p-2 shadow-sm rounded-md text-xs font-bold', $props.class]">
    <slot />
  </div>
</template>
