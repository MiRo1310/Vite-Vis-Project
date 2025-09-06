<script lang="ts" setup>
import { HTMLAttributes } from "vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(
  defineProps<{
    value: string | number | undefined;
    class?: HTMLAttributes["class"];
    size?: keyof typeof variants.size;
    color?: keyof typeof variants.color;
    unit?: string | null;
  }>(),
  { class: "", size: "small", unit: "", color: "blue" },
);

const variants = {
  size: {
    small: "h-4 min-w-4 px-1 text-2xs font-bold",
    default: "h-5 min-w-5 px-1 text-xs font-bold",
    large: "h-7 min-w-7 px-3 text-base font-bold",
  },
  color: {
    blue: "border-blue-500 bg-blue-200 text-blue-900",
    gray: "border-gray-500 bg-gray-200 text-gray-900",
    green: "border-green-500 bg-green-200 text-green-900",
    red: "border-red-500 bg-red-200 text-red-900",
    yellow: "border-yellow-500 bg-yellow-200 text-yellow-900",
    purple: "border-purple-500 bg-purple-200 text-purple-900",
    pink: "border-pink-500 bg-pink-200 text-pink-900",
    teal: "border-teal-500 bg-teal-200 text-teal-900",
    orange: "border-orange-500 bg-orange-200 text-orange-900",
  },
};
</script>
<template>
  <span
    :class="[
      'border-[1px] border-accent-foreground/50 rounded-full text-center align-middle leading-4 flex justify-center items-center',
      $props.class,
      getVariantsClasses(variants, props),
    ]"
  >
    {{ value }} {{ unit }}
  </span>
</template>
