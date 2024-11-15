export const routes = [
  { path: "/", component: async () => await import("@/pages/home.vue") },
  { path: "/fenster", component: async () => await import("@/pages/window.vue") },
  { path: "/heating", component: async () => await import("@/pages/heating.vue") },
  { path: "/pv", component: async () => await import("@/pages/pv.vue") },
  { path: "/logs", component: async () => await import("@/pages/logs.vue") },
  { path: "/kalendar", name: "calendar", component: async () => await import("@/pages/calendar.vue") },
  { path: "/iobroker-info", name: "iobroker-info", component: async () => await import("@/pages/iobroker-info.vue") },
  { path: "/:pathMatch(.*)", component: async () => await import("@/pages/error-page-not-found.vue") }
];
