<script setup lang="ts">
import { Check, X } from "lucide-vue-next";
import { isFalsy, isTruthy } from "@/lib/utilities.ts";

const props = defineProps<{ value: boolean | undefined, classIcon?: string }>();

</script>

<template>
  <span class="inline-block">
    <Check v-if="isTruthy(value)" :class="['w-4 h-4 mt-1 text-[--success-secondary] isSuccess', props.classIcon]" />
    <X v-else-if="isFalsy(value)" :class="['w-4 h-4 mt-1 text-[--error-secondary] isError', props.classIcon]" />
  </span>
</template>
