<script setup lang="ts">

import { Card, CardTitle } from "@/components/ui/card";


const props = defineProps({
  icon: {
    type: [Object, Function],
    default: null
  },
  title: {
    type: String,
    default: ""
  },
  class: {
    type: String,
    default: ""
  },
  classCard: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};
</script>
<template>
  <Card :class="['w-20 h-20 cursor-pointer', classCard]" @click="handleClick">
    <CardTitle class="m-2 mb-2 h-8 text-center text-accent-foreground/70 text-xs">
      <slot name="title" />
      {{ props.title }}
    </CardTitle>
    <component :is="props.icon" class="w-7 h-7 mx-auto" :class="props.class" />
  </Card>
</template>
