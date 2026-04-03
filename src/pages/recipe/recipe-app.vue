<script setup lang="ts">
import Toaster from "../../components/ui/toast/Toaster.vue";
import ResponsiveNavigation from "@/components/shared/responsiveNav/ResponsiveNavigation.vue";
import { INavigation } from "@/components/shared/responsiveNav";
import { routes } from "@/router/routes.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import { githubNavigation } from "@/config/config.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { computed } from "vue";

const recipeStore = useRecipeStore();

const navigations = computed((): INavigation[] => {
  const recipeId = recipeStore.getLastRecipe?.id;
  const nav: INavigation[] = [
    { label: "VIS", routeName: routes.home.name },
    { label: "Rezepte", routeName: routes.recipes.name },
    { label: "Rezept erstellen", routeName: routes.newRecipe.name },
    { label: "Zwischen gespeichertes Rezept bearbeiten", disabled: !recipeId, routeName: routes.editRecipe.name, params: { id: recipeId } },
    { label: "Produkte", routeName: routes.recipeProducts.name },
    { label: "Einheiten", routeName: routes.recipeUnits.name },
    { label: "Produkt Kategorien", routeName: routes.productCategories.name },
    { label: "Rezept Kategorien", routeName: routes.recipeCategories.name },
    { ...githubNavigation },
  ];
  const id = recipeStore.getLastRecipe?.id;
  if (id) {
    nav.push({ label: "Zurück zum letzten Rezept", routeName: routes.recipeDetails.name, params: { recipeId: id } });
  }

  return nav;
});
</script>

<template>
  <Suspense>
    <div class="relative w-full h-screen bg-cover bg-center">
      <div class="fixed top-0 flex p-2 space-x-2 flex-wrap w-full z-50 border-b-2 border-accent items-center">
        <ResponsiveNavigation :navigations />

        <DarkMode small />
      </div>

      <div class="pt-13.25 h-[calc(100vh-14px)] overflow-hidden w-full inline-block px-2 mt-2">
        <router-view />
      </div>
    </div>
  </Suspense>
  <Toaster />
</template>
