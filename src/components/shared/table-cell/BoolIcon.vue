<script lang="ts" setup>
import { Check, X } from "lucide-vue-next";
import { HTMLAttributes } from "vue";

defineProps<{
  value: boolean | "true" | "false" | undefined;
  classIcon?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Check
    v-if="value == 'true' || value === true"
    :class="['text-green-500 -mr-1 h-4 w-4', $props.class]"
  />
  <X v-else :class="['text-destructive -mr-1 h-4 w-4 p-0', $props.class]" />
</template>
