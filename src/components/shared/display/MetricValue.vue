<script setup lang="ts">
import { computed, type HTMLAttributes, type UnwrapRef } from "vue";
import { isDefined } from "@vueuse/core";
import { type NumberValue } from "@/store/valueClasses.ts";

const props = withDefaults(
  defineProps<{
    val?: string | number;
    unit?: string;
    numberValue?: UnwrapRef<NumberValue>;
    decimalPlaces?: number;
    valueClass?: HTMLAttributes["class"];
    math?: (val: number) => number;
  }>(),
  { math: (val: number) => val },
);

const value = computed(() => {
  if (isDefined(props.val)) {
    return formatNumber(props.val);
  }
  if (props.numberValue) {
    return formatNumber(props.math(props.numberValue.value));
  }
  return "-";
});

function formatNumber(val: number | string) {
  const decimalPlaces = props.decimalPlaces;
  return isDefined(decimalPlaces) && typeof val === "number" ? props.math(val).toFixed(decimalPlaces) : val;
}

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
