<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

import { getVariantsClasses } from "@/composables/variants-classes.ts";
import { buttonDefaults, buttonIcons, ButtonVariantProps } from "@/components/shared/button/index.ts";

interface Props extends PrimitiveProps, ButtonVariantProps {
  as?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "",
  ...buttonDefaults,
});

export type ButtonVariants = typeof variants;

const variants = {
  variant: {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    save: "border border-input bg-color__default shadow-sm hover:border-black hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
    square: "h-28 w-28 rounded-md",
  },
  action: {
    default: "",
    ackFalse: "text-red-500 border-red-500",
    on: "text-green-500 border-green-500",
    off: "text-red-100 border-red-200",
  },
  text: {
    default: "",
    multiline: "text-xs text-muted-foreground text-wrap px-2",
  },
  icons: {
    default: "",
    power: "power",
    powerOff: "powerOff",
  },
};
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="['btn', getVariantsClasses<typeof variants>(variants, props, ['icons', 'text']), props.class]">
    <Component v-if="props.icon" :is="buttonIcons[variants.icons[props.icon] as keyof typeof buttonIcons]" />
    <span :class="variants.text[props.text]">
      <slot />
    </span>
  </Primitive>
</template>

<style scoped lang="scss">
.btn {
  @apply inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring;
  @apply disabled:pointer-events-none disabled:opacity-50;

  &__multiline {
    @apply text-xs text-muted-foreground text-wrap;
  }
}
</style>
