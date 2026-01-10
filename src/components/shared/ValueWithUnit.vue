<script setup lang="ts">
import { HTMLAttributes } from "vue";

const props = defineProps<{ value?: string | number; unit?: string; class?: HTMLAttributes["class"] }>();
</script>

<template>
  <p :class="['mr-4', props.class]" data-component="valueWithUnit">
    {{ value }}
    <span class="w-1 inline-block">{{ unit }} </span>
  </p>
</template>
