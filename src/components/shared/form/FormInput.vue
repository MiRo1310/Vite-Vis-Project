<script setup lang="ts">
import { FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/shared/input";
import { HTMLAttributes } from "vue";
import { HTMLInputTypesEnum } from "@/enum/enum";
import { InputOptions } from "@/components/shared/input/Input.vue";

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
    options?: InputOptions[];
    optionsId?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: "",
    class: "",
    type: "text",
    step: 1,
    labelRight: "",
    options: undefined,
    optionsId: undefined,
    label: "",
    classInput: "",
  }
);
const modelValue = defineModel<string>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="$props.class">
      <FormLabel v-if="label || labelRight" class="flex justify-between">
        <span>{{ label }}</span>
        <span>{{ labelRight }}</span>
      </FormLabel>
      <FormControl>
        <Input
          v-bind="componentField"
          v-model:model-value="modelValue"
          :placeholder
          :type
          :step
          :options
          :options-id
          :disabled
          :class="$props.classInput"
        />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
