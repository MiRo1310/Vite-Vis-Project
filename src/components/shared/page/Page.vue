<script setup lang="ts">
import PageHeader from "@/components/layout/PageHeader.vue";
import { Card } from "@/components/shared/card";

defineProps<{ title: string }>();
</script>

<template>
  <PageHeader>
    <Card styling="small" color="primary" class="overflow-hidden h-[calc(100%-74px)] flex flex-col">
      <div v-if="title" class="text-cardCustom-foreground text-base font-bold flex justify-between items-center">
        <span>{{ title }}</span>
      </div>
      <div class="flex-1 overflow-y-auto mt-2">
        <slot />
      </div>
    </Card>
  </PageHeader>
</template>
