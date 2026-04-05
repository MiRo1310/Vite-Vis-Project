<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { HTMLInputTypesEnum } from "@/enum/enum";

const props = withDefaults(
  defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    step?: number;
    type?: keyof typeof HTMLInputTypesEnum;
    class?: HTMLAttributes["class"];
    inputClass?: HTMLAttributes["class"];
    disabled?: boolean;
    placeholder?: string;
    e2e?: string;
    min?: number;
    max?: number;
  }>(),
  {
    optionsId: "options",
    options: undefined,
    class: "",
    inputClass: "",
    modelValue: "",
    defaultValue: "",
    step: 1,
    disabled: false,
    placeholder: "",
    type: "text",
    min: undefined,
    max: undefined,
  },
);

const emits = defineEmits<(e: "update:modelValue", payload: string | number) => void>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div :class="props.class">
    <input
      v-model="modelValue"
      :type
      :step
      :min
      :max
      :disabled
      v-e2e="e2e"
      :placeholder
      :class="
        cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm leading-10 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.inputClass,
        )
      "
    />
    <slot />
  </div>
</template>
