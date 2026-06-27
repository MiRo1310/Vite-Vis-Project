<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
import { type IValueOf } from "@/store/valueClasses.ts";
import { useDebounceFn } from "@vueuse/core";
import { watch } from "vue";
import { type InputType } from "@/components/ui/input/InputShadcn.vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";
import { ioBrokerService } from "@/lib/io-broker-service.ts";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    unit?: "°C" | "Wh" | "%" | "min";
    state: IValueOf<string | number> | undefined;
    debounce?: number;
    ack?: boolean;
    // eslint-disable-next-line vue/no-unused-properties
    color?: keyof typeof variants.color;
  }>(),
  { type: "number", unit: undefined, debounce: 1000, color: "default" },
);

const modelValue = defineModel<string | number>();

watch(
  () => props.state?.val,
  () => {
    modelValue.value = props.state?.val?.toString() ?? "";
  },
  { immediate: true },
);

const debounceFn = useDebounceFn(() => setState(), props.debounce);

const setState = async () => {
  const id = props.state?.id;
  if (!modelValue.value || !id) {
    return;
  }
  await ioBrokerService.connection?.setState(id, modelValue.value, props.ack);
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
  <div :class="['relative', { 'border-red-500': !state?.ack }]">
    <InputShadcn
      :type
      :class="[getVariantsClasses(variants, props)]"
      v-model:model-value="modelValue"
      @update:model-value="debounceFn"
      border="none"
    />
    <div v-if="unit" class="text-accent-foreground/50 font-bold text-xs absolute right-6 top-2.5">{{ unit }}</div>
  </div>
</template>
