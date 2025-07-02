<script lang="ts" setup>
import { Input } from "@/components/ui/input";
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
  { type: "number", unit: undefined, debounce: 500, color: "default" },
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
    white: "bg-white",
  },
};
</script>

<template>
  <div :class="['input-with-unit', { 'input-with-unit__input--not-ack': !state?.ack }]">
    <Input :type :class="['input-with-unit__input']" v-model:model-value="modelValue" @update:model-value="debounceFn" />
    <span class="input-with-unit__unit">{{ unit }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-with-unit {
  @apply relative flex items-center border-b-color__default border-b-2;

  &__input {
    @apply h-6 border-2 border-transparent shadow-none w-16 focus:border-none active:border-none ring-0 text-right focus:ring-0 pr-4;

    &--not-ack {
      @apply border-red-500;
    }
  }

  &__unit {
    @apply ml-1 pr-1 text-accent-foreground/50 font-bold text-xs;
    @apply absolute right-0;
  }
}
</style>
