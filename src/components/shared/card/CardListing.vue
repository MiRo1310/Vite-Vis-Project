<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import { Entries } from "@/types/types.ts";
import ValueWithUnit from "@/components/shared/ValueWithUnit.vue";

const props = defineProps<{
  entries: Entries[];
  title: string;
  class?: string;
}>();
</script>
<template>
  <Card :class="[props.class]" color="primary" styling="small">
    <CardHeader>
      <CardTitle styling="default">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-for="(entry, i) in entries" :key="i" class="flex justify-between items-center text-cardCustom-text/70 font-bold text-xs">
        <div>
          <p>{{ entry.title }}</p>
        </div>
        <div class="ml-4 pb-0">
          <BoolIcon v-if="entry.type === 'boolean'" :value="entry.value as boolean" />
          <ValueWithUnit v-else :value="String(entry.value)" :unit="entry.unit" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
