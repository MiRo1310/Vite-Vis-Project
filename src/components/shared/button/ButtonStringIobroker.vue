<script setup lang="ts">
import Button, { type ButtonVariants } from "@/components/shared/button/Button.vue";
import { computed } from "vue";
import { type ButtonVariantProps } from "@/components/shared/button/button.variants.js";
import { type IValueOf } from "@/store/valueClasses.ts";

const props = defineProps<
  {
    label?: string;
    state: IValueOf<string>;
    value: string;
    ack?: boolean;
    icon?: keyof ButtonVariants["icons"];
    useActive?: boolean;
    activeBorder?: keyof typeof border;
    // eslint-disable-next-line vue/no-unused-properties
  } & ButtonVariantProps
>();

const handleClick = () => {
  props.state.setState(props.value, props.ack);
};

const getAction = computed<keyof ButtonVariants["action"]>(() => {
  if (!props.state.ack) {
    return "ackFalse";
  }
  return props.state.val ? "on" : "off";
});

const border = {
  default: "border-white/70!",
  danger: "!border-red-500",
  success: "!border-green-500",
};
</script>

<template>
  <Button
    :variant
    :size
    :icon
    @click="handleClick"
    :action="getAction"
    :class="useActive && state.value === value ? (activeBorder ? border[activeBorder] : border.default) : ''"
  >
    <span class="text-sm text-muted-foreground">{{ label }} <slot /></span>
  </Button>
</template>
