<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    styling?: keyof typeof style;
    // eslint-disable-next-line vue/no-unused-properties
    variant?: keyof (typeof variants)["variant"];
    // eslint-disable-next-line vue/no-unused-properties
    color?: keyof (typeof variants)["color"];
  }>(),
  { styling: "default", class: "", variant: "default", color: "default" },
);

const style = {
  default: "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm",
  small: "bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-4 shadow-sm",
  blue: "bg-[#0f148e]",
  blueDark: "bg-cardCustom text-cardCustom-foreground border border-cardCustom-border/70",
  info: "bg-cardCustom-info/70 text-cardCustom-foreground border border-cardCustom-border/70",
  light: "border bg-gray-200 text-card-foreground shadow-sm",
};

const variants = {
  styling: style,
  variant: {
    default: "",
    contentScrollable: "overflow-hidden h-full",
  },
  color: {
    default: "",
    primary: "border-card-border text-card-title",
  },
};
</script>

<template>
  <div :class="cn(getVariantsClasses(variants, props), props.class)">
    <slot :styling="$props.styling" />
  </div>
</template>
