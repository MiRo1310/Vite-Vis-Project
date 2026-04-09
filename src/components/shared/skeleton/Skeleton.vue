<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import { HtmlHTMLAttributes } from "vue";

withDefaults(defineProps<{ loading: boolean; class?: HtmlHTMLAttributes["class"]; singleSkeleton?: boolean; lines?: number }>(), {
  lines: 3,
  class: "",
});
</script>

<template>
  <Skeleton v-if="loading && singleSkeleton" :loading :class="['h-8 w-80', $props.class]" />
  <div v-else-if="loading && !singleSkeleton" :class="['flex flex-col space-y-4 w-full', $props.class]">
    <Skeleton :loading class="h-12 w-[30%] rounded-xl" />
    <div class="space-y-2">
      <Skeleton v-for="i in lines" :key="i" :loading class="h-8 w-full" />
    </div>
  </div>
  <slot v-else />
</template>
