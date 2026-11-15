<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes["class"] }>(), {
  position: "popper",
  align: "start",
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-list"
      v-bind="forwarded"
      :class="
        cn(
          'z-50 w-(--reka-combobox-trigger-width) min-w-56 max-h-(--reka-combobox-content-available-height) overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          props.class,
        )
      "
    >
      <ComboboxViewport class="max-h-72 overflow-y-auto p-1">
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>
