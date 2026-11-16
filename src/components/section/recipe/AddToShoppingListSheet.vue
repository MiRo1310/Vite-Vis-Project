<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { Loader2, PlugZap, ShoppingBasket } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast/use-toast";
import { type RecipeDetails } from "@/composables/querys/recipeDetails.ts";
import { useShoppingListEntries, useShoppingListSink } from "@/composables/shoppingList.ts";
import {
  formatShoppingItem,
  ingredientsToShoppingItems,
  matchIngredientsWithShoppingList,
  type ShoppingListItem,
  shoppingListMatchKey,
} from "@/lib/shopping-list.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";
import { Logger } from "@/lib/logger.ts";

const props = defineProps<{ recipe: RecipeDetails; portions: number }>();
const open = defineModel<boolean>("open", { default: false });

const { toast } = useToast();
const sink = useShoppingListSink();
const { names: listNames } = useShoppingListEntries();
const isDesktop = useMediaQuery("(min-width: 768px)");

const items = computed(() => ingredientsToShoppingItems(props.recipe.recipeProducts, props.recipe.portions, props.portions, props.recipe.id));
const onList = computed(() => matchIngredientsWithShoppingList(items.value, listNames.value));

const isOnList = (item: ShoppingListItem) => onList.value.has(shoppingListMatchKey(item.name, item.unit));

const selected = ref<Set<number>>(new Set());
const sending = ref(false);

// Beim Öffnen alles vorauswählen, was noch nicht auf der Liste steht
watch(open, (isOpen) => {
  if (!isOpen) {
    return;
  }
  selected.value = new Set(items.value.map((_, index) => index).filter((index) => !isOnList(items.value[index])));
});

const toggle = (index: number) => {
  const next = new Set(selected.value);
  if (next.has(index)) {
    next.delete(index);
  } else {
    next.add(index);
  }
  selected.value = next;
};

const allSelected = computed(() => items.value.length > 0 && selected.value.size === items.value.length);
const toggleAll = () => {
  selected.value = allSelected.value ? new Set() : new Set(items.value.map((_, index) => index));
};

const submit = async () => {
  const chosen = items.value.filter((_, index) => selected.value.has(index));
  if (!chosen.length) {
    return;
  }
  sending.value = true;
  try {
    await sink.add(chosen);
    toast({
      title: "Auf die Einkaufsliste gesetzt",
      description: `${chosen.length} ${chosen.length === 1 ? "Zutat" : "Zutaten"} aus „${props.recipe.name}“`,
    });
    open.value = false;
  } catch (e) {
    Logger.error("Einkaufsliste: Hinzufügen fehlgeschlagen", e);
    toast({ title: "Hat nicht geklappt", description: "Die Zutaten konnten nicht übertragen werden.", variant: "destructive" });
  } finally {
    sending.value = false;
  }
};
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent
      :side="isDesktop ? 'right' : 'bottom'"
      :class="isDesktop ? 'w-full sm:max-w-md p-0 gap-0 flex flex-col' : 'max-h-[85dvh] rounded-t-3xl p-0 gap-0 flex flex-col'"
    >
      <SheetHeader class="px-5 pt-5 pb-3 border-b border-border/60 bg-linear-to-br from-recipe-teal/20 via-recipe-basil/10 to-transparent">
        <SheetTitle class="flex items-center gap-2"><ShoppingBasket class="h-5 w-5" /> Auf die Einkaufsliste</SheetTitle>
        <SheetDescription>für {{ portions }} {{ portions === 1 ? "Portion" : "Portionen" }} · {{ recipe.name }}</SheetDescription>
      </SheetHeader>

      <div class="flex-1 min-h-0 overflow-y-auto px-5 py-3">
        <div v-if="!sink.isConnected" :class="['rounded-xl px-3 py-2.5 mb-3 flex gap-2 text-sm', recipeAccentClasses.mango.soft]">
          <PlugZap class="h-4 w-4 shrink-0 mt-0.5" />
          <span>Die Verbindung zur Alexa-Liste fehlt noch. Du kannst schon auswählen, übertragen wird erst nach der Einrichtung.</span>
        </div>

        <button type="button" class="text-sm font-medium text-muted-foreground hover:text-foreground mb-1" @click="toggleAll">
          {{ allSelected ? "Keine auswählen" : "Alle auswählen" }}
        </button>

        <ul class="divide-y divide-border/60">
          <li v-for="(item, index) in items" :key="`${item.name}-${item.unit}`" class="flex items-center gap-3 min-h-12" v-e2e="'shopping-item'">
            <Checkbox
              :id="`shopping-${index}`"
              :model-value="selected.has(index)"
              class="h-5 w-5 rounded-md border-muted-foreground/40 data-[state=checked]:bg-recipe-teal data-[state=checked]:border-recipe-teal data-[state=checked]:text-white"
              @update:model-value="toggle(index)"
            />
            <label :for="`shopping-${index}`" class="flex-1 min-w-0 cursor-pointer select-none py-2">{{ formatShoppingItem(item) }}</label>
            <span
              v-if="isOnList(item)"
              :class="['rounded-full px-2 h-6 inline-flex items-center text-xs font-medium shrink-0', recipeAccentClasses.teal.soft]"
            >
              schon drauf
            </span>
          </li>
        </ul>
      </div>

      <div class="px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-border/60">
        <Button
          class="w-full h-12 rounded-2xl text-base"
          :class="recipeAccentClasses.teal.solid"
          :disabled="!selected.size || sending"
          v-e2e="'shopping-submit'"
          @click="submit"
        >
          <Loader2 v-if="sending" class="h-4 w-4 animate-spin" />
          <ShoppingBasket v-else class="h-4 w-4" />
          {{ selected.size }} {{ selected.size === 1 ? "Zutat" : "Zutaten" }} hinzufügen
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
