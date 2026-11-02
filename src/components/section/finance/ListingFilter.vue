<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants.ts";
import { yearRange } from "@/lib/finance.ts";

const activeYear = defineModel<number>("activeYear", { default: new Date().getFullYear() });

const updateYear = (year: number) => {
  activeYear.value = year;
};
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-2">
    <Button v-for="i in yearRange().list" :key="i" :variant="activeYear === i ? 'default' : 'outline'" @click="updateYear(i)">
      {{ i }}
    </Button>
  </div>
</template>
