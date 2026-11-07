<script setup lang="ts">
defineProps<{ cellClass?: string; value?: string }>();
</script>

<template>
  <pre><code :class="['font-sans', cellClass]">{{value}}</code></pre>
</template>
