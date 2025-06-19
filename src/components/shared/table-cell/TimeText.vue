<script setup lang="ts">
defineProps<{ value: string }>();
</script>

<template>
  <span class="text-muted-foreground">
    {{ value ? new Date(value.toString()) : "-" }}
  </span>
</template>
