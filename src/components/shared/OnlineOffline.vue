<script setup lang="ts">
defineProps<{ status: boolean | undefined }>();
</script>

<template>
  <span
    :class="{
      'text-accent-foreground/50 text-xs font-bold text-right px-1 -mx-1': true,
      'bg-red-100 text-red-400': !status,
      'bg-green-100 text-green-400': status,
    }"
  >
    {{ status ? "Online" : "Offline" }}
  </span>
</template>
