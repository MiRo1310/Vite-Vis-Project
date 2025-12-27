<script lang="ts" setup>
import AlexaTimer from "@/components/section/app/AlexaTimer.vue";
</script>

<template>
  <div class="app">
    <AlexaTimer />
    <main class="app__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  @apply h-[100vh] flex flex-col bg-backgroundColor;

  &__content {
    @apply px-1 pt-1 flex-1 overflow-hidden;
  }
}
</style>
