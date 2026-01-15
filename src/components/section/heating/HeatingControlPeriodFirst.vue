<script lang="ts" setup></script>

<template>
  <div class="flex flex-col gap-2 justify-end px-1 flex-1 text-xs">
    <p v-for="i in 5" :key="i" class="h-5">
      {{ i }}
    </p>
  </div>
</template>
