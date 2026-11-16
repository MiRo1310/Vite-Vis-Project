<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import ProductDeleteButton from "@/components/section/products/ProductDeleteButton.vue";
import Form from "@/components/shared/form/Form.vue";
import { useMutation } from "@vue/apollo-composable";
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, ref, watch } from "vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { type GetProductByIdQuery, type ProductCreateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";
import { useUnits } from "@/composables/querys/units.ts";
import { formSchemaProduct } from "@/components/section/products/schema.form.js";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { invalidateCache } from "@/composables/querys/utils.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { useToast } from "@/components/ui/toast";
import OpenFoodFactsProduct from "@/components/section/products/OpenFoodFactsProduct.vue";
import OpenFoodFactsValueUpdater from "@/components/section/products/OpenFoodFactsValueUpdater.vue";
import { Button } from "@/components/shared/button/button.variants";
import { type TProduct } from "@/components/section/products/index.ts";
import { Barcode, Layers, Salad } from "@lucide/vue";
import { nutrientAccent, recipeAccentClasses } from "@/constants/recipe.ts";

/**
 * `initialName`: Vorbelegung beim Anlegen, z. B. aus der Produktsuche im Rezept-Editor.
 * `initialEan`: gescannte EAN – wird eingetragen und sofort bei OpenFoodFacts nachgeschlagen.
 */
const props = defineProps<{ data?: GetProductByIdQuery["product"]; initialName?: string; initialEan?: string }>();

const { getOptions } = useUnits();
const { toast } = useToast();

const { selectableOptions } = useProductCategories();
const { mutate } = useMutation(
  graphql(`
    mutation addProduct($dto: ProductCreateDtoInput!) {
      createProduct(dto: $dto) {
        name
        id
      }
    }
  `),
);

const { mutate: updateProductMutate } = useMutation(
  graphql(`
    mutation updateProduct($dto: ProductUpdateDtoInput!) {
      updateProduct(dto: $dto) {
        name
        id
      }
    }
  `),
);

const { mutate: removeProductUnitMutate } = useMutation(
  graphql(`
    mutation removeProductUnit($id: UUID!) {
      removeProductUnit(id: $id)
    }
  `),
);

const productUnitsToRemove = ref([]);
const clearProductUnitsToRemove = () => {
  productUnitsToRemove.value = [];
};

const dialogOpen = defineModel<boolean>("dialogOpen");
const emits = defineEmits<{ saved: [productId: string | null]; deleted: [] }>();

const defaultUnitVariant = computed(() => {
  const defaultItem = props.data?.productUnits.find((variant) => variant.isDefault);
  return { amount: defaultItem?.amount ?? 100, unit: defaultItem?.unit ?? "g" };
});

const form = useForm({
  validationSchema: formSchemaProduct,
  initialValues: {
    name: props.data?.name ?? props.initialName ?? "",
    category: props.data?.category ?? "",
    amount: defaultUnitVariant.value.amount,
    unit: defaultUnitVariant.value.unit,
    fat: props.data?.fat,
    carbs: props.data?.carbs,
    kcal: props.data?.kcal,
    salt: props.data?.salt,
    protein: props.data?.protein,
    sugar: props.data?.sugar,
    ean: props.data?.ean ?? props.initialEan,
    productUnits:
      props.data?.productUnits.map((u) => ({
        amount: u.amount ?? 0,
        id: u.id,
        unit: u.unit,
        isDefault: u.isDefault,
      })) ?? [],
  },
  validateOnMount: false,
});

const openFoodFactsProduct = ref<TProduct | undefined>();

watch(
  () => dialogOpen.value,
  () => {
    if (updateValue.value) {
      return;
    }
    form.resetForm();
  },
);
const updateValue = ref(false);

const onSubmit = form.handleSubmit(async ({ unit, fat, carbs, amount, kcal, name, protein, salt, sugar, category, productUnits, ean }) => {
  const dto: ProductCreateDtoInput = {
    name,
    category,
    carbs,
    fat,
    kcal,
    protein,
    salt,
    sugar,
    amount,
    unit,
    productUnits,
    ean,
  };

  const productId = props.data?.id;

  if (!productId) {
    const response = await mutate({ dto }, { refetchQueries: ["GetProducts"] });
    if (!response) {
      return;
    }
    isSuccess("erstellt");
    emits("saved", response.data?.createProduct?.id ?? null);
  } else {
    const response = await updateProductMutate(
      {
        dto: { ...dto, id: productId },
      },
      { refetchQueries: ["GetProducts"] },
    );
    if (!response) {
      return;
    }
    isSuccess("aktualisiert");
    emits("saved", productId);
  }

  // Früher wurde nach dem Erfolgs-Toast direkt returned – entfernte Varianten wurden so nie gelöscht und der Dialog blieb offen
  for (const unitId of productUnitsToRemove.value) {
    await removeProductUnitMutate({ id: unitId });
  }
  productUnitsToRemove.value = [];

  await invalidateCache("productsGrouped");
  await invalidateCache("productUnits");
  closeDialog();
});

const isSuccess = (type: "aktualisiert" | "erstellt"): void => {
  toast({ title: `Das Produkt wurde erfolgreich ${type}` });
};

const onDeleted = () => {
  closeDialog();
  emits("deleted");
};

const closeDialog = () => {
  dialogOpen.value = false;
  clearProductUnitsToRemove();
};

watch(
  () => dialogOpen.value,
  (newValue) => {
    if (!newValue) {
      form.resetForm();
    }
  },
);

const addAllValuesToForm = ref(false);

const nutrientBorder = (nutrient: keyof typeof nutrientAccent): string => recipeAccentClasses[nutrientAccent[nutrient]].border;
</script>


<template>
  <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
    <div class="flex flex-col gap-5 pb-4">
      <!-- Produkt -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span :class="['h-8 w-8 rounded-lg flex items-center justify-center', recipeAccentClasses.basil.soft]"><Salad class="h-4 w-4" /></span>
          <h3 class="font-semibold">Produkt</h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          <FormInput label="Name" name="name" e2e="product-name" />
          <FormSelect label="Kategorie" placeholder="Wähle eine Kategorie" name="category" :select-options="selectableOptions" e2e="product-category" />
        </div>
      </section>

      <!-- EAN / OpenFoodFacts -->
      <section class="flex flex-col gap-3 rounded-2xl border border-border/60 p-3 bg-muted/30">
        <div class="flex items-center gap-2">
          <span :class="['h-8 w-8 rounded-lg flex items-center justify-center', recipeAccentClasses.teal.soft]"><Barcode class="h-4 w-4" /></span>
          <div>
            <h3 class="font-semibold leading-tight">Barcode</h3>
            <p class="text-xs text-muted-foreground">Nährwerte automatisch von OpenFoodFacts holen</p>
          </div>
        </div>
        <OpenFoodFactsProduct v-model:model-value="openFoodFactsProduct" :ean="data?.ean ?? initialEan" :auto-lookup="!data && !!initialEan">
          <Button @click.prevent="addAllValuesToForm = true">Alles übernehmen</Button>
        </OpenFoodFactsProduct>
        <OpenFoodFactsValueUpdater label="EAN" :value="openFoodFactsProduct?.code" name="ean" :form v-model:add-all="addAllValuesToForm">
          <FormInput name="ean" />
        </OpenFoodFactsValueUpdater>
      </section>

      <!-- Nährwerte -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span :class="['h-8 w-8 rounded-lg flex items-center justify-center', recipeAccentClasses.primary.soft]"><Layers class="h-4 w-4" /></span>
          <h3 class="font-semibold">Nährwerte</h3>
        </div>
        <div class="grid grid-cols-2 gap-3 rounded-2xl p-3" :class="recipeAccentClasses.primary.soft">
          <FormInput label="Bezogen auf Menge" name="amount" type="number" :step="0.1" />
          <FormInputOptions label="Einheit" name="unit" type="text" :options="getOptions" options-id="units" always-return-name />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div :class="['border-l-4 pl-2', nutrientBorder('kcal')]">
            <OpenFoodFactsValueUpdater label="Kalorien"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.energyKcal100g"
              unit="kcal"
              name="kcal"
              :form
              v-model:add-all="addAllValuesToForm"
            >
              <FormInput name="kcal" type="number" :min="0" :step="1" />
            </OpenFoodFactsValueUpdater>
          </div>
          <div :class="['border-l-4 pl-2', nutrientBorder('carbs')]">
            <OpenFoodFactsValueUpdater label="Kohlenhydrate"
              name="carbs"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.carbohydrates100g"
              unit="g"
              :form
              v-model:add-all="addAllValuesToForm"
            >
              <FormInput name="carbs" type="number" :min="0" :step="0.01" />
            </OpenFoodFactsValueUpdater>
          </div>
          <div :class="['border-l-4 pl-2', nutrientBorder('sugar')]">
            <OpenFoodFactsValueUpdater label="davon Zucker"
              name="sugar"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.sugars100g"
              :form
              unit="g"
              v-model:add-all="addAllValuesToForm"
            >
              <FormInput name="sugar" type="number" :step="0.001" :min="0" />
            </OpenFoodFactsValueUpdater>
          </div>
          <div :class="['border-l-4 pl-2', nutrientBorder('fat')]">
            <OpenFoodFactsValueUpdater label="Fett"
              name="fat"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.fat100g"
              unit="g"
              v-model:add-all="addAllValuesToForm"
              :form
            >
              <FormInput name="fat" type="number" :min="0" :step="0.01" />
            </OpenFoodFactsValueUpdater>
          </div>
          <div :class="['border-l-4 pl-2', nutrientBorder('protein')]">
            <OpenFoodFactsValueUpdater label="Protein"
              name="protein"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.proteins100g"
              unit="g"
              :form
              v-model:add-all="addAllValuesToForm"
            >
              <FormInput name="protein" type="number" :step="0.01" :min="0" />
            </OpenFoodFactsValueUpdater>
          </div>
          <div :class="['border-l-4 pl-2', nutrientBorder('salt')]">
            <OpenFoodFactsValueUpdater label="Salz"
              name="salt"
              :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.salt100g"
              unit="g"
              :form
              v-model:add-all="addAllValuesToForm"
            >
              <FormInput name="salt" type="number" :step="0.01" :min="0" />
            </OpenFoodFactsValueUpdater>
          </div>
        </div>
      </section>

      <!-- Weitere Einheiten -->
      <section v-if="defaultUnitVariant.amount && defaultUnitVariant.unit" class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span :class="['h-8 w-8 rounded-lg flex items-center justify-center', recipeAccentClasses.lavender.soft]"><Layers class="h-4 w-4" /></span>
          <div>
            <h3 class="font-semibold leading-tight">Weitere Einheiten</h3>
            <p class="text-xs text-muted-foreground">z. B. 1 Stück = 120 g – damit du im Rezept in Stück rechnen kannst</p>
          </div>
        </div>
        <AddVariantUnits
          :unitOptions="getOptions"
          :productUnits="data?.productUnits ?? []"
          :default-unit="defaultUnitVariant.unit ?? form.values.unit"
          :form
          v-model:product-units-to-remove="productUnitsToRemove"
        />
      </section>
    </div>
    <template #footer>
      <div class="sticky bottom-0 -mx-4 md:-mx-6 px-4 md:px-6 py-3 border-t border-border/60 bg-background/95 backdrop-blur-sm flex items-center gap-2">
        <!-- Löschen nur bei bestehenden Produkten, bewusst links und abgesetzt von Speichern -->
        <ProductDeleteButton v-if="data" :product-id="data.id" :product-name="data.name" @deleted="onDeleted" />
        <FormFooter class="ml-auto" @update:close="closeDialog" />
      </div>
    </template>
  </Form>
</template>
