<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { routes } from "@/router/routes.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import { githubNavigation } from "@/config/config.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/shared/button/button.variants";
import { ArrowLeft, LayoutGrid, MoreHorizontal, Pencil, UtensilsCrossed } from "@lucide/vue";
import GithubIcon from "@/components/shared/icons/GithubIcon.vue";
import RecipeBottomNav from "@/components/shared/recipe/RecipeBottomNav.vue";
import { recipeAccentClasses, type RecipeNavItem, recipeNavItems } from "@/constants/recipe.ts";

const recipeStore = useRecipeStore();
const route = useRoute();

const lastRecipe = computed(() => recipeStore.getLastRecipe);

const isActive = (item: RecipeNavItem): boolean => {
  const name = String(route.name ?? "");
  return name === item.routeName || item.activeFor.includes(name);
};
</script>

<template>
  <Suspense>
    <div class="relative w-full h-dvh">
      <!-- Kopfzeile -->
      <header class="fixed top-0 z-50 w-full h-14 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div class="flex items-center gap-1 px-3 h-full">
          <!-- Marke -->
          <RouterLink :to="{ name: routes.recipes.name }" class="flex items-center gap-2 mr-3 shrink-0">
            <div
              class="h-8 w-8 rounded-xl bg-linear-to-br from-recipe-tomato via-recipe-primary to-recipe-mango flex items-center justify-center shrink-0 shadow-sm"
            >
              <UtensilsCrossed class="h-4 w-4 text-white" />
            </div>
            <span class="font-bold tracking-tight">Kochbuch</span>
          </RouterLink>

          <!-- Hauptnavigation (Desktop) -->
          <nav class="hidden md:flex items-center gap-1 flex-1 min-w-0">
            <RouterLink
              v-for="item in recipeNavItems"
              :key="item.routeName"
              :to="{ name: item.routeName }"
              class="flex items-center gap-1.5 rounded-full px-3 h-9 text-sm font-medium transition-colors"
              :class="isActive(item) ? recipeAccentClasses[item.accent].soft : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
            >
              <Component :is="item.icon" class="h-4 w-4 shrink-0" />
              {{ item.label }}
            </RouterLink>
          </nav>
          <div class="flex-1 md:hidden" />

          <!-- Rechte Seite -->
          <div class="flex items-center gap-1 shrink-0">
            <Button v-if="lastRecipe" variant="ghost" size="sm" as-child class="hidden lg:flex">
              <RouterLink :to="{ name: routes.recipeDetails.name, params: { recipeId: lastRecipe.id } }" class="flex items-center">
                <ArrowLeft class="h-4 w-4 mr-1.5 shrink-0" />
                Zurück
              </RouterLink>
            </Button>
            <Button v-if="lastRecipe" variant="ghost" size="sm" as-child>
              <RouterLink :to="{ name: routes.editRecipe.name, params: { id: lastRecipe.id } }" class="flex items-center min-w-0">
                <Pencil class="h-4 w-4 sm:mr-1.5 shrink-0 text-recipe-primary-fg" />
                <span class="hidden sm:inline truncate max-w-36">{{ lastRecipe.name }}</span>
              </RouterLink>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" aria-label="Mehr">
                  <MoreHorizontal class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-52">
                <DropdownMenuItem as-child>
                  <RouterLink :to="{ name: routes.home.name }" class="flex items-center gap-2 w-full">
                    <LayoutGrid class="h-4 w-4 text-muted-foreground shrink-0" />
                    VIS Dashboard
                  </RouterLink>
                </DropdownMenuItem>
                <template v-if="githubNavigation.href">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem as-child>
                    <a :href="githubNavigation.href" target="_blank" class="flex items-center gap-2 w-full">
                      <GithubIcon class="h-4 w-4 text-muted-foreground shrink-0" />
                      GitHub
                    </a>
                  </DropdownMenuItem>
                </template>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Etwas Luft zum Mehr-Menü, der Hell/Dunkel-Button hat als einziger einen Rahmen -->
            <DarkMode small class="ml-2" />
          </div>
        </div>
      </header>

      <!-- Inhalt: Seiten scrollen selbst (h-full + overflow-y-auto) -->
      <main class="h-dvh pt-16 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-2 overflow-hidden px-3 md:px-5">
        <router-view />
      </main>

      <RecipeBottomNav />
    </div>
  </Suspense>
  <Toaster />
</template>
