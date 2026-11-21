<script setup lang="ts">
import { computed, ref } from "vue";
import { LoaderCircle, Trash2 } from "@lucide/vue";
import { graphql } from "@/api/gql";
import apolloClient, { type ApolloOperationContext } from "@/apolloClient.ts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { findRecipesUsingProduct } from "@/lib/product.ts";
import { getUserErrorMessage } from "@/lib/error.ts";
import { Logger } from "@/lib/logger.ts";

/**
 * Produkt endgültig löschen. Vorher wird geprüft, in welchen Rezepten es vorkommt, und das im Dialog angezeigt.
 * Lehnt das Backend ab (z. B. weil das Produkt verwendet wird), erscheint dessen Meldung als Hinweis.
 */
const props = defineProps<{ productId: string; productName: string }>();
const emits = defineEmits<{ deleted: [] }>();

const { toast } = useToast();

const usageQuery = graphql(`
  query productUsageInRecipes($productId: UUID!) {
    # Filter im Backend: die Liste ist paginiert (Standard 10), ungefiltert würden Rezepte fehlen
    recipes(first: 50, where: { recipeProducts: { some: { productId: { eq: $productId } } } }) {
      nodes {
        id
        name
        recipeProducts {
          productId
        }
      }
    }
  }
`);

const removeProductMutation = graphql(`
  mutation removeProduct($id: UUID!) {
    removeProduct(id: $id)
  }
`);

/** Fehler zeigt diese Komponente selbst an */
const context: ApolloOperationContext = { silentErrors: true };

const dialogOpen = ref(false);
const checking = ref(false);
const deleting = ref(false);
const usedIn = ref<string[] | null>(null);

const description = computed(() => {
  if (usedIn.value === null) {
    return "Das Produkt wird endgültig gelöscht.";
  }
  if (!usedIn.value.length) {
    return "Das Produkt wird in keinem Rezept verwendet und wird endgültig gelöscht.";
  }
  const count = usedIn.value.length;
  return `Achtung: Das Produkt steckt in ${count} ${count === 1 ? "Rezept" : "Rezepten"} (${usedIn.value.join(", ")}). Dort fehlt es danach als Zutat – oder das Löschen wird abgelehnt.`;
});

/** Vor dem Dialog prüfen, wo das Produkt verwendet wird; schlägt das fehl, trotzdem fragen */
const askToDelete = async () => {
  checking.value = true;
  usedIn.value = null;
  try {
    const { data } = await apolloClient.query({ query: usageQuery, variables: { productId: props.productId }, fetchPolicy: "network-only", context });
    usedIn.value = findRecipesUsingProduct(data.recipes?.nodes ?? [], props.productId);
  } catch (error) {
    Logger.error("Produkt: Verwendung in Rezepten nicht ermittelbar", error);
  } finally {
    checking.value = false;
    dialogOpen.value = true;
  }
};

const remove = async () => {
  deleting.value = true;
  try {
    await apolloClient.mutate({
      mutation: removeProductMutation,
      variables: { id: props.productId },
      context,
      refetchQueries: ["GetProducts", "recipeEditorProducts"],
    });
    toast({ title: "Produkt gelöscht", description: props.productName });
    emits("deleted");
  } catch (error) {
    Logger.error("Produkt löschen fehlgeschlagen", error);
    toast({
      title: `„${props.productName}“ kann nicht gelöscht werden`,
      description: getUserErrorMessage(error, "Bitte versuch es noch einmal."),
      variant: "destructive",
    });
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    class="text-destructive hover:text-destructive hover:bg-destructive/10"
    :disabled="checking || deleting"
    v-e2e="'product-delete'"
    @click.prevent="askToDelete"
  >
    <LoaderCircle v-if="checking || deleting" class="h-4 w-4 animate-spin" />
    <Trash2 v-else class="h-4 w-4" />
    <span class="max-sm:sr-only">Löschen</span>
  </Button>

  <DialogConfirm v-model:dialog-open="dialogOpen" :title="`„${productName}“ löschen?`" :description variant="destructive" @update:confirm="remove" />
</template>
