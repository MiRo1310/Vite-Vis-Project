export const routes = [
  { path: "/", component: async () => await import("@/pages/Home.vue") },
  { path: "/Fenster", component: async () => await import("@/pages/Fenster.vue") },
  { path: "/:pathMatch(.*)", component: async () => await import("@/pages/error/ErrorPageNotFound.vue") },
];
