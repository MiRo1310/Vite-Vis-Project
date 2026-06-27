<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type HTMLAttributes } from "vue";
import { type SelectOption } from "@/types/types";
import SelectComponent from "@/components/shared/select/SelectComponent.vue";

withDefaults(
  defineProps<{
    label: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    selectOptions?: SelectOption[];
    disabled?: boolean;
  }>(),
  {
    placeholder: "",
    class: "",
    selectOptions: () => [],
  },
);
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="$props.class">
      <FormLabel v-if="label" class="flex justify-between">
        <span>{{ label }}</span>
      </FormLabel>
      <FormControl>
        <SelectComponent v-bind="componentField" :items="selectOptions" :placeholder :disabled class="w-full" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
