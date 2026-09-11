<script setup lang="ts">
import Button, { type ButtonVariants } from "@/components/shared/button/Button.vue";
import { computed } from "vue";
import { type ButtonVariantProps } from "@/components/shared/button/button.variants.js";
import { type IValueOf } from "@/store/valueClasses.ts";

const props = defineProps<
  {
    label?: string;
    state: IValueOf<boolean>;
    ack?: boolean;
    icon?: keyof ButtonVariants["icons"];
    // eslint-disable-next-line vue/no-unused-properties
  } & ButtonVariantProps
>();

const handleClick = () => {
  props.state.setState(!props.state.val, props.ack);
};

const getAction = computed<keyof ButtonVariants["action"]>(() => {
  if (!props.state.ack) {
    return "ackFalse";
  }
  return props.state.val ? "on" : "off";
});
</script>

<template>
  <Button :variant :size :icon @click="handleClick" :action="getAction">
    <span class="text-sm text-muted-foreground">{{ label }} <slot /></span>
  </Button>
</template>
