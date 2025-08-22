<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLAttributes } from "vue";
import SelectCard from "@/components/shared/select/SelectCard.vue";
import { SelectOption } from "@/types/types";

withDefaults(
  defineProps<{
    label: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    selectOptions?: SelectOption[];
    defaultVal?: string;
  }>(),
  {
    placeholder: "",
    class: "",
    selectOptions: () => [],
    defaultVal: "",
  }
);

const selected = defineModel<string>("selected");
</script>

<template>
  <FormField v-slot="{ componentField }" :name>
    <FormItem :class="$props.class">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <SelectCard v-bind="componentField" v-model:model-value="selected" :options="selectOptions" :placeholder :default-val />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
