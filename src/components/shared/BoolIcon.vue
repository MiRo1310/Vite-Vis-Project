<script lang="ts" setup>
import { Check, X } from 'lucide-vue-next';
import { PropType } from 'vue';
defineProps({
  value: {
    type: [Boolean, String, null] as PropType<boolean | "true" | "false" | null>,
    required: true
  }
})
</script>
<template>
  <Check v-if="value == 'true' || value === true" class="text-green-500 -mr-1" />
  <X v-else class="text-destructive  -mr-1" />
</template>