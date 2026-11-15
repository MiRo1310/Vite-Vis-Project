<script setup lang="ts">
import { type Component, type HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { type DropdownMenuItemEmits, type DropdownMenuItemProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
import DropdownMenuItem from "./DropdownMenuItem.vue";

/**
 * Menüeintrag mit Icon und Text – Icon-Größe und Abstand sind überall gleich.
 *
 * @example <DropdownMenuIconItem :icon="Trash2" variant="destructive" @select="remove">Entfernen</DropdownMenuIconItem>
 */
const props = withDefaults(
  defineProps<DropdownMenuItemProps & { icon: Component; variant?: "default" | "destructive"; class?: HTMLAttributes["class"] }>(),
  { variant: "default", class: undefined },
);
const emits = defineEmits<DropdownMenuItemEmits>();

const delegatedProps = reactiveOmit(props, "icon", "variant", "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuItem v-bind="forwarded" :class="cn(variant === 'destructive' && 'text-destructive focus:text-destructive', props.class)">
    <Component :is="icon" class="h-4 w-4 shrink-0" aria-hidden="true" />
    <span class="min-w-0 truncate"><slot /></span>
  </DropdownMenuItem>
</template>
