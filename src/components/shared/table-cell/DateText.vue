<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  value: {
    type: String as PropType<string | undefined>,
    default: "",
  },
});
</script>

<template>
  <span class="text-muted-foreground">
    {{ value ? new Date(value.toString()) : "-" }}
  </span>
</template>
