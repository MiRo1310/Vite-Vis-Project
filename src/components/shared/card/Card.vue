<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    styling?: keyof typeof style;
    variant?: keyof (typeof variants)["variant"];
  }>(),
  { styling: "default", class: "", variant: "default" },
);

const style = {
  default: "rounded-xl border bg-card text-card-foreground shadow",
  blue: "card-blue",
  blueDark: "blue-dark",
  light: "border bg-gray-200 text-card-foreground shadow",
};

const variants = {
  styling: style,
  variant: {
    default: "",
    contentScrollable: "overflow-hidden h-full",
  },
};
</script>

<template>
  <div :class="cn(getVariantsClasses(variants, props), props.class)">
    <slot :styling="$props.styling" />
  </div>
</template>

<style scoped lang="scss">
.card-blue {
  background-color: #0f148e;
}

.blue-dark {
  @apply bg-cardCustom text-cardCustom-foreground border border-cardCustom-border/40;
}
</style>
