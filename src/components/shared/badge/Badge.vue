<script lang="ts" setup>
import { HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    value: string | number | undefined;
    class?: HTMLAttributes["class"];
    size?: keyof typeof sizeClass;
  }>(),
  { class: "", size: "small" },
);

const sizeClass = {
  small: "h-4 min-w-4 px-1  text-2xs font-bold",
  default: "h-5 min-w-5 px-1 text-xs font-bold",
  large: "h-7 min-w-7 px-3 text-base font-bold",
};
</script>
<template>
  <span
    :class="[
      'border-[1px] border-accent-foreground/50 bg-blue-200 rounded-full text-center align-middle leading-4 flex justify-center items-center',
      $props.class,
      sizeClass[props.size as keyof typeof sizeClass],
    ]"
  >
    {{ value }}
  </span>
</template>
