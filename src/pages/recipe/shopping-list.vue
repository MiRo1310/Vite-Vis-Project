<script setup lang="ts">
import { computed } from "vue";
import { ShoppingBasket } from "@lucide/vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import AlexaListTable from "@/components/shared/alexa-list/AlexaListTable.vue";
import { Card, CardContent } from "@/components/ui/card";

const { iobroker } = useIobrokerStore();

const shoppingList = computed(() => iobroker.alexaLists.shoppingListActive.parsed([]));
</script>

<template>
  <div class="h-full overflow-y-auto pb-4 flex flex-col gap-3">
    <RecipePageHeader
      title="Einkaufsliste"
      :subtitle="shoppingList.length ? `${shoppingList.length} Artikel auf der Alexa-Liste` : 'Deine Alexa-Einkaufsliste'"
      :icon="ShoppingBasket"
      accent="teal"
    />

    <Card v-if="shoppingList.length" class="py-0 gap-0 overflow-hidden">
      <CardContent class="px-2 py-1">
        <AlexaListTable :list="shoppingList" />
      </CardContent>
    </Card>
    <EmptyState v-else :icon="ShoppingBasket" accent="teal" title="Die Liste ist leer" description="Zutaten aus einem Rezept kannst du bald direkt hierher schicken." />
  </div>
</template>
