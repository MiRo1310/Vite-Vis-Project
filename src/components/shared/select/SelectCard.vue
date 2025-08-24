<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from "@/types/types";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(
  defineProps<{ placeholder?: string; options?: SelectOption[]; variant?: keyof typeof styles.variant; defaultVal?: string; width?: string }>(),
  {
    variant: "default",
    defaultVal: "",
    placeholder: "",
    width: "w-80",
    options: () => [],
  },
);

const modelValue = defineModel<string>({ default: "" });

const styles = {
  variant: {
    default: "bg-white",
  },
};
</script>

<template>
  <Select v-model:model-value="modelValue" :default-value="defaultVal">
    <SelectTrigger :class="[getVariantsClasses(styles, props), width]">
      <SelectValue :placeholder />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="(option, index) in options" :key="index" :value="option.value">
          <span>{{ option.label }}</span>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
