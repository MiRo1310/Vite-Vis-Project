<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
import { HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    class?: HTMLAttributes["class"];
    unit?: string;
    ack?: boolean;
  }>(),
  { type: "text", class: "", unit: undefined, ack: true },
);
const modelValue = defineModel<string | number>();
</script>

<template>
  <div :class="['input-with-unit', { 'input-with-unit--not-ack': !ack }]">
    <InputShadcn :type :class="[props.class, 'input-with-unit__input']" v-model:model-value="modelValue" />
    <span class="input-with-unit__unit">{{ unit }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-with-unit {
  @apply flex items-center border-2 border-transparent;

  &--not-ack {
    @apply border-red-500;
  }

  .input-with-unit__input {
    @apply h-6;
  }

  .input-with-unit__unit {
    @apply ml-1 pr-1 text-accent-foreground/50 font-bold text-xs;
  }
}
</style>
