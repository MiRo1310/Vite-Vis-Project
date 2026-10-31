<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
import { type IValueOf, NumberValue } from "@/store/valueClasses.ts";
import { isDefined, useDebounceFn } from "@vueuse/core";
import { type HTMLAttributes, watch } from "vue";
import { type InputType } from "@/components/ui/input/InputShadcn.vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";
import { clamp } from "@/lib/number.ts";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    unit?: string;
    state: IValueOf<string | number> | undefined;
    debounce?: number;
    ack?: boolean;
    step?: number;
    // eslint-disable-next-line vue/no-unused-properties
    color?: keyof typeof variants.color;
    class?: HTMLAttributes["class"];
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
  if (!isDefined(modelValue.value) || modelValue.value === "" || !id) {
    return;
  }
  let value = modelValue.value;
  if (props.state instanceof NumberValue) {
    value = clamp(Number(value), props.state.min, props.state.max);
    modelValue.value = value;
  }
  props.state.setState(value, props.ack ?? false);
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
  <div :class="['relative', props.class]">
    <InputShadcn
      :type
      :step="props.step ?? (props.state instanceof NumberValue ? props.state?.step : undefined)"
      :max="props.state instanceof NumberValue ? props.state?.max : undefined"
      :min="props.state instanceof NumberValue ? props.state?.min : undefined"
      :class="[getVariantsClasses(variants, props), { 'border-red-500': !state?.ack }]"
      v-model:model-value="modelValue"
      @update:model-value="debounceFn"
    />
    <div
      v-if="unit || (props.state instanceof NumberValue && props.state.unit)"
      class="text-accent-foreground/50 font-bold text-xs absolute right-6 top-2.5"
    >
      {{ unit ?? (props.state instanceof NumberValue ? props.state?.unit : undefined) }}
    </div>
  </div>
</template>
