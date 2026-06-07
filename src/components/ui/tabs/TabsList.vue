<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { TabsListProps } from "reka-ui";
import { TabsList, useForwardProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TabsList v-bind="forwarded" :class="cn('inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground', props.class)">
    <slot />
  </TabsList>
</template>