<script lang="ts" setup>
import { CardTitle } from "@/components/ui/card";
import { HTMLAttributes } from "vue";

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"],
  style?: keyof typeof styles
}>(), { style: "default", class: "" });

const styles = {
  shadcn: "text-accent-foreground/50 text-lg font-bold",
  default: "text-color__default text-lg font-bold bg-accent px-2"
};
</script>
<template>
  <CardTitle :class="[styles[style], props.class]">
    <slot />
  </CardTitle>
</template>
