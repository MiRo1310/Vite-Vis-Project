import { createRouter, createWebHistory, RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { routing } from "@/router/routes.ts";
import { ref } from "vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: routing,
});

export const previousRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(null);

router.beforeEach((_, from) => {
  previousRoute.value = from;
});
