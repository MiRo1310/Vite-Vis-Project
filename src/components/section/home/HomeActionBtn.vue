<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button/button.variants.ts";
import { HTMLAttributes } from "vue";

defineProps<{ badge?: number; title?: string; class?: HTMLAttributes["class"] }>();
</script>

<template>
  <Button :class="['relative h-14! p-2! flex-1 min-w-24', $props.class]">
    <div class="flex items-center flex-wrap gap-2">
      <slot />
      <span class="text-[11px] leading-tight">{{ title }}</span>
      <Badge v-if="badge" color="green" :value="badge" />
    </div>
  </Button>
</template>
