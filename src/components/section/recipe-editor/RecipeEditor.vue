<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { onKeyStroke } from "@vueuse/core";
import { ArrowLeft, Carrot, Check, Eye, History, Info, ListOrdered, Loader2, Pencil, Plus, SearchX, Undo2 } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/use-toast";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";
import ProductEditorSheet from "@/components/section/products/ProductEditorSheet.vue";
import EditorSection from "@/components/section/recipe-editor/EditorSection.vue";
import RecipeBasicsEditor from "@/components/section/recipe-editor/RecipeBasicsEditor.vue";
import IngredientGroupEditor from "@/components/section/recipe-editor/IngredientGroupEditor.vue";
import StepListEditor from "@/components/section/recipe-editor/StepListEditor.vue";
import { createRecipeEditor, provideRecipeEditor, useEditorProducts } from "@/composables/recipeEditor.ts";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { countIngredients, isEmptyStep } from "@/lib/recipe-editor.ts";
import { getCategoryColor } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";

const props = defineProps<{ id?: string }>();

const router = useRouter();
const { toast } = useToast();
const recipeStore = useRecipeStore();

const editor = createRecipeEditor(props.id);
provideRecipeEditor(editor);
const { draft, loading, notFound, saving, restoredDraft, isDirty, errors, visibleErrors } = editor;

const { products, refetch: refetchProducts } = useEditorProducts();
const { result: categoriesResult } = useRecipeCategories();

onMounted(() => editor.load());
onBeforeUnmount(() => editor.keepDraftOnLeave());

// --- Anzeige ---
const categoryName = computed(() => categoriesResult.value?.recipeCategories.find((c) => c.id === draft.value.recipeCategoryId)?.name);
const accent = computed(() => getCategoryColor(categoryName.value));
const title = computed(() => draft.value.name.trim() || (props.id ? "Unbenanntes Rezept" : "Neues Rezept"));
const ingredientCount = computed(() => countIngredients(draft.value));
const stepCount = computed(() => draft.value.steps.filter((s) => !isEmptyStep(s)).length);
const groupLabels = computed(() => draft.value.groups.map((g, i) => ({ key: g.key, label: g.title.trim() || `Gruppe ${i + 1}` })));

const hasErrorIn = (prefix: string[]) => Object.keys(visibleErrors.value).some((key) => prefix.some((p) => key.startsWith(p)));
const basicsError = computed(() => hasErrorIn(["name", "portions", "preparationTimeMin", "totalTimeMin"]));
const ingredientsError = computed(() => hasErrorIn(["ingredient.", "group."]));
const stepsError = computed(() => hasErrorIn(["step."]));

// --- Speichern ---
const scrollToFirstError = async () => {
  await nextTick();
  document.querySelector<HTMLElement>("[aria-invalid='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const save = async (andBack: boolean) => {
  if (saving.value) {
    return;
  }
  const id = await editor.save();
  if (!id) {
    if (Object.keys(errors.value).length) {
      toast({ title: "Noch nicht ganz fertig", description: "Bitte prüfe die rot markierten Felder.", variant: "destructive" });
      await scrollToFirstError();
    }
    return;
  }

  toast({ title: props.id ? "Rezept aktualisiert" : "Rezept gespeichert", description: draft.value.name });
  if (andBack) {
    await router.push({ name: routes.recipeDetails.name, params: { recipeId: id } });
    return;
  }
  if (!props.id) {
    await router.replace({ name: routes.editRecipe.name, params: { id } });
  }
};

onKeyStroke("s", (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    void save(false);
  }
});

const confirmDiscard = ref(false);

// --- Neues Produkt aus der Suche ---
const productSheetOpen = ref(false);
const productSheetName = ref("");
const productTarget = ref<{ groupKey: string; ingredientKey: string } | null>(null);

const openProductSheet = (groupKey: string, ingredientKey: string, name: string) => {
  productTarget.value = { groupKey, ingredientKey };
  productSheetName.value = name;
  productSheetOpen.value = true;
};

const onProductSaved = async (productId: string | null) => {
  const target = productTarget.value;
  productTarget.value = null;
  if (!productId || !target) {
    return;
  }
  await refetchProducts();
  const product = products.value.find((p) => p.id === productId);
  editor.selectProduct(target.groupKey, target.ingredientKey, product);
};

const addGroup = () => {
  editor.addGroup();
};
</script>

<template>
  <div class="h-full overflow-y-auto">
    <div class="flex flex-col gap-4 max-w-4xl mx-auto pb-4">
      <template v-if="loading">
        <Skeleton class="h-28 rounded-2xl" />
        <Skeleton class="h-48 rounded-2xl" />
        <Skeleton class="h-64 rounded-2xl" />
      </template>

      <EmptyState v-else-if="notFound" :icon="SearchX" title="Rezept nicht gefunden" description="Vielleicht wurde es gelöscht.">
        <Button as-child variant="outline" class="rounded-full">
          <RouterLink :to="{ name: routes.recipes.name }"><ArrowLeft class="h-4 w-4" /> Zu den Rezepten</RouterLink>
        </Button>
      </EmptyState>

      <template v-else>
        <RecipePageHeader :title :subtitle="id ? 'Rezept bearbeiten' : 'Neues Rezept'" :icon="id ? Pencil : Plus" :accent>
          <template #meta>
            <RecipeMetaInfo
              class="mt-2"
              size="md"
              :preparation-time-min="draft.preparationTimeMin"
              :total-time-min="draft.totalTimeMin"
              :portions="draft.portions"
            />
          </template>
          <template v-if="id" #actions>
            <Button as-child variant="outline" class="h-10 rounded-full">
              <RouterLink :to="{ name: routes.recipeDetails.name, params: { recipeId: id } }"><Eye class="h-4 w-4" /> Ansehen</RouterLink>
            </Button>
          </template>
        </RecipePageHeader>

        <!-- Wiederhergestellter Entwurf -->
        <div
          v-if="restoredDraft"
          :class="['rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3 text-sm', recipeAccentClasses.mango.soft]"
          v-e2e="'recipe-draft-restored'"
        >
          <History class="h-4 w-4 shrink-0" />
          <span class="flex-1 min-w-48">Dein ungespeicherter Entwurf wurde wiederhergestellt.</span>
          <Button variant="outline" size="sm" class="rounded-full bg-background/60" @click="confirmDiscard = true"><Undo2 class="h-3.5 w-3.5" /> Verwerfen</Button>
        </div>

        <EditorSection title="Grunddaten" subtitle="Name, Kategorie, Portionen und Zeiten" :icon="Info" accent="mango" :has-error="basicsError">
          <RecipeBasicsEditor />
        </EditorSection>

        <EditorSection
          title="Zutaten"
          :subtitle="`${ingredientCount} ${ingredientCount === 1 ? 'Zutat' : 'Zutaten'}${draft.groups.length > 1 ? ` in ${draft.groups.length} Gruppen` : ''}`"
          :icon="Carrot"
          accent="basil"
          :has-error="ingredientsError"
        >
          <div class="flex flex-col gap-5">
            <IngredientGroupEditor
              v-for="(group, index) in draft.groups"
              :key="group.key"
              :group
              :index
              :group-count="draft.groups.length"
              :all-groups="groupLabels"
              :products
              :recent-ids="recipeStore.getRecentProductIds"
              @create-product="(ingredientKey, name) => openProductSheet(group.key, ingredientKey, name)"
            />
            <Button variant="ghost" class="h-11 rounded-xl self-start text-muted-foreground" v-e2e="'recipe-add-group'" @click="addGroup">
              <Plus class="h-4 w-4" /> Weitere Gruppe (z. B. Soße, Füllung)
            </Button>
          </div>
        </EditorSection>

        <EditorSection
          title="Zubereitung"
          :subtitle="`${stepCount} ${stepCount === 1 ? 'Schritt' : 'Schritte'}`"
          :icon="ListOrdered"
          accent="teal"
          :has-error="stepsError"
        >
          <StepListEditor />
        </EditorSection>

        <!-- Aktionsleiste -->
        <div
          class="sticky bottom-0 z-20 -mx-3 md:mx-0 md:rounded-2xl md:border border-t border-border/60 bg-background/95 backdrop-blur-sm px-3 py-3 flex flex-wrap items-center gap-2 shadow-[0_-4px_16px_-8px_rgb(0_0_0/0.15)]"
        >
          <span class="flex items-center gap-1.5 text-xs text-muted-foreground mr-auto" aria-live="polite">
            <template v-if="isDirty"><span class="h-2 w-2 rounded-full bg-recipe-mango" /> Ungespeicherte Änderungen</template>
            <template v-else><Check class="h-3.5 w-3.5 text-recipe-basil-fg" /> Alles gespeichert</template>
          </span>
          <Button v-if="isDirty" variant="ghost" class="h-11 rounded-full" :disabled="saving" @click="confirmDiscard = true">Verwerfen</Button>
          <Button variant="outline" class="h-11 rounded-full" :disabled="saving" title="Speichern (Strg+S)" v-e2e="'recipe-save'" @click="save(false)">
            <Loader2 v-if="saving" class="h-4 w-4 animate-spin" /> Speichern
          </Button>
          <Button class="h-11 rounded-full px-5" :class="recipeAccentClasses.primary.solid" :disabled="saving" v-e2e="'recipe-save-back'" @click="save(true)">
            Speichern &amp; ansehen
          </Button>
        </div>
      </template>
    </div>

    <ProductEditorSheet v-model:open="productSheetOpen" :product-id="null" :initial-name="productSheetName" @saved="onProductSaved" />

    <DialogConfirm
      v-model:dialog-open="confirmDiscard"
      title="Änderungen verwerfen?"
      description="Alles seit dem letzten Speichern geht verloren."
      variant="destructive"
      @update:confirm="editor.discardChanges()"
    />
  </div>
</template>
