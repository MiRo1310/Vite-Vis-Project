<script setup lang="ts">
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="['mt-2', $props.class]">
    <slot />
  </div>
</template>
