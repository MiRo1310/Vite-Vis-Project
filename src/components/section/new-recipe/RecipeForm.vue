<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import Form from "@/components/shared/form/Form.vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { Button } from "@/components/shared/button";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import RecipeDescription from "@/components/section/new-recipe/RecipeDescription.vue";
import RecipeProductGroup from "@/components/section/new-recipe/RecipeProductGroup.vue";
import AddNewProductGroup from "@/components/section/new-recipe/AddNewGroup.vue";
import { OnResult, ProductObjType, TextPositionType } from "@/types/types";
import { useRecipeStore } from "@/store/recipeStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { isDefined } from "@vueuse/core";
import { GetRecipeByIdQuery, RecipeCreateDtoInput, RecipeUpdateDtoInput } from "@/api/gql/graphql";
import { formSchema } from "@/components/section/new-recipe/formSchema";
import { useRouter } from "vue-router";
import RecipeRemoveDescription from "@/components/section/new-recipe/RecipeRemoveDescription.vue";
import { graphql } from "@/api/gql";
import { routes } from "@/router/routes.ts";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";
import { Logger } from "@/lib/logger.ts";
import { IRecipeDescriptionCreateOrUpdate, newIdPrefix } from "@/components/section/new-recipe/index.ts";
import { removeDescriptions } from "@/components/section/new-recipe/removeDescriptions.ts";
import RecipeFormFooter from "@/components/section/new-recipe/RecipeFormFooter.vue";
import { removeRecipeProducts } from "@/components/section/new-recipe/removeRecipeProducts.ts";
import { removeProductGroups } from "@/components/section/new-recipe/removeProductGroups.ts";

type RecipeType = GetRecipeByIdQuery["recipe"];

const router = useRouter();
// TODO Woher kommt id ? Wird nicht gebraucht da es der gleiche Wert wie recipeId ist
//eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{ recipeId?: string; id?: string }>();

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

const store = useRecipeStore();

const { load, onResult } = useLazyQuery(getRecipeByIdQuery);

onResult((result: OnResult<GetRecipeByIdQuery>) => {
  if (!result.data?.recipe) {
    return;
  }
  const response = JSON.parse(JSON.stringify(result.data.recipe)) as RecipeType | undefined;

  recipe.value = response;
  setValuesToForm(response);
  updateValue.value = true;
});

const recipeStore = useRecipeStore();
const getRecipeFromStore = recipeStore.getRecipeFromStore;
const resetRecipeInStore = recipeStore.resetRecipeInStore.bind(recipeStore);

onMounted(async () => {
  const recipe = getRecipeFromStore;

  if (recipe && !(props.recipeId === "new")) {
    setValuesToForm(recipe);
  }

  if (props.recipeId && props.recipeId !== "undefined") {
    await load(getRecipeByIdQuery, { id: props.recipeId });
  }
});

const form = useForm({
  validationSchema: formSchema,
});
const { values } = form;

const descriptions = computed<IRecipeDescriptionCreateOrUpdate[]>({
  get: () => {
    const current = (values.descriptions as IRecipeDescriptionCreateOrUpdate[]) ?? [];
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
    const current = (values.productArray as ProductObjType[]) ?? [];
    return [...current].map((p, index) => ({ ...p, position: index }));
  },
  set: (v) => form.setFieldValue("productArray", v),
});

const sortedDescriptions = computed(() => [...descriptions.value]);

const getRecipeProductObj = (recipe?: RecipeType): RecipeCreateDtoInput => {
  if (!recipe) {
    return {
      name: "",
      portions: 1,
      recipeDescriptions: [],
      recipeHeaderProducts: [],
      recipeProducts: [],
    };
  }
  const { name, recipeDescriptions, recipeHeaderProducts, recipeProducts } = recipe;
  return { name, portions: recipe.portions ?? 1, recipeDescriptions, recipeHeaderProducts, recipeProducts };
};

const setValuesToForm = (recipe?: RecipeType) => {
  if (!recipe) {
    return;
  }
  form.setValues(getRecipeProductObj(recipe));

  descriptions.value = getTextPositionTypeFromResult(recipe.recipeDescriptions).map((d, index) => ({ ...d, positionByCreate: index }));
  nextDescriptionIndex.value = descriptions.value.length;
  headersProductArray.value = getTextPositionTypeFromResult(recipe.recipeHeaderProducts);

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

const recipe = ref<RecipeType>();

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
  //TODO das new darf nicht in der id stehen

  const dto: RecipeCreateDtoInput = {
    name: values.name,
    portions: values.portions ?? 0,
    recipeDescriptions: values.descriptions,
    recipeHeaderProducts: values.headersProductArray,
    recipeProducts: removeNewIdForMutate(values.productArray),
  };
  Logger("Submit dto", { value: dto });

  if (props.recipeId === "new" || props.recipeId === "undefined" || !props.recipeId) {
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
    id: props.recipeId,
    ...dto,
  };

  removeDescriptions(descriptionsToDelete.value);

  await removeProductGroups(store.getRecipeGroupIdsToDelete);

  await removeRecipeProducts(store.getRecipeProductsToDelete);

  await updateMutate({ dto: dtoUpdate }, { refetchQueries: ["getRecipeById"] });

  toast({
    title: "Das Rezept wurde aktualisiert",
    description: values.name,
  });
  if (props.recipeId) {
    await goBack(props.recipeId);
  }
});

const backToRecipe = ref(false);
const goBack = async (id: string) => {
  if (backToRecipe.value) {
    resetForm();
    backToRecipe.value = false;
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
  form.resetForm();
  form.setValues(getRecipeProductObj(recipe.value));
  resetRecipeInStore();
  descriptions.value = recipe.value?.recipeDescriptions.map((d, index) => ({ ...d, positionByCreate: index })) ?? [
    { position: 0, text: "", header: "", positionByCreate: 0 },
  ];
  headersProductArray.value = recipe.value?.recipeHeaderProducts ?? [];
  productArray.value = recipe.value?.recipeProducts.map((p, i) => ({ ...p, position: i })) ?? [defaultProduct];
};

const updateValue = ref(false);
const textareaFocus = ref(false);

const enterPress = async () => {
  Logger("Submit values by enter press");
  if (!textareaFocus.value) {
    await onSubmit();
  }
};

const headersProductArray = ref<TextPositionType[]>([]);

watch(
  headersProductArray,
  (newValue) => {
    Logger("Headers Array changed:", { value: newValue, useDebugMode: true });
    form.setFieldValue("headersProductArray", newValue);
  },
  { deep: true },
);

watchEffect(() => {
  if (!productArray.value?.length) {
    return 0;
  }
  store.setProductGroupCount(
    productArray.value?.reduce((acc, curr) => {
      return curr.groupPosition > acc ? curr.groupPosition : acc;
    }, 0) + 1,
  );
});
const nextDescriptionIndex = ref(0);
const addDescription = () => {
  const copy = [...descriptions.value];
  const newItem: IRecipeDescriptionCreateOrUpdate = { position: copy.length, text: "", header: "", positionByCreate: nextDescriptionIndex.value };
  descriptions.value = [...copy, newItem];
  nextDescriptionIndex.value++;
};
</script>

<template>
  <div class="max-h-full overflow-auto" v-component="'Recipe form'">
    <Form class-content="h-full" @keydown.enter.prevent="enterPress" @update:on-submit="onSubmit" data-component="recipe-form">
      <div class="flex w-full h-full gap-2">
        <div class="flex-col flex-1 h-full">
          <div class="flex gap-2">
            <FormInput label="Rezeptname" name="name" class="flex-1" />
            <FormInput label="Portionen" name="portions" type="number" />
          </div>

          <div
            v-for="(description, index) in sortedDescriptions"
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
            <Button size="icon" variant="outline" icon="add" @click.prevent="addDescription" />
          </div>
        </div>

        <div class="w-120">
          <RecipeFormFooter @abort="resetForm" />
          <div v-for="oneBasedIndex in store.getProductGroupsCount" :key="oneBasedIndex" class="mb-2">
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

      <RecipeFormFooter @abort="resetForm" class="mt-2" />
    </Form>
  </div>
</template>
