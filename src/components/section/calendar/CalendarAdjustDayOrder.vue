<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  month: number;
  year: number;
}>();

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const adjustDayOrder = computed(() => {
  const firstDay = getFirstDayOfMonth(props.month, props.year);
  if (firstDay === 0) {
    return 6;
  }
  return firstDay - 1;
});
</script>
<template>
  <div v-for="(_, i) in adjustDayOrder" :key="i" class="col-span-1 m-[2px]" />
</template>
