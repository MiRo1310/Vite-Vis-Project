<script setup lang="ts">
const emits = defineEmits(["update:onSubmit"]);
</script>

<template>
  <form class="h-full flex flex-col" @submit.prevent="emits('update:onSubmit')">
    <div class="flex-1 h-full">
      <slot name="default" />
    </div>
    <slot name="footer" />
  </form>
</template>
