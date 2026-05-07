<script setup lang="ts">
defineProps<{ duration: number; begin: string }>();
</script>

<template>
  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" :dur="`${duration}s`" repeatCount="indefinite" :begin="begin" />
</template>
