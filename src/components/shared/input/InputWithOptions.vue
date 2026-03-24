<script setup lang="ts">
import { HTMLAttributes, ref, watch } from "vue";
import { cn } from "@/lib/utils";
import { InputOption } from "@/types/types.ts";
import { Check, X } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    options: InputOption[];
    optionsId: string;
    class?: HTMLAttributes["class"];
    disabled?: boolean;
    placeholder?: string;
    e2e?: string;
    exactOptionRequired?: boolean;
  }>(),
  { class: "", disabled: false, placeholder: "" },
);

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string | number>("modelValue", { default: "" });

const getOptionByName = (name: string): InputOption | undefined => props.options?.find((option) => option.name === name);
const getNameByValue = (value: string | number): string | undefined => props.options?.find((option) => option.value === value)?.name;
const getReturnValueFromOption = (option: InputOption): string | number => option.value ?? option.name;

const includesPartOfName = (value: string): boolean => props.options?.some((o) => o.name.includes(value)) ?? false;

const internalValue = ref(getNameByValue(modelValue.value) ?? "");

watch(modelValue, () => {
  internalValue.value = getNameByValue(modelValue.value) ?? "";
});

const updateValue = () => {
  const value = internalValue.value;

  if (value === "") {
    clearInputFieldAction();
    return;
  }

  if (props.exactOptionRequired) {
    exactHandler(String(value));
    return;
  }
  const option = getOptionByName(String(value));

  if (option) {
    modelValue.value = getReturnValueFromOption(option);
    return;
  }
  modelValue.value = value;
};

const clearInputFieldAction = () => {
  previousExactName.value = "";
  isExactOption.value = false;
};

const exactHandler = (name: string) => {
  if (!name) {
    return;
  }
  const option = getOptionByName(name);

  if (hasExactName(name)) {
    if (option) {
      const returnValue = getReturnValueFromOption(option);
      previousExactName.value = option.name;
      modelValue.value = returnValue;
      return;
    }
  }
  if (includesPartOfName(name)) {
    resetModelValue();
    internalValue.value = name;
    return;
  }

  internalValue.value = previousExactName.value;
  hasExactName(previousExactName.value);
};

const resetModelValue = () => {
  modelValue.value = "";
};

const hasExactName = (name: string): boolean => {
  const exact = !!props.options?.some((o) => o.name === name);
  isExactOption.value = exact;
  return exact;
};

const previousExactName = ref<string>(getNameByValue(modelValue.value) ?? "");
const isExactOption = ref(false);
</script>

<template>
  <div :class="['flex items-center', props.class]">
    <input
      v-model="internalValue"
      @input="updateValue"
      :list="optionsId"
      :disabled
      v-e2e="e2e"
      :placeholder
      :class="
        cn(
          'flex h-9 pr-8 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm leading-10 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        )
      "
    />
    <datalist v-if="options" :id="optionsId">
      <option v-for="(option, index) in options" :key="index">{{ option.name }}</option>
    </datalist>
    <span v-if="exactOptionRequired" class="ml-1" v-e2e="'state-icon'">
      <Check v-if="isExactOption" class="text-success size-4" v-e2e="'state-icon-check'" />
      <X v-else class="text-red-500 size-4" v-e2e="'state-icon-x'" />
    </span>
  </div>
</template>
