<script setup lang="ts">
import Toaster from "../../components/ui/toast/Toaster.vue";
import { routes } from "@/router/routes.ts";
import DarkMode from "@/components/layout/DarkMode.vue";
import { githubNavigation } from "@/config/config.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/shared/button/button.variants";
import {
  ArrowLeft,
  BookOpen,
  Github,
  LayoutGrid,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Ruler,
  Tag,
  UtensilsCrossed,
} from "lucide-vue-next";

const recipeStore = useRecipeStore();
const route = useRoute();

const lastRecipe = computed(() => recipeStore.getLastRecipe);

const navClass = (routeName: string): string =>
  route.name === routeName
    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/15 hover:text-orange-600 dark:hover:text-orange-400"
    : "";
</script>

<template>
  <Suspense>
    <div class="relative w-full h-screen">
      <!-- Navigation Header -->
      <header class="fixed top-0 z-50 w-full h-12 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div class="flex items-center gap-1 px-3 h-full">

          <!-- Brand -->
          <div class="flex items-center gap-2 mr-3 shrink-0">
            <div class="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shrink-0">
              <UtensilsCrossed class="h-3.5 w-3.5 text-white" />
            </div>
            <span class="font-semibold text-sm hidden sm:block">Kochbuch</span>
          </div>

          <!-- Main Navigation -->
          <nav class="flex items-center gap-0.5 flex-1 min-w-0">
            <Button variant="ghost" size="sm" as-child :class="navClass(routes.recipes.name)">
              <RouterLink :to="{ name: routes.recipes.name }" class="flex items-center">
                <BookOpen class="h-3.5 w-3.5 mr-1.5 shrink-0" />
                <span class="hidden sm:inline">Rezepte</span>
              </RouterLink>
            </Button>
            <Button variant="ghost" size="sm" as-child :class="navClass(routes.newRecipe.name)">
              <RouterLink :to="{ name: routes.newRecipe.name }" class="flex items-center">
                <Plus class="h-3.5 w-3.5 mr-1.5 shrink-0" />
                <span class="hidden sm:inline">Neu</span>
              </RouterLink>
            </Button>
            <Button
              v-if="lastRecipe"
              variant="ghost"
              size="sm"
              as-child
              :class="navClass(routes.editRecipe.name)"
            >
              <RouterLink
                :to="{ name: routes.editRecipe.name, params: { id: lastRecipe.id } }"
                class="flex items-center min-w-0"
              >
                <Pencil class="h-3.5 w-3.5 mr-1.5 shrink-0" />
                <span class="hidden sm:inline truncate max-w-36">{{ lastRecipe.name }}</span>
              </RouterLink>
            </Button>
          </nav>

          <!-- Right Side -->
          <div class="flex items-center gap-1 shrink-0">
            <!-- Back to last recipe detail -->
            <Button
              v-if="lastRecipe"
              variant="ghost"
              size="sm"
              as-child
              class="hidden md:flex"
              :class="navClass(routes.recipeDetails.name)"
            >
              <RouterLink
                :to="{ name: routes.recipeDetails.name, params: { recipeId: lastRecipe.id } }"
                class="flex items-center"
              >
                <ArrowLeft class="h-3.5 w-3.5 mr-1.5 shrink-0" />
                Zurück
              </RouterLink>
            </Button>

            <!-- Management Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-52">
                <DropdownMenuLabel class="text-xs font-normal text-muted-foreground">Verwaltung</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RouterLink :to="{ name: routes.products.name }" class="flex items-center gap-2 w-full">
                    <Package class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    Produkte
                  </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RouterLink :to="{ name: routes.recipeUnits.name }" class="flex items-center gap-2 w-full">
                    <Ruler class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    Einheiten
                  </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RouterLink :to="{ name: routes.productCategories.name }" class="flex items-center gap-2 w-full">
                    <Tag class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    Produkt Kategorien
                  </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RouterLink :to="{ name: routes.recipeCategories.name }" class="flex items-center gap-2 w-full">
                    <Tag class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    Rezept Kategorien
                  </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RouterLink :to="{ name: routes.home.name }" class="flex items-center gap-2 w-full">
                    <LayoutGrid class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    VIS Dashboard
                  </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem v-if="githubNavigation.href">
                  <a :href="githubNavigation.href" target="_blank" class="flex items-center gap-2 w-full">
                    <Github class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    GitHub
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DarkMode small />
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="pt-12 h-[calc(100vh-10px)] overflow-hidden px-3">
        <router-view />
      </div>
    </div>
  </Suspense>
  <Toaster />
</template>
