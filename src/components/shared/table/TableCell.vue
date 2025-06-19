<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"],
  size?: TableCellSize
}>(), { size: "default" });

type Variants = typeof variants
export type TableCellSize = keyof Variants["size"];

const variants = {
  size: {
    default: "p-2",
    small: "p-0"
  }
};

</script>

<template>
  <td
    :class="
      cn(
        'align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
        props.class, getVariantsClasses(variants,props)
      )
    "
  >
    <slot />
  </td>
</template>
