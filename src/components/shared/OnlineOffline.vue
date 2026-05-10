<script setup lang="ts">
defineProps<{ status?: boolean; power?: boolean; textActive?: string; textInactive?: string }>();
</script>

<template>
  <span
    :class="[
      'text-accent-foreground/50 text-xs font-bold text-center px-1 py-[0.1rem] rounded-md w-14',
      {
        'bg-destructive/10 text-destructive': !status,
        'bg-success/10 text-success': status,
        'border-success border-4 border-double': power,
      },
    ]"
  >
    {{ status ? (textActive ?? "Online") : (textInactive ?? "Offline") }}
  </span>
</template>
