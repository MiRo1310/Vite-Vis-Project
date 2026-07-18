<script setup lang="ts">
import { computed } from "vue";
import { isDefined } from "@vueuse/core";

const props = defineProps<{ value?: string | number; unit?: string }>();

const val = computed(() => (isDefined(props.value) ? String(parseFloat(String(props.value)).toFixed(2)).replace(".", ",") : ""));
</script>

<template>
  <p class="text-muted-foreground">{{ val }} {{ value ? unit : "" }}</p>
</template>
