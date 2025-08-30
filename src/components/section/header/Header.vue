<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div :class="['header', $props.class]">
    <div class="header__left-col">
      <div class="header__first-row">
        <h1 class="header__title">{{ title }}</h1>
        <div class="header__title-right">
          <slot name="titleRight" />
        </div>
      </div>
      <slot name="description" />
    </div>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-between items-center bg-gray-200 p-2 rounded-xl;

  &__title {
    @apply text-2xl font-bold;
  }

  &__left-col {
    @apply w-full;
  }

  &__first-row {
    @apply flex items-center justify-between;
  }

  &__title-right {
    @apply flex space-x-2 items-center;
  }
}
</style>
