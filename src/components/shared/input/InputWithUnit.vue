<script lang="ts" setup>
import { InputShadcn } from "@/components/ui/input";
import { HTMLAttributes } from "vue";
import { InputType } from "@/components/ui/input/InputShadcn.vue";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    class?: HTMLAttributes["class"];
    unit?: string;
    ack?: boolean;
  }>(),
  { type: "text", class: "", unit: undefined, ack: true },
);
const modelValue = defineModel<string | number>();
</script>

<template>
  <div :class="['flex items-center border-2 border-transparent', { 'border-red-500': !ack }]">
    <InputShadcn :type :class="[props.class, 'h-6']" v-model:model-value="modelValue" />
    <span class="ml-1 pr-1 text-accent-foreground/50 font-bold text-xs">{{ unit }}</span>
  </div>
</template>
