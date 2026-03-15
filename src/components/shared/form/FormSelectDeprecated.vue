<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLAttributes } from "vue";
import { SelectOption } from "@/types/types";
import Select from "@/components/shared/select/Select.vue";

withDefaults(
  defineProps<{
    label: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    selectOptions?: SelectOption[];
    defaultVal?: string;
    width?: string;
  }>(),
  {
    placeholder: "",
    class: "",
    selectOptions: () => [],
    defaultVal: "",
    width: undefined,
  },
);

const selected = defineModel<string>("selected");
</script>

<template>
  <FormField v-slot="{ componentField }" :name>
    <FormItem :class="$props.class">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Select v-bind="componentField" v-model:model-value="selected" :items="selectOptions" :placeholder :default-val :width />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
