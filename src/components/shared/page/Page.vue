<script setup lang="ts">
import PageHeader from "@/components/layout/PageHeader.vue";

defineProps<{ title: string }>();
</script>

<template>
  <div class="overflow-hidden h-full flex flex-col gap-2">
    <div class="text-base font-bold flex justify-between items-center flex-wrap gap-10">
      <span>{{ title }}</span>
      <PageHeader>
        <slot name="header" />
      </PageHeader>
    </div>
    <div class="flex-1 overflow-auto max-w-screen">
      <slot />
    </div>
  </div>
</template>
