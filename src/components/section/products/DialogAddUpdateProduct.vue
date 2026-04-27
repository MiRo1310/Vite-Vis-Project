<script setup lang="ts">
import DialogShared from "@/components/shared/dialog/DialogShared.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import Form from "@/components/shared/form/Form.vue";
import { useMutation } from "@vue/apollo-composable";
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, onMounted, ref, watch } from "vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { GetProductByIdQuery, ProductCreateDtoInput } from "@/api/gql/graphql";
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
import { TProduct } from "@/components/section/products/index.ts";

const props = defineProps<{ data?: GetProductByIdQuery["product"] }>();

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

const defaultUnitVariant = computed(() => {
  const defaultItem = props.data?.productUnits.find((variant) => variant.isDefault);
  return { amount: defaultItem?.amount ?? 100, unit: defaultItem?.unit ?? "g" };
});

const form = useForm({
  validationSchema: formSchemaProduct,
  initialValues: {
    name: props.data?.name ?? "",
    category: props.data?.category ?? "",
    amount: defaultUnitVariant.value.amount,
    unit: defaultUnitVariant.value.unit,
    fat: props.data?.fat,
    carbs: props.data?.carbs,
    kcal: props.data?.kcal,
    salt: props.data?.salt,
    protein: props.data?.protein,
    sugar: props.data?.sugar,
    ean: props.data?.ean,
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
const ean = ref("");

onMounted(() => {
  if (props.data?.ean) {
    ean.value = props.data.ean;
  }
});

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
    if (response) {
      isSuccess("erstellt");
      return;
    }
  } else {
    const response = await updateProductMutate(
      {
        dto: { ...dto, id: productId },
      },
      { refetchQueries: ["GetProducts"] },
    );

    if (response) {
      isSuccess("aktualisiert");
      return;
    }
  }

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
</script>

<template>
  <DialogShared v-model:dialog-open="dialogOpen" title="Ein neues Lebensmittel hinzufügen">
    <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
      <div class="max-h-[70vh] overflow-auto">
        <OpenFoodFactsProduct v-model:model-value="openFoodFactsProduct" :ean
          ><Button @click.prevent="addAllValuesToForm = true">Alles hinzufügen</Button>
        </OpenFoodFactsProduct>

        <OpenFoodFactsValueUpdater :value="openFoodFactsProduct?.code" name="ean" :form v-model:add-all="addAllValuesToForm">
          <FormInput label="Ean" name="ean" />
        </OpenFoodFactsValueUpdater>
        <div class="flex gap-2 items-baseline mb-4">
          <FormInput label="Produkt" name="name" class="flex-1" />

          <FormSelect label="Kategorie" placeholder="Wähle eine Kategorie" name="category" :select-options="selectableOptions" />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <OpenFoodFactsValueUpdater
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.energyKcal100g"
            unit="kcal"
            name="kcal"
            :form
            v-model:add-all="addAllValuesToForm"
          >
            <FormInput label="Kalorien" name="kcal" type="number" :min="0" :step="1" />
          </OpenFoodFactsValueUpdater>
          <OpenFoodFactsValueUpdater
            name="fat"
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.fat100g"
            unit="g"
            v-model:add-all="addAllValuesToForm"
            :form
          >
            <FormInput label="Fett" name="fat" type="number" :min="0" :step="0.01" />
          </OpenFoodFactsValueUpdater>
          <OpenFoodFactsValueUpdater
            name="carbs"
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.carbohydrates100g"
            unit="g"
            :form
            v-model:add-all="addAllValuesToForm"
          >
            <FormInput label="Kohlenhydrate" name="carbs" type="number" :min="0" :step="0.01" />
          </OpenFoodFactsValueUpdater>
          <OpenFoodFactsValueUpdater
            name="sugar"
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.addedSugars100g"
            :form
            unit="g"
            v-model:add-all="addAllValuesToForm"
          >
            <FormInput label="Zucker" name="sugar" type="number" :step="0.001" :min="0" />
          </OpenFoodFactsValueUpdater>
          <OpenFoodFactsValueUpdater
            name="salt"
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.salt100g"
            unit="g"
            :form
            v-model:add-all="addAllValuesToForm"
          >
            <FormInput label="Salz" name="salt" type="number" :step="0.01" :min="0" />
          </OpenFoodFactsValueUpdater>
          <OpenFoodFactsValueUpdater
            name="protein"
            :value="openFoodFactsProduct?.openFoodFactProduct?.nutriments?.proteins100g"
            unit="g"
            :form
            v-model:add-all="addAllValuesToForm"
          >
            <FormInput label="Protein" name="protein" type="number" :step="0.01" :min="0" />
          </OpenFoodFactsValueUpdater>
        </div>
        <p class="w-full font-bold mb-4 mt-6">Bezogen auf diese Menge</p>
        <div class="flex w-full space-x-2">
          <FormInput label="Menge" name="amount" type="number" :step="0.1" />
          <FormInputOptions label="Einheit" name="unit" type="text" :options="getOptions" options-id="units" always-return-name />
        </div>

        <AddVariantUnits
          v-if="defaultUnitVariant.amount && defaultUnitVariant.unit"
          :unitOptions="getOptions"
          :productUnits="data?.productUnits ?? []"
          :default-unit="defaultUnitVariant.unit ?? form.values.unit"
          :form
          v-model:product-units-to-remove="productUnitsToRemove"
        />
      </div>
      <template #footer>
        <FormFooter @update:close="closeDialog" />
      </template>
    </Form>
  </DialogShared>
</template>
