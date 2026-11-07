<script setup lang="ts">
defineProps<{ value?: string; cellClass: string }>();
</script>

<template>
  <span v-if="value" :class="cellClass">
    {{ value ? new Date(value.toString()).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-" }}
  </span>
</template>
