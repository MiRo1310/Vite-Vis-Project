<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  actualPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const getPageRangeStart = computed(() => {
  const calculatedStart = (props.actualPage - 1) * props.itemsPerPage + 1;

  if (calculatedStart > props.totalPages) {
    return props.totalPages;
  }

  return calculatedStart;
});

const getPageRangeEnd = computed(() => {
  const calculatedEnd = props.actualPage * props.itemsPerPage;

  if (calculatedEnd > props.totalPages) {
    return props.totalPages;
  }

  return props.actualPage * props.itemsPerPage;
});
</script>
<template>
  <span class="text-sm text-muted-foreground mr-6 pt-[0.5px]">
    {{ getPageRangeStart }} - {{ getPageRangeEnd }}
    <span class="mx-2"> von </span>
    {{ totalPages }}
  </span>
</template>
