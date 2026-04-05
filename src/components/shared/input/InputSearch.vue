<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/input/Input.vue";
import { useDebounceFn } from "@vueuse/core";
import { X } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
  }>(),
  {
    class: "",
    modelValue: "",
    defaultValue: "",
  },
);

const internalValue = ref(props.modelValue ?? props.defaultValue);

const emits = defineEmits<(e: "update:modelValue", payload: string | number) => void>();

const debounceFn = useDebounceFn((payload: string | number) => {
  updateHandler(payload);
}, 500);

const updateHandler = (payload: string | number) => {
  internalValue.value = payload;

  emits("update:modelValue", internalValue.value);
};

const updateInternal = (payload: string | number) => {
  internalValue.value = payload;
  debounceFn(payload);
};

const resetInternal = () => {
  internalValue.value = "";
  updateHandler("");
};
</script>

<template>
  <Input @update:model-value="updateInternal($event)" :model-value="internalValue" input-class="pr-9" class="relative">
    <X v-if="internalValue !== ''" class="absolute right-2.5 top-2.5 size-4 hover:text-destructive cursor-pointer" @click="resetInternal" />
  </Input>
</template>
