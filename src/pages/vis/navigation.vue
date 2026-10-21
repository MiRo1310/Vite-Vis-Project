<script setup lang="ts">
import NavigationButton from "@/components/layout/NavigationButton.vue";
import { type NavigationsBadge, type NavigationItem } from "@/types/types.ts";
import { batteryList } from "@/composables/battery.ts";
import { computed } from "vue";
import { getOpenWindows } from "@/composables/windows.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import { getActiveLights } from "@/composables/lights.ts";
import { routes, type TNavigationRoute } from "@/router/routes.ts";

const navigations = computed((): NavigationItem[] => {
  const home: NavigationItem = { icon: routes.home.icon, text: routes.home.text, to: routes.home.path };
  const navigationItem: NavigationItem[] = Object.values(routes)
    .filter((route): route is TNavigationRoute => route.addToNavigation)
    .map((route) => ({ icon: route.icon, text: route.text, to: route.path }));

  addBadges(navigationItem, routes.window.path, [{ value: getOpenWindows.value, color: "yellow" }]);
  addBadges(navigationItem, routes.light.path, [{ value: getActiveLights.value, color: "yellow" }]);
  addBadges(navigationItem, routes.battery.path, [
    { value: batteryList.value.reduce((prev, curr) => prev + (curr.lowBat ? 1 : 0), 0), color: "orange" },
    {
      value: batteryList.value.reduce(
        (prev, curr) => prev + (curr.timestamp && curr.timestamp < new Date().getTime() - 30 * 60 * 60 * 1000 ? 1 : 0),
        0,
      ),
      color: "red",
      class: "animate-pulse",
    },
  ]);

  navigationItem.sort((a, b) => {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  });

  navigationItem.unshift(home);
  return navigationItem;
});

function addBadges(array: NavigationItem[], path: string, badges: NavigationsBadge[]) {
  const el = array.find((route) => route.to === path);
  if (!el) {
    return;
  }
  el.badges = badges;
}
</script>

<template>
  <div class="h-[98vh] overflow-auto">
    <div class="navigation grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
      <template v-for="navigation in navigations" :key="navigation.to">
        <NavigationButton :navigation />
      </template>
      <DarkMode title />
    </div>
  </div>
</template>
