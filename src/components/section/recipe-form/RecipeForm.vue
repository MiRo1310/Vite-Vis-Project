<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import Form from "@/components/shared/form/Form.vue";
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { Button } from "@/components/shared/button";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import RecipeDescription from "@/components/section/recipe-form/RecipeDescription.vue";
import RecipeProductGroup from "@/components/section/recipe-form/RecipeProductGroup.vue";
import AddNewProductGroup from "@/components/section/recipe-form/AddNewGroup.vue";
import { OnResult, ProductObjType, TextPositionType } from "@/types/types";
import { useRecipeStore } from "@/store/recipeStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { isDefined } from "@vueuse/core";
import { GetRecipeByIdQuery, RecipeCreateDtoInput, RecipeUpdateDtoInput } from "@/api/gql/graphql";
import { formSchema } from "@/components/section/recipe-form/formSchema";
import { useRoute, useRouter } from "vue-router";
import RecipeRemoveDescription from "@/components/section/recipe-form/RecipeRemoveDescription.vue";
import { graphql } from "@/api/gql";
import { routes } from "@/router/routes.ts";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";
import { Logger } from "@/lib/logger.ts";
import {
  IRecipeDescriptionCreateOrUpdate,
  newIdPrefix,
  TRecipeDescriptionLike,
  TRecipeHeaderProductLike,
  TRecipeProductLike,
} from "@/components/section/recipe-form/index.ts";
import { removeDescriptions } from "@/components/section/recipe-form/removeDescriptions.ts";
import RecipeFormFooter from "@/components/section/recipe-form/RecipeFormFooter.vue";
import { removeRecipeProducts } from "@/components/section/recipe-form/removeRecipeProducts.ts";
import { removeProductGroups } from "@/components/section/recipe-form/removeProductGroups.ts";
import RecipeCategoryFormSelect from "@/components/section/recipe-form/RecipeCategoryFormSelect.vue";
import { deepCopy } from "@michaelroling/ts-library";

type TRecipeQuery = GetRecipeByIdQuery["recipe"];
export type TFormValues = typeof form.values;

const router = useRouter();
const props = defineProps<{ id?: string }>();

const recipeId = ref<string | undefined>(props.id);

const { toast } = useToast();
const { mutate } = useMutation(
  graphql(`
    mutation addRecipe($dto: RecipeCreateDtoInput!) {
      createRecipe(dto: $dto) {
        id
      }
    }
  `),
);

const { mutate: updateMutate } = useMutation(
  graphql(`
    mutation updateRecipe($dto: RecipeUpdateDtoInput!) {
      updateRecipe(dto: $dto) {
        id
      }
    }
  `),
);

const getRecipeByIdQuery = graphql(`
  query getRecipeById($id: UUID!) {
    recipe(id: $id) {
      id
      name
      createdAt
      modifiedAt
      portions
      recipeCategoryId
      preparationTimeMin
      totalTimeMin
      recipeProducts {
        amount
        description
        productId
        groupPosition
        unit
        id
        kcal
        activeUnitId
        sortOrder
        product {
          name
        }
      }
      recipeDescriptions {
        position
        text
        id
        header
      }
      recipeHeaderProducts {
        id
        position
        recipeId
        text
      }
    }
  }
`);

const route = useRoute();

/**
 * Watches route id, if there is no id, it means we are creating a new recipe and the form should be reset to default values.
 * If there is an id, the form will be filled with the recipe data in onMounted.
 */
watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) {
      recipeId.value = undefined;
      resetForm();
    }
  },
);

const { load, onResult } = useLazyQuery(getRecipeByIdQuery);

onResult((result: OnResult<GetRecipeByIdQuery>) => {
  if (!result.data?.recipe) {
    return;
  }
  const response = deepCopy<TRecipeQuery>(result.data.recipe);

  recipe.value = response;
  setValuesToForm(response);
  updateValue.value = true;
});

const recipeStore = useRecipeStore();
const getRecipeFromStore = recipeStore.getRecipeInProgress;
const resetRecipeInStore = recipeStore.resetRecipeInProgress;

onMounted(async () => {
  const recipeFromStore = getRecipeFromStore;

  if (recipeFromStore && recipeId.value === recipeFromStore?.recipeId) {
    valueToForm(recipeFromStore);
    return;
  }

  if (recipeId.value) {
    await load(getRecipeByIdQuery, { id: recipeId.value });
  }
});

onUnmounted(() => {
  if (!form.values) {
    return;
  }
  recipeStore.saveRecipeInProgress(deepCopy<TFormValues>(form.values) ?? {}, recipeId.value);
});

const initialValues = {
  name: "",
  portions: 1,
  recipeCategoryId: null,
  preparationTimeMin: null,
  totalTimeMin: null,
  descriptions: [],
  headersProductArray: [],
  productArray: [],
};

const form = useForm({
  validationSchema: formSchema,
  initialValues: initialValues,
});

const descriptions = computed<IRecipeDescriptionCreateOrUpdate[]>({
  get: () => {
    const current = (form.values.descriptions as IRecipeDescriptionCreateOrUpdate[]) ?? [];
    // Build a dense array of the same length and normalize each entry to avoid holes created by form fields
    return Array.from({ length: current.length }, (_, i) => {
      const d = current[i] as IRecipeDescriptionCreateOrUpdate | undefined;
      return {
        position: i,
        header: d?.header ?? "",
        text: d?.text ?? "",
        id: d?.id,
        positionByCreate: d?.positionByCreate ?? i,
      };
    });
  },
  set: (v) => form.setFieldValue("descriptions", v),
});

const productArray = computed<ProductObjType[]>({
  get: () => {
    const current = (form.values.productArray as ProductObjType[]) ?? [];
    return [...current].map((p, index) => ({ ...p, position: index }));
  },
  set: (v) => form.setFieldValue("productArray", v),
});

const cloneDescriptions = (items: TRecipeDescriptionLike[] = []): NonNullable<TFormValues["descriptions"]> =>
  items.map((item: TRecipeDescriptionLike) => ({
    position: item.position,
    text: item.text,
    id: item.id ?? undefined,
    header: item.header ?? "",
  }));

const cloneHeaders = (items: TRecipeHeaderProductLike[] = []): NonNullable<TFormValues["headersProductArray"]> =>
  items.map((item: TRecipeHeaderProductLike, index: number) => ({
    id: item.id ?? undefined,
    recipeId: item.recipeId ?? undefined,
    text: item.text,
    position: item.position ?? index,
  }));

const cloneProducts = (items: TRecipeProductLike[] = []): NonNullable<TFormValues["productArray"]> =>
  items.map((item: TRecipeProductLike) => ({
    amount: item.amount ?? 0,
    description: item.description ?? "",
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: "",
    id: item.id ?? undefined,
    activeUnitId: item.activeUnitId ?? "",
    position: item.position ?? 0,
    sortOrder: item.sortOrder,
  })) ?? [];

const recipeToFormValues = (recipe?: TRecipeQuery): TFormValues => {
  return {
    productArray: cloneProducts(recipe?.recipeProducts),
    descriptions: cloneDescriptions(recipe?.recipeDescriptions),
    headersProductArray: cloneHeaders(recipe?.recipeHeaderProducts),
    portions: recipe?.portions ?? undefined,
    name: recipe?.name,
    totalTimeMin: recipe?.totalTimeMin,
    preparationTimeMin: recipe?.preparationTimeMin,
    recipeCategoryId: recipe?.recipeCategoryId,
  };
};

const getFormValueOrDefault = <K extends keyof TFormValues>(key: K, formValues?: TFormValues): Exclude<TFormValues[K], undefined> => {
  if (!formValues) {
    return initialValues[key] as Exclude<TFormValues[K], undefined>;
  }
  return (formValues[key] ?? initialValues[key]) as Exclude<TFormValues[K], undefined>;
};

const valueToForm = (formValues?: TFormValues) => {
  const portions = getFormValueOrDefault("portions", formValues);
  const products = getFormValueOrDefault("productArray", formValues);
  const descriptionValues = getFormValueOrDefault("descriptions", formValues);
  const recipeCategoryId = getFormValueOrDefault("recipeCategoryId", formValues);
  const totalTimeMin = getFormValueOrDefault("totalTimeMin", formValues);
  const preparationTimeMin = getFormValueOrDefault("preparationTimeMin", formValues);
  const headers = getFormValueOrDefault("headersProductArray", formValues);
  const name = getFormValueOrDefault("name", formValues);

  const normalizedHeaders = (headers ?? []).map((h, i) => ({
    text: h.text,
    position: h.position ?? i,
    id: h.id,
  }));

  const normalizedProducts = (products ?? []).map((item, index) => ({
    amount: item.amount ?? 0,
    description: item.description ?? "",
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: "",
    id: item.id ?? undefined,
    activeUnitId: item.activeUnitId ?? "",
    position: index,
    sortOrder: item.sortOrder,
  }));

  form.resetForm({
    values: deepCopy({
      portions,
      productArray: normalizedProducts,
      descriptions: descriptionValues,
      recipeCategoryId,
      totalTimeMin,
      preparationTimeMin,
      headersProductArray: normalizedHeaders,
      name,
    }),
  });

  descriptions.value = sortAndAddPositionByCreate(getTextPositionTypeFromResult(descriptionValues ?? []));
  nextDescriptionIndex.value = descriptions.value.length;
  headersProductArray.value = sortHeaderProductsByPosition(normalizedHeaders);
  productArray.value = normalizedProducts;
};

const setValuesToForm = (recipe: TRecipeQuery) => {
  if (!recipe) {
    return;
  }

  valueToForm(recipeToFormValues(recipe));

  descriptions.value = sortAndAddPositionByCreate(getTextPositionTypeFromResult(recipe.recipeDescriptions));

  nextDescriptionIndex.value = descriptions.value.length;
  headersProductArray.value = sortHeaderProductsByPosition(getTextPositionTypeFromResult(recipe.recipeHeaderProducts));

  productArray.value = recipe.recipeProducts.map((item, index) => ({
    amount: item.amount || 0,
    description: item.description,
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: item.unit,
    id: item.id,
    activeUnitId: item.activeUnitId ?? "",
    position: index,
    sortOrder: item.sortOrder,
  }));
};

const recipe = ref<TRecipeQuery>();

const getTextPositionTypeFromResult = <T extends { text: string; position: number }>(obj: T[]): T[] => {
  return obj.filter((item) => isDefined(item.text) && isDefined(item.position));
};

const removeNewIdForMutate = (productArray: typeof form.values.productArray): typeof form.values.productArray => {
  return productArray?.map((product) => {
    if (product.id?.startsWith(newIdPrefix)) {
      return { ...product, id: undefined };
    }
    return product;
  });
};

const descriptionsToDelete = ref<string[]>([]);

const onSubmit = form.handleSubmit(async (values) => {
  const dto: RecipeCreateDtoInput = {
    name: values.name,
    portions: values.portions ?? 0,
    preparationTimeMin: values.preparationTimeMin ?? null,
    totalTimeMin: values.totalTimeMin ?? null,
    recipeCategoryId: values.recipeCategoryId ?? null,
    recipeDescriptions: values.descriptions,
    recipeHeaderProducts: values.headersProductArray,
    recipeProducts: removeNewIdForMutate(values.productArray),
  };
  Logger("Submit dto", { value: dto });

  if (!recipeId.value) {
    Logger("Creating new recipe");
    const result = await mutate({ dto });

    const recipeId = result?.data?.createRecipe.id;
    const description = values.name;

    toast({
      title: "Das Rezept wurde gespeichert",
      description: description,
    });
    if (recipeId) {
      await goBack(recipeId);
    }
    return;
  }

  const dtoUpdate: RecipeUpdateDtoInput = {
    id: recipeId.value,
    ...dto,
  };

  removeDescriptions(descriptionsToDelete.value);

  await removeProductGroups(recipeStore.getRecipeGroupIdsToDelete);
  recipeStore.clearRecipeGroupIdsToDelete();

  await removeRecipeProducts(recipeStore.getRecipeProductsToDelete);
  recipeStore.clearRecipeProductIdsToDelete();

  await updateMutate({ dto: dtoUpdate }, { refetchQueries: ["getRecipeById"] });

  toast({
    title: "Das Rezept wurde aktualisiert",
    description: values.name,
  });
  if (recipeId.value) {
    await goBack(recipeId.value);
  }
});

const navigateBackToRecipeDetails = ref(false);
const goBack = async (id: string) => {
  if (navigateBackToRecipeDetails.value) {
    resetForm();
    navigateBackToRecipeDetails.value = false;
    await router.push({ name: routes.recipeDetails.name, params: { recipeId: id } });
  }
};

const defaultProduct: ProductObjType = {
  productId: "",
  description: "",
  amount: 0,
  groupPosition: 0,
  id: undefined,
  activeUnitId: "",
  position: productArray.value.length,
  sortOrder: productArray.value.length,
};

const resetForm = () => {
  recipeStore.setShouldValidate(false);
  resetRecipeInStore();

  if (!recipeId.value) {
    form.resetForm({ values: deepCopy(initialValues) });
    descriptions.value = [];
    headersProductArray.value = [];
    productArray.value = [];
    valueToForm();
    return;
  }

  const values = recipeToFormValues(recipe.value);
  form.resetForm({ values: deepCopy(values) });
  descriptions.value = sortAndAddPositionByCreate(getTextPositionTypeFromResult(values.descriptions ?? []));
  nextDescriptionIndex.value = descriptions.value.length;
  const resetHeaders = (values.headersProductArray ?? []).map((header, index) => ({
    text: header.text,
    position: header.position ?? index,
    id: header.id,
  }));
  headersProductArray.value = sortHeaderProductsByPosition(resetHeaders);
  const resetProducts = (values.productArray ?? []).map((product, index) => ({
    ...product,
    id: product.id ?? undefined,
    description: product.description ?? "",
    position: index,
  }));
  productArray.value = resetProducts.length ? resetProducts : [defaultProduct];
};

const updateValue = ref(false);
const textareaFocus = ref(false);

const enterPress = async () => {
  Logger("Submit values by enter press");
  if (!textareaFocus.value) {
    await onSubmit();
  }
};

const sortHeaderProductsByPosition = <T extends { text: string; position: number }>(obj: T[]): T[] => {
  return [...obj].sort((a, b) => a.position - b.position);
};

const sortAndAddPositionByCreate = <T extends { text: string; position: number }>(obj: T[]): IRecipeDescriptionCreateOrUpdate[] =>
  [...obj].sort((a, b) => a.position - b.position).map((d, index) => ({ ...d, positionByCreate: index }));

const headersProductArray = ref<TextPositionType[]>([]);

watchEffect(() => {
  if (!productArray.value?.length) {
    recipeStore.setProductGroupCount(0);
    return 0;
  }
  recipeStore.setProductGroupCount(
    productArray.value?.reduce((acc, curr) => {
      return curr.groupPosition > acc ? curr.groupPosition : acc;
    }, 0) + 1,
  );
});

const nextDescriptionIndex = ref(0);
const addDescription = () => {
  const descriptionsCopy = [...descriptions.value];
  const newItem: IRecipeDescriptionCreateOrUpdate = {
    position: descriptionsCopy.length,
    text: "",
    header: "",
    positionByCreate: nextDescriptionIndex.value,
  };
  descriptions.value = [...descriptionsCopy, newItem];
  nextDescriptionIndex.value++;
};
</script>

<template>
  <div class="max-h-full overflow-auto -mr-2">
    <Form class-content="h-full" @keydown.enter.prevent="enterPress" @update:on-submit="onSubmit" v-component="'recipe-form'">
      <div class="flex md:flex-row flex-col w-full h-full gap-2 pr-1">
        <div class="flex-col flex-1 h-full">
          <FormInput label="Rezeptname" name="name" class="flex-1" />

          <div class="flex gap-2 items-start flex-wrap">
            <FormInput label="Portionen" name="portions" type="number" />
            <FormInput label="Zubereitungszeit (min)" name="preparationTimeMin" type="number" />
            <FormInput label="Gesamtzeit (min)" name="totalTimeMin" type="number" />
            <RecipeCategoryFormSelect />
          </div>

          <div
            v-for="(description, index) in descriptions"
            :key="description.positionByCreate ?? description.id ?? index"
            class="bg-accent rounded-lg p-2 mt-2"
          >
            <RecipeDescription :index />
            <RecipeRemoveDescription
              v-model:descriptions="descriptions"
              v-model:descriptions-to-delete="descriptionsToDelete"
              :description="description"
            />
          </div>
          <div class="flex justify-end mt-2 gap-2">
            <Button variant="warning" @click.prevent="addDescription">Neuen Rezept Text hinzufügen</Button>
          </div>
        </div>

        <div class="md:w-120 w-full">
          <RecipeFormFooter @abort="resetForm" v-model:back-to-recipe="navigateBackToRecipeDetails" />
          <div v-for="oneBasedIndex in recipeStore.getProductGroupsCount" :key="oneBasedIndex" class="mb-2">
            <RecipeProductGroup
              v-model:product-array="productArray"
              v-model:headers-product-array="headersProductArray"
              :recipe
              :group-index="toZeroBasedIndex(oneBasedIndex)"
              :form
            />
          </div>

          <AddNewProductGroup v-model:headers-product-array="headersProductArray" v-model:product-array="productArray" />
        </div>
      </div>

      <RecipeFormFooter v-if="productArray.length" @abort="resetForm" class="mt-2" v-model:back-to-recipe="navigateBackToRecipeDetails" />
    </Form>
  </div>
</template>
