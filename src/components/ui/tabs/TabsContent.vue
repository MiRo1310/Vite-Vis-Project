<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { TabsContentProps } from "reka-ui";
import { TabsContent, useForwardProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

const props = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TabsContent
    v-bind="forwarded"
    :class="cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)"
  >
    <slot />
  </TabsContent>
</template>