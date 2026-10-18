<script lang="ts" setup>
import AlexaTimer from "@/components/section/app/AlexaTimer.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <AlexaTimer />
    <main class="p-2 flex-1 overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
