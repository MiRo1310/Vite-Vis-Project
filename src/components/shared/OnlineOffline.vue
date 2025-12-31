<script setup lang="ts">
defineProps<{ status: boolean; power?: boolean }>();
</script>

<template>
  <span
    :class="[
      'text-accent-foreground/50 text-xs font-bold text-right px-1 py-[0.1rem] rounded-md',
      {
        'bg-red-100 text-red-400': !status,
        'bg-green-100 text-green-400': status,
        'border-green-400 border-4 border-double': power,
      },
    ]"
  >
    {{ status ? "Online" : "Offline" }}
  </span>
</template>
