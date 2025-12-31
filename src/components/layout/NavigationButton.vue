<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { NavigationType } from "@/types/types.ts";
import Badge from "@/components/shared/badge/Badge.vue";

defineProps<{ navigation: NavigationType }>();
</script>

<template>
  <Card styling="blueDark" class="col-span-1 hover:bg-cardCustom/70 hover:border-cardCustom-border">
    <RouterLink :to="navigation.link">
      <CardHeader>
        <CardTitle styling="shadcn">
          <div class="flex justify-between">
            <span>{{ navigation.text }}</span>
            <span class="relative">
              <Badge v-if="navigation.badge?.value" :value="navigation.badge.value" :color="navigation.badge.color" class="absolute right-0" />
              <Component :is="navigation.icon" class="w-12 h-12" />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </RouterLink>
  </Card>
</template>
