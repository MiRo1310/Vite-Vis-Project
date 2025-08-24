<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { twMerge } from "tailwind-merge";

import { ChevronDown, ChevronUp } from "lucide-vue-next";

export type InputType = "number" | "text" | "time";
const props = withDefaults(
  defineProps<{
    defaultValue?: string | number;
    class?: HTMLAttributes["class"];
    type?: InputType;
    placeholder?: string;
  }>(),
  {
    defaultValue: 0,
    class: "",
    type: "number",
    placeholder: "",
  },
);

const modelValue = defineModel<string | number>("modelValue");
const countUp = () => (modelValue.value = parseInt(String(modelValue.value)) + 1);
const countDown = () => (modelValue.value = parseInt(String(modelValue.value)) - 1);
</script>

<template>
  <div :class="['relative', props.class]">
    <input
      v-model="modelValue"
      :type
      :placeholder
      :class="
        twMerge([
          'flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 input relative',
        ])
      "
    />
    <span v-if="props.type === 'number'" class="mr-1 absolute right-1 top-2">
      <ChevronUp class="icon" @click="countUp" />
      <ChevronDown class="icon" @click="countDown" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.input {
  appearance: textfield;
  -moz-appearance: textfield;

  &:focus {
    @apply outline-none ring-0;
  }
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.icon {
  @apply w-3 h-3 hover:bg-muted-foreground hover:text-white cursor-pointer;
}
</style>
