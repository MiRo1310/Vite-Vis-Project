<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import { recipeAccentClasses, type RecipeManageTab, recipeManageTabs } from "@/constants/recipe.ts";
import { Settings2 } from "@lucide/vue";
import Products from "@/pages/recipe/products.vue";
import Units from "@/pages/recipe/units.vue";
import ProductCategories from "@/pages/recipe/product-categories.vue";
import RecipeCategories from "@/pages/recipe/recipe-categories.vue";

const tab = useRouteQuery<RecipeManageTab>("tab", "products");
</script>

<template>
  <div class="h-full flex flex-col gap-3">
    <RecipePageHeader title="Verwaltung" subtitle="Produkte, Einheiten und Kategorien pflegen" :icon="Settings2" accent="lavender" />

    <Tabs v-model="tab" class="flex-1 min-h-0 flex flex-col">
      <div class="overflow-x-auto -mx-1 px-1 pb-1 shrink-0">
        <TabsList class="h-11 rounded-full p-1">
          <TabsTrigger
            v-for="item in recipeManageTabs"
            :key="item.value"
            :value="item.value"
            :class="`rounded-full h-9 px-4 data-[state=active]:shadow-none ${recipeAccentClasses[item.accent].active}`"
            v-e2e="`recipe-manage-tab-${item.value}`"
          >
            {{ item.label }}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="products" class="flex-1 min-h-0 mt-2">
        <Products />
      </TabsContent>
      <TabsContent value="units" class="flex-1 min-h-0 mt-2">
        <Units />
      </TabsContent>
      <TabsContent value="productCategories" class="flex-1 min-h-0 mt-2">
        <ProductCategories />
      </TabsContent>
      <TabsContent value="recipeCategories" class="flex-1 min-h-0 mt-2">
        <RecipeCategories />
      </TabsContent>
    </Tabs>
  </div>
</template>
