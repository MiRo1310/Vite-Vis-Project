<script setup lang="ts">

import { computed } from "vue";

const props = defineProps<{ value?: string | undefined }>();

const transformedDate = computed(() => {
  console.log(props.value);
  return props.value ? new Date(props.value.toString()).toLocaleString() : "-";
});
</script>

<template>
  <span class="text-muted-foreground">

    {{ transformedDate }}
  </span>
</template>
