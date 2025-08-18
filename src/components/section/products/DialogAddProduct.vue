<script setup lang="ts">
import DialogShared from "@/components/shared/dialog/DialogShared.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import Form from "@/components/shared/form/Form.vue";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { products } from "@/api/query/products";
import { addProduct } from "@/api/mutation/addProduct";
import { useProductCategories } from "@/composable/querys/productCategories";
import ProductCategories from "@/components/section/products/ProductCategories.vue";
import { computed, onMounted, ref, watch } from "vue";
import { updateProduct } from "@/api/mutation/updateProduct";
import { getUnits } from "@/api/query/getUnits";
import { InputOptions } from "@/components/shared/input/Input.vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { ProductCreateDtoInput, ProductsQuery, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";

const props = defineProps<{ data?: ProductsQuery["products"][number] }>();

const { getCategoryIdByName, isResult } = useProductCategories();

const { selectableOptions } = useProductCategories();
const { mutate } = useMutation(addProduct, { refetchQueries: [products] });
const { mutate: updateProductMutate } = useMutation(updateProduct, { refetchQueries: [products] });

const dialogOpen = defineModel<boolean>("dialogOpen");

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    category: z.string().min(2).default(getCategoryIdByName("Allgemein")),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    kcal: z.number().optional(),
    protein: z.number().optional(),
    salt: z.number().optional(),
    sugar: z.number().optional(),
    amount: z.number().optional(),
    unit: z.string().optional(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
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
  closeDialog();
});

const resetCategoryId = () => {
  form.setValues({ ...form.values, category: getCategoryIdByName("Allgemein") });
};

const closeDialog = () => {
  dialogOpen.value = false;
};

watch(
  () => dialogOpen.value,
  () => {
    if (updateValue.value) return;
    form.resetForm();
  }
);
const updateValue = ref(false);

watch(
  () => props.data,
  () => {
    if (props.data) {
      updateValue.value = true;
      const { fat, carbs, category, kcal, name, salt, protein, sugar, amount, unit } = props.data;
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
        amount: nullToUndefined(amount),
        unit: nullToUndefined(unit),
      });
    }
  }
);

const nullToUndefined = <T,>(val: T | null): T | undefined => {
  return val === null ? undefined : val;
};

const getSelected = computed(() => {
  if (!props.data?.category) {
    form.setFieldValue("category", getCategoryIdByName("Allgemein"));
    return getCategoryIdByName("Allgemein");
  }

  return props.data.category;
});

const { load, result } = useLazyQuery(getUnits);

onMounted(() => load());

const getOptions = computed(
  (): InputOptions[] => result.value?.units.filter((unit) => unit.id && unit.name).map((unit) => ({ id: unit.id, name: unit.name })) ?? []
);
type Units = NonNullable<ProductsQuery["products"][number]>["productUnits"];
const unitVariants = ref<Units>([]);
const amount = ref<number | undefined | null>(props.data?.amount);
const unit = ref<string | undefined | null>(props.data?.unit);
watch(
  () => props.data?.unit,
  () => {
    unit.value = props.data?.unit;
  }
);
watch(
  () => props.data?.amount,
  () => {
    amount.value = props.data?.amount;
  }
);
</script>

<template>
  <DialogShared v-model:dialog-open="dialogOpen" title="Ein neues Lebensmittel hinzufügen">
    <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
      <div class="min-w-full h-28">
        <FormInput label="Produkt" :model-value="props.data?.name as string" name="name" class="w-[30rem]" />
      </div>

      <div class="min-w-full h-28 flex">
        <FormSelect v-if="isResult" label="Kategorie" name="category" :selected="getSelected" :select-options="selectableOptions" class="w-60" />
        <ProductCategories :id="form.values.category" @update:remove-category="resetCategoryId" />
      </div>
      <FormInput label="Kalorien" name="kcal" type="number" :step="0.1" :model-value="props.data?.kcal?.toString()" />
      <FormInput label="Fett" name="fat" type="number" :step="0.1" :model-value="props.data?.fat?.toString()" />
      <FormInput label="Kohlenhydrate" name="carbs" type="number" :step="0.1" :model-value="props.data?.carbs?.toString()" />
      <FormInput label="Zucker" name="sugar" type="number" :step="0.1" :model-value="props.data?.sugar?.toString()" />
      <FormInput label="Salz" name="salt" type="number" :step="0.1" :model-value="props.data?.salt?.toString()" />
      <FormInput label="Protein" name="protein" type="number" :step="0.1" :model-value="props.data?.protein?.toString()" />
      <p class="w-full font-bold mb-4 mt-6">Bezogen auf diese Menge</p>
      <div class="flex w-full space-x-2">
        <FormInput
          label="Menge"
          name="amount"
          type="number"
          :step="0.1"
          :model-value="props.data?.amount?.toString()"
          @update:model-value="amount = Number($event)"
        />
        <FormInput
          label="Unit"
          name="unit"
          type="text"
          :model-value="props.data?.unit?.toString()"
          :options="getOptions"
          options-id="units"
          @update:model-value="unit = $event"
        />
      </div>

      <AddVariantUnits
        v-if="amount && unit"
        :options="getOptions"
        :data="props.data?.productUnits ?? []"
        :default-unit="unit"
        @update:unit-variants="unitVariants = $event"
      />

      <template #footer>
        <FormFooter @update:close="closeDialog" />
      </template>
    </Form>
  </DialogShared>
</template>
