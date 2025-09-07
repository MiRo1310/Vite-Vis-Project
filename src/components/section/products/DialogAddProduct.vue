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
import { useProductCategories } from "@/composables/querys/productCategories";
import { computed, onMounted, ref, watch } from "vue";
import { InputOptions } from "@/components/shared/input/Input.vue";
import AddVariantUnits from "@/components/section/products/AddVariantUnits.vue";
import { GetProductByIdQuery, ProductCreateDtoInput, ProductUnitCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { graphql } from "@/api/gql";

const props = defineProps<{ data?: GetProductByIdQuery["product"] }>();

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
  { refetchQueries: ["GetProducts"] },
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
  { refetchQueries: ["GetProducts"] },
);

const dialogOpen = defineModel<boolean>("dialogOpen");

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    category: z.string().min(2),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    kcal: z.number().optional(),
    protein: z.number().optional(),
    salt: z.number().optional(),
    sugar: z.number().optional(),
    amount: z.number().optional(),
    unit: z.string().optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  if (!values.unit) return;
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

const closeDialog = () => {
  dialogOpen.value = false;
};

watch(
  () => dialogOpen.value,
  () => {
    if (updateValue.value) return;
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
    }
  },
);

const nullToUndefined = <T,>(val: T | null): T | undefined => {
  return val === null ? undefined : val;
};

const getSelected = computed(() => {
  if (!props.data?.category) {
    return;
  }

  return props.data.category;
});

const { load, result } = useLazyQuery(
  graphql(`
    query Units {
      units {
        id
        name
      }
    }
  `),
);

onMounted(() => {
  load();
  initFormData();
});

const initFormData = () => {
  form.values.name = props.data?.name ?? "";
  form.values.category = props.data?.category ?? "";
};

const getOptions = computed(
  (): InputOptions[] => result.value?.units.filter((unit) => unit.id && unit.name).map((unit) => ({ id: unit.id, name: unit.name })) ?? [],
);
const unitVariants = ref<ProductUnitCreateOrUpdateDtoInput[]>([]);

const defaultUnitVariant = computed(() => {
  const defaultItem = props.data?.productUnits.find((variant) => variant.isDefault);
  return { amount: defaultItem?.amount ?? 0, unit: defaultItem?.unit ?? "" };
});
</script>

<template>
  <DialogShared v-model:dialog-open="dialogOpen" title="Ein neues Lebensmittel hinzufügen">
    <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
      <FormInput label="Produkt" :model-value="props.data?.name ?? ''" name="name" class="w-[30rem] ml-2" />

      <div class="min-w-full flex gap-2">
        <FormSelect label="Kategorie" name="category" :selected="getSelected" :select-options="selectableOptions" class="w-40" />
      </div>
      <FormInput label="Kalorien" name="kcal" type="number" :step="1" :model-value="props.data?.kcal?.toString()" />
      <FormInput label="Fett" name="fat" type="number" :step="0.01" :model-value="props.data?.fat?.toString()" />
      <FormInput label="Kohlenhydrate" name="carbs" type="number" :step="0.01" :model-value="props.data?.carbs?.toString()" />
      <FormInput label="Zucker" name="sugar" type="number" :step="0.01" :model-value="props.data?.sugar?.toString()" />
      <FormInput label="Salz" name="salt" type="number" :step="0.01" :model-value="props.data?.salt?.toString()" />
      <FormInput label="Protein" name="protein" type="number" :step="0.01" :model-value="props.data?.protein?.toString()" />
      <p class="w-full font-bold mb-4 mt-6">Bezogen auf diese Menge</p>
      <div class="flex w-full space-x-2">
        <FormInput label="Menge" name="amount" type="number" :step="0.1" :model-value="defaultUnitVariant.amount.toString()" />
        <FormInput label="Unit" name="unit" type="text" :model-value="defaultUnitVariant.unit" :options="getOptions" options-id="units" />
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
