<script lang="ts" setup></script>

<template>
  <div class="flex flex-col gap-2 justify-end px-2 flex-1">
    <p v-for="i in 5" :key="i" class="h-6 mb-1">
      {{ i }}
    </p>
  </div>
</template>
