export const routes = [
  {
    path: "/",
    component: async () => await import("@/pages/page.vue"),
    children: [
      { path: "/", component: async () => await import("@/pages/home.vue") },
      { path: "/alexa", component: async () => await import("@/pages/alexa.vue") },
      {
        path: "/battery",
        name: "battery",
        component: async () => await import("@/pages/battery.vue"),
      },
      {
        path: "/diagrams",
        name: "diagrams",
        component: async () => await import("@/pages/diagrams.vue"),
      },
      {
        path: "/fenster",
        component: async () => await import("@/pages/window.vue"),
      },
      {
        path: "/heating",
        component: async () => await import("@/pages/heating.vue"),
      },
      {
        path: "/iobroker-info",
        name: "iobroker-info",
        component: async () => await import("@/pages/iobroker-info.vue"),
      },
      {
        path: "/kalendar",
        name: "calendar",
        component: async () => await import("@/pages/calendar.vue"),
      },
      {
        path: "/light",
        name: "light",
        component: async () => await import("@/pages/light.vue"),
      },
      { path: "/logs", component: async () => await import("@/pages/logs.vue") },
      { path: "/pv", component: async () => await import("@/pages/pv.vue") },
    ],
  },

  {
    path: "/recipe-app",
    redirectTo: "/recipe",
    component: async () => await import("@/pages/recipe-app.vue"),
    children: [
      { path: "/produkte", name: "products", component: () => import("@/pages/products.vue") },

      {
        path: "/rezepte",
        name: "recipe",
        component: () => import("@/pages/recipe.vue"),
        children: [
          {
            path: "/:recipeId",
            name: "recipe-details",
            component: () => import("@/pages/recipe-details.vue"),
            props: true,
          },
        ],
      },
      { path: "/neues_rezepte/:id?", name: "new-recipe", params: true, component: () => import("@/pages/new-recipe.vue") },
    ],
  },

  {
    path: "/:pathMatch(.*)",
    component: async () => await import("@/pages/error-page-not-found.vue"),
  },
];
