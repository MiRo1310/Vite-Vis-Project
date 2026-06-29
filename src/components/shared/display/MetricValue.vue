<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { isDefined } from "@vueuse/core";

defineProps<{
  val: string | number;
  unit: string;
  decimalPlaces?: number;
  valueClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span class="inline-flex items-baseline gap-1.5">
    <span :class="['text-sm font-semibold', valueClass]">{{
      isDefined(decimalPlaces) && typeof val === "number" ? val.toFixed(decimalPlaces) : val
    }}</span>
    <span class="text-xs text-muted-foreground">{{ unit }}</span>
  </span>
</template>
