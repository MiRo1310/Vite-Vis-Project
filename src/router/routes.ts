export const routes = [
  { path: "/", component: async () => await import("@/pages/home.vue") },
  { path: "/fenster", component: async () => await import("@/pages/window.vue") },
  { path: "/heizung", component: async () => await import("@/pages/heating.vue") },
  { path: "/pv", component: async () => await import("@/pages/pv.vue") },
  { path: "/:pathMatch(.*)", component: async () => await import("@/pages/error-page-not-found.vue") },
];
