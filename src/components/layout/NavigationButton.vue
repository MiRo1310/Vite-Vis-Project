<script setup lang="ts">
import { NavigationType } from "@/types/types.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button";

defineProps<{ navigation: NavigationType }>();
</script>

<template>
  <RouterLink :to="navigation.link">
    <Button as="div" variant="outline" size="full">
      <div class="flex justify-between w-full">
        <span>{{ navigation.text }}</span>
        <span class="relative">
          <Badge v-if="navigation.badge?.value" :value="navigation.badge.value" :color="navigation.badge.color" class="absolute right-0" />
          <Component :is="navigation.icon" class="w-10 h-10 mr-2" />
        </span>
      </div>
    </Button>
  </RouterLink>
</template>
