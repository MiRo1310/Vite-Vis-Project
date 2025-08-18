<script setup lang="ts">
import { ref } from "vue";
import { translation } from "@/lib/translation";

const url = ref(import.meta.env.VITE_GRAPHQL_URL as string);
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">{{ translation("dashboard.title") }}</h1>
    <p class="dashboard__server-url">{{ url }}</p>
  </div>
</template>

<style scoped>
.dashboard {
  @apply text-center;
}
.dashboard__title {
  @apply text-[5rem];
}
.dashboard__server-url {
  @apply text-blue-100;
}
</style>
