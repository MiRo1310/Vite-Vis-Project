<script setup lang="ts">
import { getVariantsClasses } from "@/composables/variants-classes.ts";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{ color: keyof typeof variants.color }>();

const variants = {
  color: {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
  },
};
</script>

<template>
  <span :class="['size-3 rounded-full inline-block', getVariantsClasses(variants, props)]" />
</template>
