<script setup lang="ts">
import { NavigationType } from "@/types/types.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button";

defineProps<{ navigation: NavigationType; small?: boolean }>();
</script>

<template>
  <RouterLink :to="navigation.link">
    <Button as="div" variant="outline" :size="small ? 'full' : 'fullXxl'">
      <div class="flex justify-between w-full">
        <span>{{ navigation.text }}</span>
        <div class="relative">
          <div class="absolute right-10 flex items-center gap-2">
            <div v-for="(badge, index) in navigation.badges ?? []" :key="index">
              <Badge v-if="badge.value" :value="badge.value" :color="badge.color" :class="badge.class" />
            </div>
          </div>
          <Component :is="navigation.icon" :class="small ? '' : 'w-10 h-10'" />
        </div>
      </div>
    </Button>
  </RouterLink>
</template>
