<script setup lang="ts">
import PageHeader from "@/components/layout/PageHeader.vue";
import { Card } from "@/components/shared/card";

defineProps<{ title: string }>();
</script>

<template>
  <Card styling="small" color="primary" class="overflow-hidden h-full flex flex-col gap-2">
    <div class="text-cardCustom-foreground text-base font-bold flex justify-between items-center flex-wrap">
      <span>{{ title }}</span>
      <PageHeader>
        <slot name="header" />
      </PageHeader>
    </div>
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </Card>
</template>
