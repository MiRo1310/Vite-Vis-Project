export const routes = [
  {
    path: "/",
    component: async () => await import("@/pages/page.vue"),
    children: [
      { path: "", name: "home", component: async () => await import("@/pages/home.vue") },
      { path: "/index", name: "index", component: async () => await import("@/pages/navigation.vue") },
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
        path: "/listen",
        name: "lists",
        component: async () => await import("@/pages/lists.vue"),
      },
      {
        path: "/fenster",
        component: async () => await import("@/pages/rooms.vue"),
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
    redirect: { name: "recipe" },
    component: async () => await import("@/pages/recipe/recipe-app.vue"),
    children: [
      { path: "/produkte", name: "products", component: () => import("@/pages/recipe/products.vue") },
      { path: "/einheiten", name: "units", component: () => import("@/pages/recipe/units.vue") },
      { path: "/kategorien", name: "categories", component: () => import("@/pages/recipe/categories.vue") },
      {
        path: "/rezepte",
        name: "recipe",
        component: () => import("@/pages/recipe/recipe.vue"),
        children: [
          {
            path: "/rezepte/:recipeId",
            name: "recipe-details",
            component: () => import("@/pages/recipe/recipe-details.vue"),
            props: true,
          },
        ],
      },
      { path: "/neues_rezepte/:id?", name: "new-recipe", props: true, component: () => import("@/pages/recipe/new-recipe.vue") },
    ],
  },
  {
    path: "/finance",
    name: "finance",
    component: async () => await import("@/pages/finance/listing.vue"),
  },

  { path: "/adressen", name: "addresses", component: async () => await import("@/pages/finance/addresses.vue") },
  { path: "/beschreibung", name: "descriptions", component: async () => await import("@/pages/finance/description.vue") },
  {
    path: "/:pathMatch(.*)*",
    component: async () => await import("@/pages/error-page-not-found.vue"),
  },
];
