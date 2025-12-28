<script setup lang="ts">
import IndexButton from "@/components/layout/IndexButton.vue";

defineProps<{ title: string }>();
</script>

<template>
  <IndexButton />
  <div class="page">
    <div class="page__title">
      <span>{{ title }}</span>
      <slot name="title" />
    </div>
    <div class="page__header">
      <slot name="header" />
    </div>
    <div class="page__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  @apply border border-cardCustom-border/40 mt-1 bg-cardCustom text-card-foreground shadow overflow-hidden h-[calc(100%-74px)] p-2;
  @apply flex flex-col;

  &__title {
    @apply text-cardCustom-foreground text-base font-bold flex justify-between items-center;
  }

  &__header {
    @apply mt-2;
  }

  &__content {
    @apply flex-1 overflow-y-auto mt-2;
  }
}
</style>
