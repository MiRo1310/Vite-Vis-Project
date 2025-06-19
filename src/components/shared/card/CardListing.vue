<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";
import { Entries } from "@/types/types.ts";

const props = defineProps<{
  entries: Entries[];
  title: string;
  class?: string;
}>();
</script>
<template>
  <Card styling="light" :class="[props.class, 'inline-block']">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="default_card mx-2 mb-2">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="flex-between text-accent-foreground/50 font-bold text-xs"
      >
        <div>
          <p>{{ entry.title }}</p>
        </div>
        <div class="ml-4 pb-0">
          <BoolIcon
            v-if="entry.type === 'boolean'"
            :value="entry.value as boolean"
          />
          <span v-else
            >{{ entry.value }} <span>{{ entry.unit }}</span></span
          >
        </div>
      </div>
    </CardContent>
  </Card>
</template>
