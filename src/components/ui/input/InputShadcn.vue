<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { twMerge } from "tailwind-merge";

import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

export type InputType = "number" | "text" | "time";
const props = withDefaults(
  defineProps<{
    defaultValue?: string | number;
    class?: HTMLAttributes["class"];
    type?: InputType;
    placeholder?: string;
    border?: keyof typeof variants.border;
  }>(),
  {
    defaultValue: 0,
    class: "",
    type: "number",
    placeholder: "",
    border: "default",
  },
);

const modelValue = defineModel<string | number>("modelValue");
const countUp = () => (modelValue.value = parseInt(String(modelValue.value)) + 1);
const countDown = () => (modelValue.value = parseInt(String(modelValue.value)) - 1);

const variants = {
  border: {
    default: "",
    none: "border-2 border-transparent shadow-none ring-0 focus:ring-0",
  },
};
</script>

<template>
  <div :class="['relative', props.class]">
    <input
      v-model="modelValue"
      :type
      :placeholder
      :class="
        twMerge([
          'flex h-9 w-full dark:bg-input/30 px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 relative',
          'border border-input focus:outline-hidden focus:ring-0',
          getVariantsClasses(variants, props),
        ])
      "
    />
    <span v-if="props.type === 'number'" class="absolute right-1 top-2">
      <ChevronUp class="w-3 h-3 hover:bg-muted-foreground hover:text-white cursor-pointer" @click="countUp" />
      <ChevronDown class="w-3 h-3 hover:bg-muted-foreground hover:text-white cursor-pointer" @click="countDown" />
    </span>
  </div>
</template>

<style scoped lang="scss">
input {
  appearance: textfield;
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
