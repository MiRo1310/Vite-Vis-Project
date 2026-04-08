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
import { OnResult } from "@/types/types";
import { useRecipeStore } from "@/store/recipeStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { GetRecipeByIdQuery, RecipeCreateDtoInput, RecipeUpdateDtoInput } from "@/api/gql/graphql";
import { formSchema, TDescriptionSchema, TProductSchema } from "@/components/section/recipe-form/formSchema";
import { useRoute, useRouter } from "vue-router";
import RecipeRemoveDescription from "@/components/section/recipe-form/RecipeRemoveDescription.vue";
import { graphql } from "@/api/gql";
import { routes } from "@/router/routes.ts";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";
import { Logger } from "@/lib/logger.ts";
import { newIdPrefix, TRecipeDescriptionLike, TRecipeHeaderProductLike, TRecipeProductLike } from "@/components/section/recipe-form/index.ts";
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

const formProducts = computed((): TProductSchema[] => form.values.productArray ?? []);
const formDescriptions = computed((): TDescriptionSchema[] => form.values.descriptions ?? []);

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

const cloneProducts = (items: TRecipeProductLike[] = []): TProductSchema[] =>
  items.map((item: TRecipeProductLike, index: number) => ({
    amount: item.amount ?? 0,
    description: item.description ?? "",
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: "",
    id: item.id ?? undefined,
    activeUnitId: item.activeUnitId ?? "",
    position: item.position ?? index,
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
};

const setValuesToForm = (recipe: TRecipeQuery) => {
  if (!recipe) {
    return;
  }

  valueToForm(recipeToFormValues(recipe));
};

const recipe = ref<TRecipeQuery>();

const removeNewIdForMutate = (productArray?: TProductSchema[]): TProductSchema[] | undefined => {
  return productArray?.map((product) => {
    if (product.id?.startsWith(newIdPrefix)) {
      return { ...product, id: undefined };
    }
    return product;
  });
};

const cleanUpFormProducts = (products?: TProductSchema[]): RecipeCreateDtoInput["recipeProducts"] => {
  return products?.map(({ position: _, ...rest }) => rest);
};

const onSubmit = form.handleSubmit(async (values) => {
  const dto: RecipeCreateDtoInput = {
    name: values.name,
    portions: values.portions ?? 0,
    preparationTimeMin: values.preparationTimeMin ?? null,
    totalTimeMin: values.totalTimeMin ?? null,
    recipeCategoryId: values.recipeCategoryId ?? null,
    recipeDescriptions: values.descriptions,
    recipeHeaderProducts: values.headersProductArray,
    recipeProducts: cleanUpFormProducts(removeNewIdForMutate(values.productArray)),
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
    if (!recipeId) {
      return;
    }
    const willNavigateToDetails = await toDetails(recipeId);

    if (!willNavigateToDetails) {
      await router.push({ name: routes.editRecipe.name, params: { id: recipeId } });
    }

    return;
  }

  const dtoUpdate: RecipeUpdateDtoInput = {
    id: recipeId.value,
    ...dto,
  };

  removeDescriptions(recipeStore.getRecipeDescriptionIdsToDelete);
  recipeStore.clearRecipeDescriptionIdsToDelete();

  await removeProductGroups(recipeStore.getRecipeGroupIdsToDelete);
  recipeStore.clearRecipeGroupIdsToDelete();

  await removeRecipeProducts(recipeStore.getRecipeProductIdsToDelete);
  recipeStore.clearRecipeProductIdsToDelete();

  await updateMutate({ dto: dtoUpdate }, { refetchQueries: ["getRecipeById"] });

  toast({
    title: "Das Rezept wurde aktualisiert",
    description: values.name,
  });

  await toDetails(recipeId.value);
});

const navigateBackToRecipeDetails = ref(false);
const toDetails = async (id: string): Promise<boolean> => {
  if (navigateBackToRecipeDetails.value) {
    resetForm();
    navigateBackToRecipeDetails.value = false;
    await router.push({ name: routes.recipeDetails.name, params: { recipeId: id } });
    return true;
  }
  return false;
};

const resetForm = () => {
  recipeStore.setShouldValidate(false);
  resetRecipeInStore();

  if (!recipeId.value) {
    valueToForm();
    return;
  }

  const values = recipeToFormValues(recipe.value);
  form.resetForm({ values: deepCopy(values) });
};

const updateValue = ref(false);
const textareaFocus = ref(false);

const enterPress = async () => {
  Logger("Submit values by enter press");
  if (!textareaFocus.value) {
    await onSubmit();
  }
};

watchEffect(() => {
  if (!formProducts.value?.length) {
    recipeStore.setProductGroupCount(0);
    return 0;
  }
  recipeStore.setProductGroupCount(
    formProducts.value?.reduce((acc, curr) => {
      return curr.groupPosition > acc ? curr.groupPosition : acc;
    }, 0) + 1,
  );
});

const saveToFormDescriptions = (descriptions: TDescriptionSchema[]) => {
  form.setFieldValue("descriptions", descriptions);
};

const addDescription = () => {
  const descriptionsCopy: TDescriptionSchema[] = [...formDescriptions.value];
  const newItem: TDescriptionSchema = {
    position: descriptionsCopy.length,
    text: "",
    header: "",
  };

  saveToFormDescriptions([...descriptionsCopy, newItem]);
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
            v-for="(description, index) in formDescriptions"
            :key="description.position ?? description.id ?? index"
            class="bg-accent rounded-lg p-2 mt-2"
          >
            <RecipeDescription :index />
            <RecipeRemoveDescription :description :form />
          </div>
          <div class="flex justify-end mt-2 gap-2">
            <Button variant="warning" @click.prevent="addDescription">Neuen Rezept Text hinzufügen</Button>
          </div>
        </div>

        <div class="md:w-120 w-full">
          <RecipeFormFooter @abort="resetForm" v-model:back-to-recipe="navigateBackToRecipeDetails" />
          <div v-for="oneBasedIndex in recipeStore.getProductGroupsCount" :key="oneBasedIndex" class="mb-2">
            <RecipeProductGroup :recipe :group-index="toZeroBasedIndex(oneBasedIndex)" :form />
          </div>

          <AddNewProductGroup :form />
        </div>
      </div>

      <RecipeFormFooter v-if="formProducts.length" @abort="resetForm" class="mt-2" v-model:back-to-recipe="navigateBackToRecipeDetails" />
    </Form>
  </div>
</template>
