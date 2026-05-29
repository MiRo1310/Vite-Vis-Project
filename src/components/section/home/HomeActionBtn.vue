<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button/button.variants.ts";
import { HTMLAttributes } from "vue";

defineProps<{ badge?: number; title?: string; class?: HTMLAttributes["class"] }>();
</script>

<template>
  <Button :class="['relative  h-24! p-2!', $props.class]">
    <div class="flex flex-col items-center gap-2">
      <span class="text-xs">{{ title }}</span>
      <slot />
      <Badge v-if="badge" color="green" :value="badge" />
    </div>
  </Button>
</template>
