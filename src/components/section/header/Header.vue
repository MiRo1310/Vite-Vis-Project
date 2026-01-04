<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex justify-between items-center p-2 rounded-xl">
    <div class="w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <div class="flex space-x-2 items-center">
          <slot name="titleRight" />
        </div>
      </div>
      <slot name="description" />
    </div>

    <slot />
  </div>
</template>
