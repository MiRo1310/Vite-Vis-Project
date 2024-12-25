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
  <Card
    :class="{'w-16 h-16 cursor-pointer p-0 bg-color__default border-none rounded-none relative mt-1 ml-1':true, classCard:true ,'flex items-center justify-center':!title}"

    @click="handleClick"
  >
    <CardTitle v-if="title" class="mt-1 text-center mb-1 text-3xs">
      <slot name="title" />
      {{ title }}
    </CardTitle>
    <component :is="icon" :class="{'w-7 h-7 mx-auto':title, 'w-10 h-10 mx-auto':!title , [props.class]:true}" />
    <slot name="icon" />
  </Card>
</template>
