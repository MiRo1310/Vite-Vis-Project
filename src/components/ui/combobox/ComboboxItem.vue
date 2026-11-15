<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ComboboxItem, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    v-bind="forwarded"
    :class="
      cn(
        'relative flex w-full cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </ComboboxItem>
</template>
