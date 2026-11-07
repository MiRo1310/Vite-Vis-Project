<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ value?: string; cellClass: string }>();

const transformedDate = computed(() => {
  return props.value ? new Date(props.value).toLocaleString() : "-";
});
</script>

<template>
  <span :class="cellClass">
    {{ transformedDate }}
  </span>
</template>
