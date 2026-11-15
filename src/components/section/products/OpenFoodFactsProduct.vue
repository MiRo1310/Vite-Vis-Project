<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { graphql } from "@/api/gql";
import apolloClient, { type ApolloOperationContext } from "@/apolloClient.ts";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import { CircleAlert, CircleCheck, CircleHelp, LoaderCircle, Search, Undo } from "@lucide/vue";
import { type TProduct } from "@/components/section/products/index.ts";
import { isValidEan, normalizeEan } from "@/lib/product.ts";
import BarcodeScanButton from "@/components/shared/barcode/BarcodeScanButton.vue";
import { Logger } from "@/lib/logger.ts";

/** `autoLookup`: EAN beim Öffnen sofort abfragen (z. B. direkt nach dem Scannen) */
const props = defineProps<{ ean?: string | null; autoLookup?: boolean }>();

const product = defineModel<TProduct>("modelValue");

const localProductsByCodeQuery = graphql(`
  query localProductsByCode($code: String!) {
    foodFactsProductByCode(code: $code) {
      code
      additionalData {
        key
        value
      }
      openFoodFactProduct {
        brands
        additionalProductData {
          value
          key
        }
        nutriments {
          carbohydrates100g
          sugars100g
          energy100g
          fat100g
          energyKcal100g
          proteins100g
          salt100g
        }
      }
    }
  }
`);

type LookupStatus = "idle" | "loading" | "found" | "notFound" | "invalid" | "error";

const code = ref(normalizeEan(props.ean));
const status = ref<LookupStatus>("idle");

// Gespeicherte EAN kommt evtl. erst nach dem Mounten – übernehmen, solange noch nichts eingetippt wurde
watch(
  () => props.ean,
  (ean) => {
    if (!code.value) {
      code.value = normalizeEan(ean);
    }
  },
);

const savedEan = computed(() => normalizeEan(props.ean));

/**
 * Fragt OpenFoodFacts über das Backend ab. Bewusst ohne useLazyQuery: `load()` liefert nach dem ersten
 * (fehlgeschlagenen) Aufruf nur noch `false`, dadurch ging früher nach einem „nicht gefunden“ keine Suche mehr.
 */
const lookup = async () => {
  const ean = normalizeEan(code.value);
  code.value = ean;
  if (!ean) {
    return;
  }
  if (!isValidEan(ean)) {
    status.value = "invalid";
    product.value = undefined;
    return;
  }

  status.value = "loading";
  try {
    const context: ApolloOperationContext = { silentErrors: true };
    const { data } = await apolloClient.query({
      query: localProductsByCodeQuery,
      variables: { code: ean },
      fetchPolicy: "network-only",
      errorPolicy: "all",
      context,
    });
    // Mit errorPolicy "all" ist data bei „nicht gefunden“ zur Laufzeit leer, obwohl der Typ es nicht sagt
    const found = (data as typeof data | undefined)?.foodFactsProductByCode;
    product.value = found ?? undefined;
    status.value = product.value ? "found" : "notFound";
  } catch (error) {
    Logger.error("OpenFoodFacts Abfrage fehlgeschlagen", error);
    product.value = undefined;
    status.value = "error";
  }
};

/** Gescannte EAN übernehmen und gleich bei OpenFoodFacts nachschlagen */
const onScanned = async (ean: string) => {
  code.value = ean;
  await lookup();
};

onMounted(async () => {
  if (props.autoLookup && code.value) {
    await lookup();
  }
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2" @keydown.enter.stop.prevent="lookup">
      <div class="flex-1 min-w-0">
        <InputShadcn v-model="code" type="text" inputmode="numeric" placeholder="Barcode (EAN)" class="h-10" e2e="off-ean" />
      </div>
      <Button
        v-if="savedEan && code !== savedEan"
        type="button"
        variant="ghost"
        size="icon"
        class="h-10 w-10 shrink-0"
        title="Gespeicherte EAN wiederherstellen"
        @click.prevent="code = savedEan"
      >
        <Undo class="h-4 w-4" />
      </Button>
      <BarcodeScanButton icon-only label="Barcode scannen" class="h-10 w-10" @detected="onScanned" />
      <Button type="button" class="h-10 shrink-0" :disabled="!code || status === 'loading'" v-e2e="'off-lookup'" @click.prevent="lookup">
        <LoaderCircle v-if="status === 'loading'" class="h-4 w-4 animate-spin" />
        <Search v-else class="h-4 w-4" />
        Abrufen
      </Button>
    </div>

    <!-- Rückmeldung direkt am Feld statt globalem Fehler-Toast -->
    <div v-if="status === 'found'" class="flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2 bg-recipe-basil-soft text-recipe-basil-fg text-sm">
      <span class="inline-flex items-center gap-1.5"><CircleCheck class="h-4 w-4" /> Gefunden{{ product?.openFoodFactProduct?.brands ? `: ${product.openFoodFactProduct.brands}` : "" }}</span>
      <slot />
    </div>
    <p v-else-if="status === 'notFound'" class="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-recipe-mango-soft text-recipe-mango-fg text-sm">
      <CircleHelp class="h-4 w-4 shrink-0" /> Nicht in OpenFoodFacts – Werte bitte selbst eintragen.
    </p>
    <p v-else-if="status === 'invalid'" class="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-recipe-tomato-soft text-recipe-tomato-fg text-sm">
      <CircleAlert class="h-4 w-4 shrink-0" /> Kein gültiger Barcode – bitte Ziffern prüfen (8, 12, 13 oder 14 Stellen).
    </p>
    <p v-else-if="status === 'error'" class="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-recipe-tomato-soft text-recipe-tomato-fg text-sm">
      <CircleAlert class="h-4 w-4 shrink-0" /> Abruf fehlgeschlagen – ist das Backend erreichbar?
    </p>
  </div>
</template>
