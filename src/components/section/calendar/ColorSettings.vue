<script setup lang="ts">
import { Settings } from "@lucide/vue";

const isOpen = defineModel<boolean>("open");
</script>
<template>
  <Settings class="hover:cursor-pointer" @click="isOpen = !isOpen" />
</template>
