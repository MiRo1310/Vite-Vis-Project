<script lang="ts" setup>
import { Check, X } from 'lucide-vue-next';
import { PropType } from 'vue';
defineProps({
  value: {
    type: [Boolean, String, null] as PropType<boolean | "true" | "false" | null>,
    required: true
  },
  class: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <Check v-if="value == 'true' || value === true" :class="['text-green-500 -mr-1 h-4 w-4', $props.class]" />
  <X v-else :class="['text-destructive -mr-1 h-4 w-4 p-0', $props.class]" />
</template>