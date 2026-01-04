<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { ref, onMounted } from "vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";
import { buttonIcons, ButtonVariantProps } from "@/components/shared/button/index.ts";

interface Props extends PrimitiveProps, ButtonVariantProps {
  variant?: keyof typeof variants.variant;
  size?: keyof typeof variants.size;
  as?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "",
  variant: "outline",
  size: "default",
  action: "default",
  text: "default",
  icon: "default",
});

export type ButtonVariants = typeof variants;

const variants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
    iconRow: "h-5 w-5 p-[2px]",
    square: "h-28 w-28 rounded-md",
    full: "w-full h-9 px-4 py-2",
    fullXxl: "w-full px-4 py-2",
    iconLg: "h-15 w-15",
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
    add: "add",
    chevronDown: "chevronDown",
    chevronRight: "chevronRight",
    edit: "edit",
    remove: "remove",
  },
};

const buttonChild = ref<HTMLElement | null>(null);

onMounted(() => {
  if (props.size === "iconRow" && buttonChild.value) {
    buttonChild.value.closest("td")?.querySelector("div")?.classList.add("btn__row-center");
  }
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="[
      'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      getVariantsClasses<typeof variants>(variants, props, ['icons', 'text']),
      props.class,
    ]"
  >
    <div ref="buttonChild" :class="[variants.text[props.text], 'w-full flex items-center justify-center']">
      <Component v-if="props.icon" :is="buttonIcons[variants.icons[props.icon] as keyof typeof buttonIcons]" />
      <slot />
    </div>
  </Primitive>
</template>
