<script setup lang="ts">
import { PropType } from "vue";
import { Check, X } from "lucide-vue-next";

const props = defineProps({
  value: {
    type: Boolean as PropType<boolean | undefined>,
    default: true
  },
  classIcon: {
    type: String,

    default: ""
  }
});
</script>

<template>
  <span class="inline-block">
    <Check v-if="value" :class="['w-4 h-4 mt-1 text-[--success-secondary] isSuccess', props.classIcon]" />
    <X v-else-if="value === false " :class="['w-4 h-4 mt-1 text-[--error-secondary] isError', props.classIcon]" />
  </span>
</template>
