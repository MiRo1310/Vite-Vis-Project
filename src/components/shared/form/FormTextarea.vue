<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLAttributes } from "vue";
import { Textarea } from "@/components/ui/textarea";

withDefaults(
  defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
    classTextArea?: HTMLAttributes["class"];
  }>(),
  {
    placeholder: "",
    class: "",
    label: "",
    classTextArea: "",
  }
);

const modelValue = defineModel<string>();

const handleEnterPress = ($event: KeyboardEvent) => {
  $event.stopPropagation();
};
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="$props.class">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Textarea
          v-bind="componentField"
          v-model:model-value="modelValue"
          :placeholder
          :class="['w-full', classTextArea]"
          @keydown.enter="handleEnterPress"
        />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
