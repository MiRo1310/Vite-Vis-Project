<script setup lang="ts">
defineProps<{ date: string }>();
</script>

<template>
  <span>{{ new Date(date).toLocaleString() }}</span>
</template>
