<script lang="ts" setup></script>

<template>
  <div class="w-8 pl-2 pt-11 mb-1 text-xs">
    <p class="mb-2">Per.</p>
    <p v-for="i in 5" :key="i" class="h-6 mb-1">
      {{ i }}
    </p>
  </div>
</template>
