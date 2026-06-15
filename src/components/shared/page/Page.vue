<script setup lang="ts">
import DarkMode from "@/components/layout/DarkMode.vue";
import { Button } from "@/components/shared/button/button.variants";
import { routes } from "@/router/routes.ts";

defineProps<{ title: string }>();
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex items-center gap-2 shrink-0">
      <span class="text-sm font-semibold">{{ title }}</span>

      <div class="ml-auto flex items-center gap-1">
        <slot name="header" />

        <div class="flex items-center rounded-lg border bg-card shadow-xs overflow-hidden">
          <Button variant="ghost" class="rounded-none border-r" as-child>
            <RouterLink :to="routes.navigation.path">Navigation</RouterLink>
          </Button>
          <Button variant="ghost" size="default" class="rounded-none border-r" as-child>
            <RouterLink :to="routes.home.path">Home </RouterLink>
          </Button>
          <DarkMode small class="rounded-none w-24" />
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
