<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from "@/types/types";

withDefaults(defineProps<{ placeholder?: string; options?: SelectOption[]; variant?: keyof typeof styles.variant; defaultVal?: string }>(), {
  variant: "default",
  defaultVal: "",
  placeholder: "",
  options: () => [],
});

const modelValue = defineModel<string>({ default: "" });

const styles = {
  variant: {
    default: "bg-white",
  },
};
</script>

<template>
  <Select v-model:model-value="modelValue" :default-value="defaultVal">
    <SelectTrigger :class="styles.variant[variant]" class="w-80">
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
