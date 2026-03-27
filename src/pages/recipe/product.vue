<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import Form from "@/components/shared/form/Form.vue";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, onMounted, ref, watch } from "vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { ProductCreateDtoInput, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";
import { useUnits } from "@/composables/querys/units.ts";
import { formSchemaProduct } from "@/components/section/products/schema.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import ProductRemove from "@/components/section/products/action/ProductRemove.vue";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { invalidateCache } from "@/composables/querys/utils.ts";
import { useToast } from "@/components/ui/toast";

const props = defineProps<{ id: string }>();

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

const { load, result } = useLazyQuery(getProductByIdQuery);

watch(
  () => props.id,
  () => {
    if (!props.id) {
      return;
    }
    load(getProductByIdQuery, { id: props.id });
  },
  { immediate: true },
);

const { getOptions, refetch } = useUnits();

const { selectableOptions } = useProductCategories();
const { mutate, onDone: onDoneProductCreate } = useMutation(
  graphql(`
    mutation addProduct($dto: ProductCreateDtoInput!) {
      createProduct(dto: $dto) {
        name
        id
      }
    }
  `),
);

const { mutate: updateProductMutate, onDone: onDoneProductMutate } = useMutation(
  graphql(`
    mutation updateProduct($dto: ProductUpdateDtoInput!) {
      updateProduct(dto: $dto) {
        name
        id
      }
    }
  `),
);

const form = useForm({
  validationSchema: formSchemaProduct,
});

const onSubmit = form.handleSubmit(async (values) => {
  if (!values.unit) {
    return;
  }
  const dto: ProductCreateDtoInput = {
    name: values.name,
    category: values.category,
    carbs: values.carbs,
    fat: values.fat,
    kcal: values.kcal,
    protein: values.protein,
    salt: values.salt,
    sugar: values.sugar,
    amount: values.amount ?? 0,
    unit: values.unit,
    productUnits: unitVariants.value,
  };

  if (!updateValue.value) {
    await mutate({ dto });
  } else {
    const id = result.value?.product?.id;
    if (!id) {
      return;
    }

    await updateProductMutate({
      dto: { ...dto, id },
    });
  }
  await invalidateCache("productsGrouped");
});

const { toast } = useToast();
onDoneProductMutate(() => {
  toast({ title: "Das Produkt wurde erfolgreich aktualisiert" });
});

onDoneProductCreate(() => {
  toast({ title: "Das Produkt wurde erfolgreich angelegt" });
});

const updateValue = ref(false);

watch(result, () => {
  setValuesFromResult();
});

const deepCopyAsString = ref("");
const formAsString = () => JSON.stringify({ ...form.values, productUnits: unitVariants.value });

const setValuesFromResult = () => {
  const product = result.value?.product;
  if (product) {
    updateValue.value = true;
    const { fat, carbs, category, kcal, name, salt, protein, sugar } = product;
    form.resetForm();

    form.setValues({
      fat: nullToUndefined(fat),
      carbs: nullToUndefined(carbs),
      category: nullToUndefined(category),
      kcal: nullToUndefined(kcal),
      name: nullToUndefined(name),
      salt: nullToUndefined(salt),
      protein: nullToUndefined(protein),
      sugar: nullToUndefined(sugar),
      amount: nullToUndefined(defaultUnitVariant.value.amount),
      unit: nullToUndefined(defaultUnitVariant.value.unit),
    });
    deepCopyAsString.value = formAsString();
  }
};

const nullToUndefined = <T,>(val: T | null): T | undefined => {
  return val === null ? undefined : val;
};

onMounted(async () => {
  await refetch();
  initFormData();
});

const initFormData = () => {
  form.setValues({ name: result.value?.product?.name ?? "", category: result.value?.product?.category ?? "" });
};

const unitVariants = ref<ProductUnitCreateOrUpdateDtoInput[]>([]);

const defaultUnitVariant = computed(() => {
  const defaultItem = result.value?.product?.productUnits.find((variant) => variant.isDefault);
  return { amount: defaultItem?.amount ?? 0, unit: defaultItem?.unit ?? "" };
});

const valueChanged = computed(() => {
  return formAsString() !== deepCopyAsString.value;
});
</script>

<template>
  <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit" v-component="'product'">
    <div class="text-right">
      <ProductRemove v-if="result?.product?.id" :id="result?.product?.id" />
    </div>
    <div class="flex justify-between gap-2 flex-wrap mb-4 mt-4">
      <FormInput label="Produktname" :model-value="result?.product?.name ?? ''" name="name" class="w-120" />
      <FormSelect label="Produkt Kategorie" name="category" :select-options="selectableOptions" class="min-w-60" />
    </div>
    <div class="min-w-full flex gap-2"></div>
    <div class="flex flex-wrap gap-2">
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
      <FormInputOptions label="Einheit" name="unit" type="text" :options="getOptions" options-id="units" />
    </div>
    <AddVariantUnits
      v-if="(defaultUnitVariant.amount || form.values.amount) && (defaultUnitVariant.unit || form.values.unit)"
      :options="getOptions"
      :data="result?.product?.productUnits ?? []"
      :default-unit="defaultUnitVariant.unit ?? form.values.unit"
      @update:unit-variants="unitVariants = $event"
    />
    <FormFooter @update:close="setValuesFromResult" abort-label="Zurücksetzen" :disabled="!valueChanged" />
  </Form>
</template>
