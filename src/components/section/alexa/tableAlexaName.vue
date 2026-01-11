<script setup lang="ts">
import { CustomValue } from "@/lib/table.ts";
import { Row } from "@tanstack/vue-table";
import { AlexaDotAction } from "@/pages/alexa.vue";

defineProps<{
  value: string;
  // eslint-disable-next-line vue/no-unused-properties
  row: Row<AlexaDotAction>;
  // eslint-disable-next-line vue/no-unused-properties
  source: string;
  // eslint-disable-next-line vue/no-unused-properties
  customValue: CustomValue;
  // eslint-disable-next-line vue/no-unused-properties
  callback?: () => void;
}>();
</script>

<template>
  <p class="flex items-end">
    <img src="@/public/echo_dot3.png" alt="Echo Dot" class="w-14" />
    <span>{{ value }}</span>
  </p>
</template>
