<script setup lang="ts">
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="['text-cardSubcard-foreground bg-cardSubcard/30 p-2 shadow-sm rounded-md', $props.class]">
    <slot />
  </div>
</template>
