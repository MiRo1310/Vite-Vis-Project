<script setup lang="ts">
import { computed, PropType } from "vue";
import { isDefined } from "@vueuse/core";

const props = defineProps({
  value: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: null,
  },
  unit: {
    type: String,
    default: "",
  },
});

const val = computed(() => (isDefined(props.value) ? String(parseFloat(String(props.value)).toFixed(2)).replace(".", ",") : 0.0));
</script>

<template>
  <p>{{ val }} {{ unit }}</p>
</template>
