<script setup lang="ts">
import { numberFormatter } from "@/lib/number.ts";

defineProps<{ value?: string | number; unit?: string; decimals?: number }>();
</script>

<template>
  <p class="text-muted-foreground">{{ numberFormatter({ number: value, unit, decimals }) }}</p>
</template>
