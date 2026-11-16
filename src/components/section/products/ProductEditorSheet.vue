<script setup lang="ts">
import { computed, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductForm from "@/components/section/products/ProductForm.vue";

/** `productId: null` = neues Produkt anlegen, optional mit vorbelegtem Namen */
const props = defineProps<{ productId: string | null; initialName?: string; initialEan?: string }>();
const open = defineModel<boolean>("open", { default: false });
const emits = defineEmits<{ saved: [productId: string | null]; deleted: [] }>();

const getProductByIdQuery = graphql(`
  query getProductById($id: UUID!) {
    product(id: $id) {
      id
      carbs
      category
      fat
      kcal
      name
      protein
      salt
      sugar
      ean
      productUnits {
        modifiedAt
        createdAt
        id
        productId
        amount
        unit
        isDefault
      }
    }
  }
`);

const { load, result, refetch, loading } = useLazyQuery(getProductByIdQuery);

watch(
  () => [open.value, props.productId] as const,
  async ([isOpen, id]) => {
    if (!isOpen || !id) {
      return;
    }
    const loaded = await load(getProductByIdQuery, { id });
    if (!loaded) {
      await refetch({ id });
    }
  },
  { immediate: true },
);

const product = computed(() => (props.productId && result.value?.product?.id === props.productId ? result.value.product : undefined));
const isReady = computed(() => !props.productId || !!product.value);
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent side="right" class="w-full sm:max-w-xl p-0 gap-0 flex flex-col">
      <SheetHeader class="px-4 md:px-6 pt-5 pb-3 border-b border-border/60 bg-linear-to-br from-recipe-basil/20 via-recipe-teal/10 to-transparent">
        <SheetTitle class="text-lg">{{ productId ? (product?.name ?? "Produkt") : "Neues Produkt" }}</SheetTitle>
        <SheetDescription>{{ productId ? "Werte anpassen und speichern" : "Lebensmittel mit Nährwerten anlegen" }}</SheetDescription>
      </SheetHeader>
      <div class="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pt-4">
        <ProductForm
          v-if="isReady"
          :key="productId ?? `new-${initialName ?? ''}-${initialEan ?? ''}`"
          v-model:dialog-open="open"
          :data="product"
          :initial-name="initialName"
          :initial-ean="initialEan"
          @saved="emits('saved', $event)"
          @deleted="emits('deleted')"
        />
        <p v-else-if="loading" class="text-sm text-muted-foreground py-8 text-center">Lade Produkt …</p>
      </div>
    </SheetContent>
  </Sheet>
</template>
