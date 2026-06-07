<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button/button.variants.ts";
import { HTMLAttributes } from "vue";

defineProps<{ badge?: number; title?: string; class?: HTMLAttributes["class"] }>();
</script>

<template>
  <Button :class="['relative h-14! p-2! flex-col gap-1', $props.class]">
    <slot />
    <span class="text-[11px] leading-tight">{{ title }}</span>
    <Badge v-if="badge" color="green" :value="badge" />
  </Button>
</template>
