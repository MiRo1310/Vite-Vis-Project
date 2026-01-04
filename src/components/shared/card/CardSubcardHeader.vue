<script setup lang="ts">
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="['text-foreground/70 text-base', $props.class]">
    <slot />
  </div>
</template>
