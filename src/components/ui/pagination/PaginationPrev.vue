<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-icons/vue";
import { PaginationPrev, type PaginationPrevProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<PaginationPrevProps & { class?: HTMLAttributes["class"] }>(),
  {
    asChild: true,
    class: "",
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="cn('w-9 h-9 p-0', props.class)" variant="outline">
      <slot>
        <ChevronLeftIcon />
      </slot>
    </Button>
  </PaginationPrev>
</template>
