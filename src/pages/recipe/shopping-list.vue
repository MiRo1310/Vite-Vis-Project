<script setup lang="ts">
import { computed, ref } from "vue";
import { BookOpen, PlugZap, ShoppingBasket, X } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast/use-toast";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import { useShoppingListEntries, useShoppingListSink } from "@/composables/shoppingList.ts";
import { toLocaleTime } from "@/lib/time.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";
import { type AlexaList } from "@/types/types.ts";
import { Logger } from "@/lib/logger.ts";

const { toast } = useToast();
const sink = useShoppingListSink();
const { entries, remove } = useShoppingListEntries();

const sortedEntries = computed(() => [...entries.value].sort((a, b) => a.pos - b.pos));
const removing = ref<string | null>(null);

const removeEntry = async (entry: AlexaList) => {
  removing.value = entry.id;
  try {
    const done = await remove(entry);
    if (!done) {
      toast({ title: "Keine Verbindung", description: "ioBroker ist gerade nicht erreichbar.", variant: "destructive" });
    }
  } catch (e) {
    Logger.error("Einkaufsliste: Entfernen fehlgeschlagen", e);
    toast({ title: "Hat nicht geklappt", description: entry.name, variant: "destructive" });
  } finally {
    removing.value = null;
  }
};
</script>

<template>
  <div class="h-full overflow-y-auto pb-6">
    <div class="flex flex-col gap-4 max-w-2xl mx-auto">
      <RecipePageHeader
        title="Einkaufsliste"
        :subtitle="entries.length ? `${entries.length} Artikel auf der Alexa-Liste` : 'Deine Alexa-Einkaufsliste'"
        :icon="ShoppingBasket"
        accent="teal"
      />

      <div v-if="!sink.isConnected" :class="['rounded-2xl px-4 py-3 flex gap-2.5 text-sm', recipeAccentClasses.mango.soft]">
        <PlugZap class="h-4 w-4 shrink-0 mt-0.5" />
        <span>Zutaten aus Rezepten landen hier, sobald die Verbindung zur Alexa-Liste eingerichtet ist. Anzeigen und Entfernen klappt schon.</span>
      </div>

      <Card v-if="sortedEntries.length" class="py-0 gap-0 rounded-2xl border-border/60 overflow-hidden">
        <ul class="divide-y divide-border/60">
          <li v-for="entry in sortedEntries" :key="entry.id" class="flex items-center gap-3 px-4 min-h-14" v-e2e="'shopping-list-entry'">
            <span :class="['h-2.5 w-2.5 rounded-full shrink-0', recipeAccentClasses.teal.solid]" />
            <div class="flex-1 min-w-0 py-2">
              <p class="font-medium truncate">{{ entry.name }}</p>
              <p class="text-xs text-muted-foreground">{{ toLocaleTime(entry.time) }}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-lg"
              class="rounded-full text-muted-foreground hover:text-destructive"
              :disabled="removing === entry.id"
              :aria-label="`${entry.name} entfernen`"
              @click="removeEntry(entry)"
            >
              <X class="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </Card>

      <EmptyState v-else :icon="ShoppingBasket" accent="teal" title="Die Liste ist leer" description="Im Rezept über den Korb-Button Zutaten auswählen und hierher schicken.">
        <Button as-child variant="outline" class="rounded-full">
          <RouterLink :to="{ name: routes.recipes.name }"><BookOpen class="h-4 w-4" /> Zu den Rezepten</RouterLink>
        </Button>
      </EmptyState>
    </div>
  </div>
</template>
