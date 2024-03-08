export const routes = [
  { path: "/", component: () => import("@/pages/Home.vue") },
  { path: "/Rolladen", component: () => import("@/pages/Rolladen.vue") },
  { path: "/:pathMatch(.*)", component: () => import("@/pages/error/ErrorPageNotFound.vue") },
];
