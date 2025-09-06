<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { HTMLInputTypesEnum } from "@/enum/enum";

export interface InputOptions {
  id: string;
  name: string;
}

const props = withDefaults(
  defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    options?: InputOptions[];
    optionsId?: string;
    step?: number;
    type: keyof typeof HTMLInputTypesEnum;
    class?: HTMLAttributes["class"];
    disabled?: boolean;
    placeholder?: string;
  }>(),
  { optionsId: "options", options: undefined, class: "", modelValue: "", defaultValue: "", step: 1, disabled: false, placeholder: "" },
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
      :list="optionsId"
      :type
      :step
      :disabled
      :placeholder
      :class="
        cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2  text-sm leading-10  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        )
      "
    />
    <datalist v-if="options" :id="optionsId">
      <option v-for="option in options" :key="option.id">{{ option.name }}</option>
    </datalist>
  </div>
</template>
