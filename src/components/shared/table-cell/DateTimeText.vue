<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ value?: string | undefined }>();

const transformedDate = computed(() => {
  return props.value ? new Date(props.value).toLocaleString() : "-";
});
</script>

<template>
  <span class="text-muted-foreground">
    {{ transformedDate }}
  </span>
</template>
