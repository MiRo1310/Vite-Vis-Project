<script setup lang='ts'>

import {
  Card,
  CardTitle,
} from '@/components/ui/card'


const props = defineProps({
  icon: {
    type: [Object, Function],
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])
const handleClick = () => {
  emit('click')
}
</script>
<template>
  <Card class="w-24 h-24 m-1 cursor-pointer" @click="handleClick">
    <CardTitle class="m-2 mb-3 h-8 text-center text-accent-foreground/70 text-sm">
      <slot name="title" />
      {{ props.title }}
    </CardTitle>
    <component :is="props.icon" class="w-8 h-8 mx-auto" :class="props.class" />
  </Card>
</template>
