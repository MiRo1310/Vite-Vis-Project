<script lang="ts" setup>
import { CardTitle } from "@/components/ui/card";
import { HTMLAttributes } from "vue";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

interface StyleProps {
  // eslint-disable-next-line vue/no-unused-properties
  style?: keyof (typeof variantsCardTitle)["style"];
}

const props = withDefaults(
  defineProps<
    {
      class?: HTMLAttributes["class"];
    } & StyleProps
  >(),
  { style: "default", class: "" },
);

const variantsCardTitle = {
  style: {
    shadcn: "text-accent-foreground/50 text-lg font-bold",
    default: "text-accent-foreground/50 text-lg font-bold ",
  },
};
</script>
<template>
  <CardTitle :class="[getVariantsClasses(variantsCardTitle, props), props.class]">
    <slot />
  </CardTitle>
</template>
