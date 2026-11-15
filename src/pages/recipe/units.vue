<script setup lang="ts">
import { Ruler } from "@lucide/vue";
import InlineEditList from "@/components/shared/recipe/InlineEditList.vue";
import { useUnitsCrud } from "@/composables/recipeMasterData.ts";

const crud = useUnitsCrud();
</script>

<template>
  <InlineEditList :crud item-label="Einheit" items-label="Einheiten" placeholder="z. B. Gramm, Liter, Prise" :icon="Ruler" accent="teal" e2e="units" />
</template>
