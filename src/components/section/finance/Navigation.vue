<script setup lang="ts">
import DarkMode from "@/components/layout/DarkMode.vue";
import { routes } from "@/router/routes.ts";
import { type INavigation } from "@/components/shared/responsiveNav";
import { githubNavigation } from "@/config/config.ts";
import { Button } from "@/components/shared/button/button.variants";
import { useRoute } from "vue-router";

const route = useRoute();

const navigations: INavigation[] = [
  { label: "Hauptseite", routeName: routes.finance.name },
  { label: "Adressen", routeName: routes.addresses.name },
  { label: "Beschreibung", routeName: routes.description.name },
  { ...githubNavigation },
];
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <template v-for="(nav, index) in navigations" :key="index">
        <a v-if="nav.externalLink" :href="nav.href" target="_blank" :class="nav.class">
          <Button variant="outline" size="sm" as="div">{{ nav.label }}</Button>
        </a>
        <Button
          v-else
          variant="outline"
          size="sm"
          as-child
          :disabled="nav.disabled"
          :class="route.name === nav.routeName ? 'text-orange-600 dark:text-orange-400 font-medium border-orange-400' : ''"
        >
          <RouterLink :to="{ name: nav.routeName, params: { ...nav.params } }">
            {{ nav.label }}
          </RouterLink>
        </Button>
      </template>
    </div>
    <div class="flex items-center gap-2">
      <DarkMode small />
      <slot />
    </div>
  </div>
</template>
