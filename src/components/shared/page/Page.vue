<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="page">
    <div class="page__title">
      {{ title }}
    </div>

    <slot name="header" />

    <div class="page__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  @apply border bg-gray-200 text-card-foreground shadow overflow-hidden h-full p-2;
  @apply flex flex-col;

  &__title {
    @apply text-color__default text-base font-bold bg-accent px-2;
  }

  &__content {
    @apply flex-1 overflow-y-auto mt-2;
  }
}
</style>
