<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HTMLAttributes } from "vue";

defineProps<{ class?: HTMLAttributes["class"] }>();

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <Collapsible v-model:open="open" :class="$props.class">
    <CollapsibleTrigger>
      <slot name="trigger" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <slot name="content" />
    </CollapsibleContent>
  </Collapsible>
</template>
