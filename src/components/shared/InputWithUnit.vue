<script lang="ts" setup>
import { Input } from '@/components/ui/input';
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  class: {
    type: String,
    default: ''
  },
  unit: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
<template>
  <div :class="['flex items-center']">
    <Input
      :type="type" :class="{ [props.class]: true, 'h-6': true }" :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <span class="ml-2 text-accent-foreground/50 font-bold text-xs">{{ unit }}</span>
  </div>
</template>