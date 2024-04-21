<script setup lang='ts'>

import { onUnmounted, ref } from 'vue';
const d = new Date();
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const time = ref<string | null>(d.toLocaleTimeString())
const date = ref<string | null>(weekdays[d.getDay()] + " " + d.toLocaleDateString())


const interval = setInterval(() => {
  const d = new Date();
  time.value = d.toLocaleTimeString()
  date.value = weekdays[d.getDay()] + " " + d.toLocaleDateString()
}, 1000);
onUnmounted(() => {
  clearInterval(interval);
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