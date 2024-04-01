<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
const time = ref<string | null>(null)
const date = ref<string | null>(null)
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittowch", "Donnerstag", "Freitag", "Samstag"];
onMounted(() => {
  const interval = setInterval(() => {
    const d = new Date();
    time.value = d.toLocaleTimeString()
    date.value = weekdays[d.getDay()] + " " + d.toLocaleDateString()
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
<template>
  <div class="mt-2 mr-2 text-white text-xs">
    <p>{{ date }}</p>
    <p class="text-right">
      {{ time }}
    </p>
  </div>
</template>
<style lang='postcss' scoped></style>