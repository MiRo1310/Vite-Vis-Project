<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
import { StoreValue } from "@/store/iobrokerStore.ts";
import { useDebounceFn } from "@vueuse/core";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { watch } from "vue";
import { InputType } from "@/components/ui/input/InputShadcn.vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    unit?: "°C" | "Wh" | "%" | "min";
    state: StoreValue<string | number>;
    debounce?: number;
    ack?: boolean;
    color?: keyof typeof variants.color;
  }>(),
  { type: "number", unit: undefined, debounce: 1000, color: "default" },
);

const modelValue = defineModel<string | number>();

watch(
  () => props.state?.val,
  () => {
    modelValue.value = props.state?.val?.toString() || "";
  },
  { immediate: true },
);

const debounceFn = useDebounceFn(() => setState(), props.debounce);

const setState = () => {
  const id = props.state?.id;
  if (!modelValue.value || !id) {
    return;
  }
  adminConnection?.setState(id, modelValue.value, props.ack);
};

const variants = {
  color: {
    default: "",
    dark: "bg-cardCustom-info/70 text-cardCustom-foreground",
    white: "bg-white",
  },
};
</script>

<template>
  <div :class="['relative flex items-center h-6', { 'border-red-500': !state?.ack }]">
    <InputShadcn
      :type
      :class="[getVariantsClasses(variants, props)]"
      v-model:model-value="modelValue"
      @update:model-value="debounceFn"
      border="none"
    />
    <span v-if="unit" class="text-accent-foreground/50 font-bold text-xs absolute right-5 top-px">{{ unit }}</span>
  </div>
</template>
