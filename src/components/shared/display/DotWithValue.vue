<script setup lang="ts">
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { type BooleanValue } from "@/store/valueClasses.ts";
import { type UnwrapRef } from "vue";

defineProps<{ value: UnwrapRef<BooleanValue> }>();
</script>

<template>
  <StatusDot :active="value.value" />
  <span class="text-sm font-semibold">{{ value.mapped }}</span>
</template>
