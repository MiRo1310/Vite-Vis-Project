<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRouteQuery } from "@vueuse/router";
import { onKeyStroke, useMediaQuery, useSwipe, useWakeLock } from "@vueuse/core";
import { ArrowLeft, ArrowRight, Check, ListChecks, Sun, X } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import AlexaTimerStrip from "@/components/section/recipe/AlexaTimerStrip.vue";
import RecipeIngredientList from "@/components/section/recipe/RecipeIngredientList.vue";
import StepIngredients from "@/components/section/recipe/StepIngredients.vue";
import { useRecipeDetails } from "@/composables/querys/recipeDetails.ts";
import { sortSteps } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";
import { Logger } from "@/lib/logger.ts";
import { getUserErrorMessage } from "@/lib/error.ts";
import { graphql } from "@/api/gql";
import apolloClient, { type ApolloOperationContext } from "@/apolloClient.ts";
import { useToast } from "@/components/ui/toast/use-toast";

const props = defineProps<{ recipeId?: string }>();

const route = useRoute();
const router = useRouter();
const { recipe, loading } = useRecipeDetails(() => props.recipeId);

const steps = computed(() => sortSteps(recipe.value?.recipeDescriptions));

// Portionen aus der Detailseite (?portionen=), sonst wie im Rezept
const portions = computed(() => {
  const fromQuery = Number(route.query.portionen);
  if (Number.isInteger(fromQuery) && fromQuery > 0) {
    return fromQuery;
  }
  return Math.max(recipe.value?.portions ?? 1, 1);
});

// Aktueller Schritt steht in der URL (?schritt=), damit ein Neuladen die Stelle behält
const stepQuery = useRouteQuery<string>("schritt", "1", { mode: "replace" });
const stepIndex = computed({
  get: () => {
    const index = Number(stepQuery.value) - 1;
    if (!Number.isInteger(index) || index < 0) {
      return 0;
    }
    return Math.min(index, Math.max(steps.value.length - 1, 0));
  },
  set: (index: number) => {
    stepQuery.value = String(index + 1);
  },
});

const currentStep = computed(() => steps.value[stepIndex.value]);
const isFirst = computed(() => stepIndex.value === 0);
const isLast = computed(() => stepIndex.value >= steps.value.length - 1);
const direction = ref<"next" | "prev">("next");

const detailsRoute = computed(() => ({ name: routes.recipeDetails.name, params: { recipeId: props.recipeId } }));

const exit = async () => {
  await router.push(detailsRoute.value);
};

const goTo = (index: number) => {
  if (index < 0 || index >= steps.value.length || index === stepIndex.value) {
    return;
  }
  direction.value = index > stepIndex.value ? "next" : "prev";
  stepIndex.value = index;
};

const next = async () => {
  if (isLast.value) {
    await exit();
    return;
  }
  goTo(stepIndex.value + 1);
};

const prev = () => {
  goTo(stepIndex.value - 1);
};

// --- Fertig: als gekocht melden ---
const markRecipeCookedMutation = graphql(`
  mutation markRecipeCooked($recipeId: UUID!) {
    markRecipeCooked(recipeId: $recipeId) {
      id
      cookedCount
      lastCookedAt
    }
  }
`);

/** Fehler zeigt der Kochmodus selbst an */
const silentContext: ApolloOperationContext = { silentErrors: true };
const { toast } = useToast();
const finishing = ref(false);

/**
 * Nur der „Fertig“-Button meldet das Rezept als gekocht. Wischen oder Pfeiltaste im letzten Schritt
 * verlassen den Kochmodus weiterhin ohne Meldung, damit ein versehentliches Wischen nicht mitzählt.
 * Schlägt die Meldung fehl, geht es trotzdem zurück zur Detailseite – gekocht ist ja schon.
 */
const finish = async () => {
  if (!props.recipeId || finishing.value) {
    return;
  }
  finishing.value = true;
  try {
    // Die Antwort aktualisiert den Rezept-Eintrag im Cache (Detailseite); die Leiste „Oft gekocht“ wird neu geladen
    const { data } = await apolloClient.mutate({
      mutation: markRecipeCookedMutation,
      variables: { recipeId: props.recipeId },
      context: silentContext,
      refetchQueries: ["mostCookedRecipes"],
    });
    const count = data?.markRecipeCooked?.cookedCount;
    toast({ title: "Guten Appetit!", description: count ? `${count}× gekocht` : undefined });
  } catch (error) {
    Logger.error("Rezept als gekocht melden fehlgeschlagen", error);
    toast({
      title: "Konnte nicht als gekocht gemerkt werden",
      description: getUserErrorMessage(error, "Bitte versuch es später noch einmal."),
      variant: "destructive",
    });
  } finally {
    finishing.value = false;
  }
  await exit();
};

const onNextButton = async () => {
  if (isLast.value) {
    await finish();
    return;
  }
  goTo(stepIndex.value + 1);
};

// --- Zutaten ---
const ingredientsOpen = ref(false);
const checked = ref<string[]>([]);
const isDesktop = useMediaQuery("(min-width: 768px)");

// --- Bedienung: Pfeiltasten / Wischen ---
onKeyStroke("ArrowRight", (e) => {
  if (ingredientsOpen.value) {
    return;
  }
  e.preventDefault();
  void next();
});
onKeyStroke("ArrowLeft", (e) => {
  if (ingredientsOpen.value) {
    return;
  }
  e.preventDefault();
  prev();
});

const stepArea = useTemplateRef<HTMLElement>("stepArea");
useSwipe(stepArea, {
  threshold: 60,
  onSwipeEnd: (_, swipeDirection) => {
    if (swipeDirection === "left") {
      void next();
    }
    if (swipeDirection === "right") {
      prev();
    }
  },
});

// --- Bildschirm anlassen ---
const wakeLock = useWakeLock();
onMounted(async () => {
  if (!wakeLock.isSupported.value) {
    return;
  }
  try {
    await wakeLock.request("screen");
  } catch (e) {
    Logger.error("Wake Lock konnte nicht aktiviert werden", e);
  }
});
onBeforeUnmount(async () => {
  await wakeLock.release();
});

// Anderes Rezept → Häkchen leeren
watch(
  () => props.recipeId,
  () => {
    checked.value = [];
  },
);
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-background text-foreground">
    <!-- Kopfzeile -->
    <header class="shrink-0 flex items-center gap-2 px-3 h-14 border-b border-border/60 pt-[env(safe-area-inset-top)] box-content">
      <Button as-child variant="ghost" size="icon-lg" class="rounded-full">
        <RouterLink :to="detailsRoute" aria-label="Kochmodus beenden"><X class="h-5 w-5" /></RouterLink>
      </Button>
      <div class="min-w-0 flex-1">
        <p class="font-semibold truncate leading-tight">{{ recipe?.name }}</p>
        <p v-if="steps.length" class="text-xs text-muted-foreground">Schritt {{ stepIndex + 1 }} von {{ steps.length }}</p>
      </div>
      <span
        v-if="wakeLock.isActive.value"
        :class="['hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 h-7 text-xs font-medium', recipeAccentClasses.mango.soft]"
        title="Der Bildschirm bleibt an, solange der Kochmodus offen ist"
      >
        <Sun class="h-3.5 w-3.5" /> Bleibt an
      </span>
      <Button
        variant="outline"
        class="h-10 rounded-full px-4"
        :disabled="!recipe?.recipeProducts.length"
        v-e2e="'cooking-ingredients'"
        @click="ingredientsOpen = true"
      >
        <ListChecks class="h-4 w-4" /> Zutaten
        <span v-if="checked.length" class="text-xs text-muted-foreground">{{ checked.length }}/{{ recipe?.recipeProducts.length }}</span>
      </Button>
    </header>

    <!-- Fortschritt -->
    <div v-if="steps.length > 1" class="shrink-0 flex gap-1.5 px-3 pt-3" role="tablist" aria-label="Schritte">
      <button
        v-for="(step, index) in steps"
        :key="step.position"
        type="button"
        role="tab"
        :aria-selected="index === stepIndex"
        :aria-label="`Schritt ${index + 1}`"
        class="flex-1 h-6 flex items-center"
        @click="goTo(index)"
      >
        <span :class="['block w-full h-1.5 rounded-full transition-colors duration-300', index <= stepIndex ? 'bg-recipe-primary' : 'bg-muted']" />
      </button>
    </div>

    <!-- Alexa-Timer: groß, damit man sie vom Herd aus lesen kann -->
    <div class="shrink-0 px-3 pt-3">
      <AlexaTimerStrip size="lg" show-empty />
    </div>

    <!-- Schritt -->
    <main ref="stepArea" class="flex-1 min-h-0 flex touch-pan-y">
      <div class="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-5 md:px-10 py-6">
      <div class="max-w-3xl mx-auto w-full min-h-full flex flex-col justify-center">
        <Skeleton v-if="!recipe && loading" class="h-48 rounded-2xl" />

        <EmptyState v-else-if="!recipe" :icon="X" title="Rezept nicht gefunden">
          <Button as-child variant="outline" class="rounded-full">
            <RouterLink :to="{ name: routes.recipes.name }"><ArrowLeft class="h-4 w-4" /> Zu den Rezepten</RouterLink>
          </Button>
        </EmptyState>

        <EmptyState v-else-if="!steps.length" :icon="ListChecks" title="Keine Schritte" description="Für dieses Rezept sind noch keine Zubereitungsschritte eingetragen.">
          <Button variant="outline" class="rounded-full" @click="ingredientsOpen = true"><ListChecks class="h-4 w-4" /> Zutaten ansehen</Button>
        </EmptyState>

        <Transition
          v-else
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          leave-active-class="transition duration-150 ease-in"
          :enter-from-class="direction === 'next' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'"
          :leave-to-class="direction === 'next' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'"
        >
          <article v-if="currentStep" :key="currentStep.position" class="flex flex-col gap-5" v-e2e="'cooking-step'">
            <span :class="['h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm', recipeAccentClasses.primary.solid]">
              {{ stepIndex + 1 }}
            </span>
            <h1 v-if="currentStep.header" class="text-2xl md:text-4xl font-bold tracking-tight leading-tight">{{ currentStep.header }}</h1>
            <!-- Mobil im Schritt, ab md in der Seitenspalte. Bis #427: alle Zutaten des Rezepts -->
            <StepIngredients v-if="recipe" v-model:checked="checked" :recipe :portions class="md:hidden" />
            <p class="whitespace-pre-wrap text-xl md:text-2xl leading-relaxed">{{ currentStep.text }}</p>
          </article>
        </Transition>
      </div>
      </div>

      <!-- Zutaten an der Seite (Desktop/Tablet quer) -->
      <aside
        v-if="recipe && steps.length && recipe.recipeProducts.length"
        class="hidden md:block w-80 lg:w-96 shrink-0 border-l border-border/60 overflow-y-auto px-5 py-6"
        v-e2e="'cooking-side-ingredients'"
      >
        <StepIngredients v-model:checked="checked" :recipe :portions layout="list" />
      </aside>
    </main>

    <!-- Navigation -->
    <footer v-if="steps.length" class="shrink-0 grid grid-cols-2 gap-3 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t border-border/60">
      <Button variant="outline" class="h-14 rounded-2xl text-base" :disabled="isFirst" v-e2e="'cooking-prev'" @click="prev">
        <ArrowLeft class="h-5 w-5" /> Zurück
      </Button>
      <Button
        class="h-14 rounded-2xl text-base shadow-sm"
        :class="isLast ? recipeAccentClasses.basil.solid : recipeAccentClasses.primary.solid"
        :disabled="finishing"
        v-e2e="'cooking-next'"
        @click="onNextButton"
      >
        <template v-if="isLast"><Check class="h-5 w-5" /> Fertig</template>
        <template v-else>Weiter <ArrowRight class="h-5 w-5" /></template>
      </Button>
    </footer>

    <!-- Zutaten -->
    <Sheet v-model:open="ingredientsOpen">
      <SheetContent
        :side="isDesktop ? 'right' : 'bottom'"
        :class="isDesktop ? 'w-full sm:max-w-md p-0 gap-0 flex flex-col' : 'max-h-[85dvh] rounded-t-3xl p-0 gap-0 flex flex-col'"
      >
        <SheetHeader class="px-5 pt-5 pb-3 border-b border-border/60">
          <SheetTitle>Zutaten</SheetTitle>
          <SheetDescription>für {{ portions }} {{ portions === 1 ? "Portion" : "Portionen" }} · abhaken, was bereitsteht</SheetDescription>
        </SheetHeader>
        <div class="flex-1 min-h-0 overflow-y-auto px-5 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <RecipeIngredientList v-if="recipe" v-model:checked="checked" :recipe :portions :show-nutrients="false" />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
