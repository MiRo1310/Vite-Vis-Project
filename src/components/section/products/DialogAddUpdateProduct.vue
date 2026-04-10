<script setup lang="ts">
import DialogShared from "@/components/shared/dialog/DialogShared.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import Form from "@/components/shared/form/Form.vue";
import { useMutation } from "@vue/apollo-composable";
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, ref, watch } from "vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { ErrorCode, GetProductByIdQuery, ProductCreateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";
import { useUnits } from "@/composables/querys/units.ts";
import { formSchemaProduct } from "@/components/section/products/schema.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { invalidateCache } from "@/composables/querys/utils.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { useToast } from "@/components/ui/toast";

const props = defineProps<{ data?: GetProductByIdQuery["product"] }>();

const { getOptions } = useUnits();
const { toast } = useToast();

const { selectableOptions } = useProductCategories();
const { mutate } = useMutation(
  graphql(`
    mutation addProduct($dto: ProductCreateDtoInput!) {
      createProduct(dto: $dto) {
        errorCode
        data {
          name
          id
        }
      }
    }
  `),
);

const { mutate: updateProductMutate } = useMutation(
  graphql(`
    mutation updateProduct($dto: ProductUpdateDtoInput!) {
      updateProduct(dto: $dto) {
        data {
          name
          id
        }
        errorCode
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

const onSubmit = form.handleSubmit(async ({ unit, fat, carbs, amount, kcal, name, protein, salt, sugar, category, productUnits }) => {
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
  };

  const productId = props.data?.id;

  if (!productId) {
    const response = await mutate({ dto }, { refetchQueries: ["GetProducts"] });
    if (!isSuccess(response?.data?.createProduct.errorCode, "erstellt")) {
      return;
    }
  } else {
    const response = await updateProductMutate(
      {
        dto: { ...dto, id: productId },
      },
      { refetchQueries: ["GetProducts"] },
    );
    if (!isSuccess(response?.data?.updateProduct.errorCode, "aktualisiert")) {
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

const isSuccess = (error: ErrorCode | null | undefined, type: "aktualisiert" | "erstellt"): boolean => {
  if (error === ErrorCode.Exist) {
    toast({ title: `Das Produkt konnte nicht ${type} werden, da der Name schon existiert`, variant: "destructive" });
    form.setErrors({ name: "Wähle einen anderen Namen, dieser existiert schon" });
    return false;
  }
  if (error !== ErrorCode.Success) {
    toast({ title: "Ein Fehler ist aufgetreten", variant: "destructive" });
    return false;
  }
  toast({ title: `Das Produkt wurde erfolgreich ${type}` });
  return true;
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
</script>

<template>
  <DialogShared v-model:dialog-open="dialogOpen" title="Ein neues Lebensmittel hinzufügen">
    <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
      <div class="flex gap-2 items-baseline mb-4">
        <FormInput label="Produkt" name="name" class="flex-1" />
        <FormSelect label="Kategorie" placeholder="Wähle eine Kategorie" name="category" :select-options="selectableOptions" />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
        <FormInput label="Kalorien" name="kcal" type="number" :step="1" />
        <FormInput label="Fett" name="fat" type="number" :step="0.01" />
        <FormInput label="Kohlenhydrate" name="carbs" type="number" :step="0.01" />
        <FormInput label="Zucker" name="sugar" type="number" :step="0.01" />
        <FormInput label="Salz" name="salt" type="number" :step="0.01" />
        <FormInput label="Protein" name="protein" type="number" :step="0.01" />
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

      <template #footer>
        <FormFooter @update:close="closeDialog" />
      </template>
    </Form>
  </DialogShared>
</template>
