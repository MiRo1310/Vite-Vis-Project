<script setup lang="ts">
import { FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/shared/input";
import { HTMLAttributes } from "vue";

withDefaults(
  defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    classInput?: HTMLAttributes["class"];
    labelRight?: string;
    disabled?: boolean;
    e2e?: string;
  }>(),
  {
    placeholder: "",
    class: "",
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
        <Input v-bind="componentField" :placeholder type="date" :disabled :e2e :class="$props.classInput" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
