import { routes } from "@/router/routes.ts";
import { type RouteLocationGeneric } from "vue-router";
import { type RecipeManageTab } from "@/constants/recipe.ts";

const manageRedirect = (tab: RecipeManageTab) => (to: RouteLocationGeneric) => ({
  name: routes.recipeManage.name,
  query: { ...to.query, tab },
});

export const routing = [
  {
    path: "/",
    component: async () => await import("@/pages/vis/page.vue"),
    children: [
      { component: async () => await import("@/pages/vis/home.vue"), ...routes.home },
      { component: async () => await import("@/pages/vis/navigation.vue"), ...routes.navigation },
      { component: async () => await import("@/pages/vis/alexa.vue"), ...routes.alexa },
      { component: async () => await import("@/pages/vis/battery.vue"), ...routes.battery },
      { component: async () => await import("@/pages/vis/diagrams.vue"), ...routes.diagrams },
      { component: async () => await import("@/pages/vis/lists.vue"), ...routes.lists },
      { component: async () => await import("@/pages/vis/rooms.vue"), ...routes.window },
      { component: async () => await import("@/pages/vis/heating.vue"), ...routes.heating },
      { component: async () => await import("@/pages/vis/heating-control.vue"), ...routes.heatingControl },
      { component: async () => await import("@/pages/vis/iobroker-updates-and-news.vue"), ...routes.iobrokerInfo },
      { component: async () => await import("@/pages/vis/calendar.vue"), ...routes.calender },
      { component: async () => await import("@/pages/vis/light.vue"), ...routes.light },
      { component: async () => await import("@/pages/vis/logs.vue"), ...routes.logs },
      { component: async () => await import("@/pages/vis/pv.vue"), ...routes.pv },
      { component: async () => await import("@/pages/vis/tankerkoenig.vue"), ...routes.tanker_koenig },
      { component: async () => await import("@/pages/vis/energy.vue"), ...routes.energy },
      { component: async () => await import("@/pages/vis/maps.vue"), ...routes.maps },
      { component: async () => await import("@/pages/vis/heat-pump.vue"), ...routes.heatPump },
      { component: async () => await import("@/pages/vis/system.vue"), ...routes.system },
      { component: async () => await import("@/pages/vis/watt-pilot.vue"), ...routes.wattPilot },
      { component: async () => await import("@/pages/vis/notifications.vue"), ...routes.notifications },
      { component: async () => await import("@/pages/vis/air-conditioner.vue"), ...routes.airConditioner },
      { component: async () => await import("@/pages/vis/page-details.vue"), ...routes.pageDetails },
      { component: async () => await import("@/pages/vis/pool.vue"), ...routes.pool },
      { component: async () => await import("@/pages/vis/lawn-mover.vue"), ...routes.lawnMover },
    ],
  },
  {
    redirect: { name: routes.recipes.name },
    component: async () => await import("@/pages/recipe/recipe-app.vue"),
    ...routes.recipeApp,
    children: [
      { component: () => import("@/pages/recipe/recipe-manage.vue"), ...routes.recipeManage },
      // Alte Stammdaten-Routen leiten auf den passenden Tab der Verwaltung um (Query wie ?productId= bleibt erhalten)
      { redirect: manageRedirect("products"), ...routes.products },
      { redirect: manageRedirect("units"), ...routes.recipeUnits },
      { redirect: manageRedirect("productCategories"), ...routes.productCategories },
      { redirect: manageRedirect("recipeCategories"), ...routes.recipeCategories },
      { component: () => import("@/pages/recipe/shopping-list.vue"), ...routes.shoppingList },
      { component: () => import("@/pages/recipe/recipes.vue"), ...routes.recipes },
      { component: () => import("@/pages/recipe/recipe-details.vue"), props: true, ...routes.recipeDetails },
      { props: true, component: () => import("@/pages/recipe/new-recipe.vue"), ...routes.newRecipe },
      { props: true, component: () => import("@/pages/recipe/edit-recipe.vue"), ...routes.editRecipe },
    ],
  },
  // Kochmodus bewusst ohne Rezept-Layout: Vollbild ohne Kopfzeile und Bottom-Nav
  { props: true, component: () => import("@/pages/recipe/cooking-mode.vue"), ...routes.cookingMode },
  { component: async () => await import("@/pages/finance/listing.vue"), ...routes.finance },
  { component: async () => await import("@/pages/finance/addresses.vue"), ...routes.addresses },
  { component: async () => await import("@/pages/finance/description.vue"), ...routes.description },
  {
    path: "/:pathMatch(.*)*",
    component: async () => await import("@/pages/vis/error-page-not-found.vue"),
  },
];
