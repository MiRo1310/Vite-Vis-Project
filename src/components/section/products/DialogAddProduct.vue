<script setup lang="ts">
import DialogShared from "@/components/shared/dialog/DialogShared.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import Form from "@/components/shared/form/Form.vue";
import { useApolloClient, useMutation } from "@vue/apollo-composable";
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, ref, watch } from "vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { GetProductByIdQuery, ProductCreateDtoInput, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";
import { useUnits } from "@/composables/querys/units.ts";
import { formSchemaProduct } from "@/components/section/products/schema.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { invalidateCache } from "@/composables/querys/utils.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";

const props = defineProps<{ data?: GetProductByIdQuery["product"] }>();

const { getOptions } = useUnits();

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

const dialogOpen = defineModel<boolean>("dialogOpen");

const form = useForm({
  validationSchema: formSchemaProduct,
  initialValues: { name: props.data?.name ?? "", category: props.data?.category ?? "", amount: 100, unit: "g" },
  validateOnMount: false,
});

const client = useApolloClient().client;

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
    productUnits: unitVariants.value as [ProductUnitCreateOrUpdateDtoInput],
  };
  if (!updateValue.value) {
    await mutate({ dto });
  } else {
    const id = props.data?.id;
    if (!id) {
      return;
    }

    await updateProductMutate({
      dto: { ...dto, id },
    });
  }
  await invalidateCache(client, "products");
  closeDialog();
});

const closeDialog = () => {
  dialogOpen.value = false;
};

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

watch(
  () => props.data,
  () => {
    if (props.data) {
      updateValue.value = true;
      const { fat, carbs, category, kcal, name, salt, protein, sugar } = props.data;
      form.resetForm();
      form.setValues({
        fat,
        carbs,
        category: category ?? "",
        kcal,
        name,
        salt,
        protein,
        sugar,
        amount: defaultUnitVariant.value.amount,
        unit: defaultUnitVariant.value.unit,
      });
    }
  },
);

const unitVariants = ref<ProductUnitCreateOrUpdateDtoInput[]>([]);

const defaultUnitVariant = computed(() => {
  const defaultItem = props.data?.productUnits.find((variant) => variant.isDefault);
  return { amount: defaultItem?.amount ?? 100, unit: defaultItem?.unit ?? "g" };
});
</script>

<template>
  <DialogShared v-model:dialog-open="dialogOpen" title="Ein neues Lebensmittel hinzufügen">
    <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
      <div class="flex gap-2 items-baseline mb-4">
        <FormInput label="Produkt" name="name" class="flex-1" />
        <FormSelect label="Kategorie" placeholder="Wähle eine Kategorie" name="category" :select-options="selectableOptions" class="w-40" />
      </div>
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
        :data="props.data?.productUnits ?? []"
        :default-unit="defaultUnitVariant.unit ?? form.values.unit"
        @update:unit-variants="unitVariants = $event"
      />

      <template #footer>
        <FormFooter @update:close="closeDialog" />
      </template>
    </Form>
  </DialogShared>
</template>
