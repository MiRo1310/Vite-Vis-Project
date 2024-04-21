export const routes = [
  { path: "/", component: async () => await import("@/pages/Home.vue") },
  { path: "/Fenster", component: async () => await import("@/pages/Fenster.vue") },
  { path: "/heating", component: async () => await import("@/pages/heating.vue") },
  { path: "/pv", component: async () => await import("@/pages/PV.vue") },
  { path: "/:pathMatch(.*)", component: async () => await import("@/pages/error/ErrorPageNotFound.vue") },
];
