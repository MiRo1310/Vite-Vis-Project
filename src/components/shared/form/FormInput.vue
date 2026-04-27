<script setup lang="ts">
import { FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/shared/input/input.variants";
import { HTMLAttributes } from "vue";
import { HTMLInputTypesEnum } from "@/enum/enum";

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
    disabled?: boolean;
    e2e?: string;
    min?: number;
    max?: number;
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
    min: undefined,
    max: undefined,
  },
);
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="$props.class">
      <FormLabel v-if="label || labelRight" class="flex justify-between whitespace-nowrap">
        <span>{{ label }}</span>
        <span>{{ labelRight }}</span>
      </FormLabel>
      <FormControl>
        <Input v-bind="componentField" :placeholder :type :step :disabled :min :max :e2e :class="$props.classInput" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
