<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLAttributes } from "vue";
import { HTMLInputTypesEnum } from "@/enum/enum";
import InputWithOptions from "@/components/shared/input/InputWithOptions.vue";
import { InputOption } from "@/types/types.ts";

withDefaults(
  defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    classInput?: HTMLAttributes["class"];
    type?: keyof typeof HTMLInputTypesEnum;
    step?: number;
    labelRight?: string;
    options: InputOption[];
    optionsId: string;
    disabled?: boolean;
    e2e?: string;
    exactOptionRequired?: boolean;
  }>(),
  {
    placeholder: "",
    class: "",
    type: "text",
    step: 1,
    labelRight: "",
    label: "",
    classInput: "",
    e2e: undefined,
  },
);
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="$props.class">
      <FormLabel v-if="label || labelRight" class="flex justify-between">
        <span>{{ label }}</span>
        <span>{{ labelRight }}</span>
      </FormLabel>
      <FormControl>
        <InputWithOptions
          v-bind="componentField"
          :placeholder
          :type
          :step
          :options
          :options-id
          :disabled
          :e2e
          :class="$props.classInput"
          :exact-option-required
        />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
