<script lang="ts" setup></script>

<template>
  <div class="w-12 pl-4 pt-11 mb-1 bg-color__default">
    <p class="mb-2">Per.</p>
    <p v-for="i in 5" :key="i" class="h-6 mb-1">
      {{ i }}
    </p>
  </div>
</template>
