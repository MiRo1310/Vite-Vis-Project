<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"], styling?: keyof typeof style
}>(), { styling: "default", class: "" });

const style = {
  default: "rounded-xl border bg-card text-card-foreground shadow",
  blue: "bg-color__default",
  light: "border bg-muted text-card-foreground shadow"
};
</script>

<template>
  <div
    :class="
      cn(
        style[props.styling],
        props.class,
      )
    "
  >
    <slot :styling="$props.styling" />
  </div>
</template>
