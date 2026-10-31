<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import type { IValueOf } from "@/store/valueClasses.ts";
import { ref, watch } from "vue";
import { SelectLabel } from "@/components/ui/select";

const props = defineProps<{
  label?: string;
  state: IValueOf<boolean>;
}>();

const modelValue = ref(props.state.value);
watch(modelValue, (newValue) => {
  props.state.setState(newValue, false);
});
</script>

<template>
  <Switch v-model:model-value="modelValue" />
  <SelectLabel>{{ label }}</SelectLabel>
</template>
