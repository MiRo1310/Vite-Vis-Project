<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import { Entries } from "@/types/types.ts";

const props = defineProps<{
  entries: Entries[];
  title: string;
  class?: string;
}>();
</script>
<template>
  <Card :class="[props.class, 'p-2']">
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
          <span v-else
            >{{ entry.value }} <span>{{ entry.unit }}</span></span
          >
        </div>
      </div>
    </CardContent>
  </Card>
</template>
