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
  <span v-if="value" class="text-muted-foreground">
    {{ value ? new Date(value.toString()).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-" }}
  </span>
</template>
