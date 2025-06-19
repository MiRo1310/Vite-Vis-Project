<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  value: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: null,
  },
  unit: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <p v-if="!!value">{{ value }} {{ unit }}</p>
</template>
