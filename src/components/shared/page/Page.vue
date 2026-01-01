<script setup lang="ts">
import IndexButton from "@/components/layout/IndexButton.vue";

defineProps<{ title: string }>();
</script>

<template>
  <IndexButton />
  <div
    class="border border-cardCustom-border/40 mt-1 bg-cardCustom text-card-foreground shadow-sm overflow-hidden h-[calc(100%-74px)] p-2 flex flex-col"
  >
    <div class="text-cardCustom-foreground text-base font-bold flex justify-between items-center">
      <span>{{ title }}</span>
      <slot name="title" />
    </div>
    <div class="mt-2">
      <slot name="header" />
    </div>
    <div class="flex-1 overflow-y-auto mt-2">
      <slot />
    </div>
  </div>
</template>
