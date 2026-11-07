<script setup lang="ts">
import { numberFormatter } from "@/lib/number.ts";

defineProps<{ value?: string | number; unit?: string; decimals?: number, cellClass: string }>();
</script>

<template>
  <p :class="cellClass">{{ numberFormatter({ number: value, unit, decimals }) }}</p>
</template>
