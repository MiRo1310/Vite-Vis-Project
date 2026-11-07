<script setup lang="ts">
defineProps<{ value: string; cellClass: string }>();
</script>

<template>
  <span :class="cellClass">
    {{ value ? new Date(value.toString()) : "-" }}
  </span>
</template>
