<script lang="ts" setup>
import { HTMLAttributes } from "vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";
import { Badge, badgeVariants } from "@/components/shared/badge/index.ts";

const props = withDefaults(
  defineProps<{
    value: string | number | undefined;
    class?: HTMLAttributes["class"];
    // eslint-disable-next-line vue/no-unused-properties
    size?: Badge["size"];
    // eslint-disable-next-line vue/no-unused-properties
    color?: Badge["color"];
    unit?: string | null;
  }>(),
  { class: "", size: "small", unit: "", color: "blue" },
);
</script>
<template>
  <span
    :class="[
      'border border-accent-foreground/50 rounded-full text-center align-middle leading-4 flex justify-center items-center',
      getVariantsClasses(badgeVariants, props),
      $props.class,
    ]"
  >
    {{ value }} {{ unit }}
  </span>
</template>
