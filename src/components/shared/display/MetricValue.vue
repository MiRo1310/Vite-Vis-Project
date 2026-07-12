<script setup lang="ts">
import { computed, type HTMLAttributes, type UnwrapRef } from "vue";
import { isDefined } from "@vueuse/core";
import { type NumberValue } from "@/store/valueClasses.ts";

const props = defineProps<{
  val?: string | number;
  unit?: string;
  numberValue?: UnwrapRef<NumberValue>;
  decimalPlaces?: number;
  valueClass?: HTMLAttributes["class"];
}>();

const value = computed(() => {
  const decimalPlaces = props.decimalPlaces;
  const val = props.val;
  if (isDefined(props.val)) {
    return isDefined(decimalPlaces) && typeof val === "number" ? val.toFixed(decimalPlaces) : val;
  }
  if (props.numberValue) {
    return props.numberValue.value;
  }
  return "-";
});

const _unit = computed(() => {
  const u = props.numberValue?.valAndUnit;
  return props.unit ?? u?.unit ?? "";
});
</script>

<template>
  <span class="inline-flex items-baseline gap-1.5">
    <span :class="['text-sm font-semibold', valueClass]">{{ value }}</span>
    <span class="text-xs text-muted-foreground">{{ _unit }}</span>
  </span>
</template>
