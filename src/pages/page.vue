<script lang="ts" setup>
import AlexaTimer from "@/components/section/app/AlexaTimer.vue";
</script>

<template>
  <div class="h-[100vh] flex flex-col bg-backgroundColor" data-component="page">
    <AlexaTimer />
    <main class="px-1 pt-1 flex-1 overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
