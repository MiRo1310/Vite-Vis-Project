<script setup lang="ts">
defineProps<{ status?: boolean; power?: boolean }>();
</script>

<template>
  <span
    :class="[
      'text-accent-foreground/50 text-xs font-bold text-right px-1 py-[0.1rem] rounded-md',
      {
        'bg-destructive/10 text-destructive': !status,
        'bg-success/10 text-success': status,
        'border-success border-4 border-double': power,
      },
    ]"
  >
    {{ status ? "Online" : "Offline" }}
  </span>
</template>
