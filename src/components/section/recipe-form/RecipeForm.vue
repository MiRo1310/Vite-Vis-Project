<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import Form from "@/components/shared/form/Form.vue";
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import RecipeDescription from "@/components/section/recipe-form/RecipeDescription.vue";
import RecipeProductGroup from "@/components/section/recipe-form/RecipeProductGroup.vue";
import AddNewProductGroup from "@/components/section/recipe-form/AddNewGroup.vue";
import { type OnResult } from "@/types/types";
import { useRecipeStore } from "@/store/recipeStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { type GetRecipeByIdQuery, type RecipeCreateDtoInput, type RecipeUpdateDtoInput } from "@/api/gql/graphql";
import { schemaForm, type TDescriptionSchema, type TProductSchema } from "@/components/section/recipe-form/schema.form";
import { useRoute, useRouter } from "vue-router";
import RecipeRemoveDescription from "@/components/section/recipe-form/RecipeRemoveDescription.vue";
import { graphql } from "@/api/gql";
import { routes } from "@/router/routes.ts";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";
import { Logger } from "@/lib/logger.ts";
import { type TRecipeDescriptionLike, type TRecipeHeaderProductLike, type TRecipeProductLike } from "@/components/section/recipe-form/index.ts";
import { removeDescriptions } from "@/components/section/recipe-form/removeDescriptions.ts";
import { removeRecipeProducts } from "@/components/section/recipe-form/removeRecipeProducts.ts";
import { removeProductGroups } from "@/components/section/recipe-form/removeProductGroups.ts";
import RecipeCategoryFormSelect from "@/components/section/recipe-form/RecipeCategoryFormSelect.vue";
import { deepCopy } from "@michaelroling/ts-library";
import { newIdPrefix } from "@/components/section/recipe-form/utils.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-vue-next";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";

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
  validationSchema: schemaForm,
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
  }));

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

  const normalizedHeaders = headers.map((h, i) => ({
    text: h.text,
    position: h.position ?? i,
    id: h.id,
  }));

  const normalizedProducts = products.map((item, index) => ({
    amount: item.amount,
    description: item.description ?? "",
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: "",
    id: item.id ?? undefined,
    activeUnitId: item.activeUnitId,
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

const setValuesToForm = (recipe?: TRecipeQuery) => {
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
    portions: values.portions,
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

    const id = result?.data?.createRecipe.id;
    const description = values.name;

    toast({
      title: "Das Rezept wurde gespeichert",
      description: description,
    });
    if (!id) {
      return;
    }
    const willNavigateToDetails = await toDetails(id);

    if (!willNavigateToDetails) {
      await router.push({ name: routes.editRecipe.name, params: { id } });
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
  currentStep.value = 1;

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
  if (!formProducts.value.length) {
    recipeStore.setProductGroupCount(0);
    return 0;
  }
  recipeStore.setProductGroupCount(
    formProducts.value.reduce((acc, curr) => {
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

const currentStep = ref(1);

const stepCircle = (step: number): string => {
  const base = "h-7 w-7 rounded-full flex items-center justify-center transition-colors shrink-0";
  if (currentStep.value === step) {
    return `${base} bg-orange-500 text-white`;
  }
  if (currentStep.value > step) {
    return `${base} bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400`;
  }
  return `${base} bg-muted text-muted-foreground`;
};

const goNext = () => {
  currentStep.value = Math.min(currentStep.value + 1, 3);
};
</script>

<template>
  <div class="max-h-full overflow-auto -mr-2 pb-2 pr-1">

    <!-- Hero Banner -->
    <div class="rounded-xl bg-gradient-to-br from-orange-500/10 via-amber-400/5 to-transparent border border-border/60 mb-4 p-4">
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1">
        {{ recipeId ? "Rezept bearbeiten" : "Neues Rezept" }}
      </p>
      <h1 class="text-xl font-bold tracking-tight">
        {{ form.values.name || "Unbenanntes Rezept" }}
      </h1>
      <RecipeMetaInfo
        :preparation-time-min="form.values.preparationTimeMin"
        :total-time-min="form.values.totalTimeMin"
        :portions="form.values.portions"
        class="mt-1.5"
      />
    </div>

    <!-- Step Indicator -->
    <div class="flex items-start mb-5 px-2">
      <button type="button" class="flex flex-col items-center gap-1 shrink-0" @click="currentStep = 1">
        <div :class="stepCircle(1)">
          <Check v-if="currentStep > 1" class="h-3.5 w-3.5" />
          <span v-else class="text-xs font-bold">1</span>
        </div>
        <span class="text-xs whitespace-nowrap" :class="currentStep >= 1 ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-muted-foreground'">Grunddaten</span>
      </button>
      <div class="flex-1 h-px mt-3.5 mx-2" :class="currentStep > 1 ? 'bg-orange-400/60' : 'bg-border'" />
      <button type="button" class="flex flex-col items-center gap-1 shrink-0" @click="currentStep = 2">
        <div :class="stepCircle(2)">
          <Check v-if="currentStep > 2" class="h-3.5 w-3.5" />
          <span v-else class="text-xs font-bold">2</span>
        </div>
        <span class="text-xs whitespace-nowrap" :class="currentStep >= 2 ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-muted-foreground'">Beschreibung</span>
      </button>
      <div class="flex-1 h-px mt-3.5 mx-2" :class="currentStep > 2 ? 'bg-orange-400/60' : 'bg-border'" />
      <button type="button" class="flex flex-col items-center gap-1 shrink-0" @click="currentStep = 3">
        <div :class="stepCircle(3)">
          <span class="text-xs font-bold">3</span>
        </div>
        <span class="text-xs whitespace-nowrap" :class="currentStep >= 3 ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-muted-foreground'">Zutaten</span>
      </button>
    </div>

    <Form @keydown.enter.prevent="enterPress" @update:on-submit="onSubmit">

      <!-- Schritt 1: Grunddaten -->
      <div v-show="currentStep === 1" class="flex flex-col gap-3">
        <Card class="py-0 gap-0">
          <CardContent class="px-4 pt-3 pb-4 flex flex-col gap-3">
            <FormInput label="Rezeptname" name="name" />
            <div class="grid grid-cols-2 gap-3">
              <FormInput label="Portionen" name="portions" type="number" />
              <RecipeCategoryFormSelect />
              <FormInput label="Vorbereitung (min)" name="preparationTimeMin" type="number" />
              <FormInput label="Gesamtzeit (min)" name="totalTimeMin" type="number" />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Schritt 2: Beschreibung -->
      <div v-show="currentStep === 2" class="flex flex-col gap-3">
        <Card
          v-for="(description, index) in formDescriptions"
          :key="description.position ?? description.id ?? index"
          class="py-0 gap-0"
        >
          <CardHeader class="px-4 pt-2 pb-0 flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-xs text-muted-foreground uppercase tracking-wide">Schritt {{ index + 1 }}</CardTitle>
            <RecipeRemoveDescription :description :form />
          </CardHeader>
          <CardContent class="px-4 pt-2 pb-3">
            <RecipeDescription :index />
          </CardContent>
        </Card>
        <button
          type="button"
          class="w-full rounded-lg border border-dashed border-border/60 py-3 text-sm text-muted-foreground hover:border-orange-400/60 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/5 transition-colors"
          @click.prevent="addDescription"
        >
          + Beschreibung hinzufügen
        </button>
      </div>

      <!-- Schritt 3: Zutaten -->
      <div v-show="currentStep === 3" class="flex flex-col gap-3">
        <Card
          v-for="oneBasedIndex in recipeStore.getProductGroupsCount"
          :key="oneBasedIndex"
          class="py-0 gap-0"
        >
          <CardContent class="px-3 pt-2 pb-3">
            <RecipeProductGroup :recipe :group-index="toZeroBasedIndex(oneBasedIndex)" :form />
          </CardContent>
        </Card>
        <AddNewProductGroup :form />
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <Button v-if="currentStep > 1" type="button" variant="outline" size="sm" @click.prevent="currentStep--">
          ← Zurück
        </Button>
        <div v-else />
        <div class="flex gap-2">
          <Button type="button" variant="default" size="sm" @click.stop="resetForm">Zurücksetzen</Button>
          <Button v-if="currentStep < 3" type="button" size="sm" @click.prevent="goNext">Weiter →</Button>
          <template v-else>
            <Button type="submit" variant="outline" size="sm">Speichern</Button>
            <Button type="submit" size="sm" @click="navigateBackToRecipeDetails = true">Speichern & zurück</Button>
          </template>
        </div>
      </div>

    </Form>
  </div>
</template>
