<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import Form from "@/components/shared/form/Form.vue";
import { computed, onMounted, ref, watch } from "vue";
import { Button } from "@/components/shared/button";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import RecipeDescriptionGroup from "@/components/section/new-recipe/RecipeDescriptionGroup.vue";
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
import { args, Logger } from "@/lib/logger.ts";
import { Writeable } from "zod/v3";
import { output, ZodNumber, ZodObject, ZodOptional, ZodString, ZodUUID } from "zod";
import { $strip } from "zod/v4/core";
import { newIdPrefix } from "@/components/section/new-recipe/index.ts";
import { removeDescriptions } from "@/components/section/new-recipe/removeDescriptions.ts";
import RecipeFormFooter from "@/components/section/new-recipe/RecipeFormFooter.vue";
import { removeRecipeProducts } from "@/components/section/new-recipe/removeRecipeProducts.ts";
import { IRecipeGroup, removeProductGroups } from "@/components/section/new-recipe/removeProductGroups.ts";

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

// const productArray = computed({
//   get: () => form.values.productArray ?? [defaultProduct],
//   set: (val) => form.setFieldValue("productArray", val),
// });

const descriptions = computed({
  get: () => form.values.descriptions ?? [{ position: 0, text: "", header: "" }],
  set: (val) => form.setFieldValue("descriptions", val),
});

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

  descriptions.value = getTextPositionTypeFromResult(recipe.recipeDescriptions);
  headersProductArray.value = getTextPositionTypeFromResult(recipe.recipeHeaderProducts);

  productArray.value = recipe.recipeProducts.map((item) => ({
    amount: item.amount || 0,
    description: item.description,
    groupPosition: item.groupPosition,
    productId: item.productId,
    unit: item.unit,
    id: item.id,
    activeUnitId: item.activeUnitId ?? "",
  }));
};

const recipe = ref<RecipeType>();

const getTextPositionTypeFromResult = <T extends { text: string; position: number }>(obj: T[]): T[] => {
  return obj.filter((item) => isDefined(item.text) && isDefined(item.position));
};

const form = useForm({
  validationSchema: formSchema,
});

type ZodProductArrayType =
  | output<
      ZodObject<
        Writeable<{
          productId: ZodString;
          description: ZodString;
          amount: ZodNumber;
          unit: ZodString;
          groupPosition: ZodNumber;
          id: ZodOptional<ZodString>;
          activeUnitId: ZodUUID;
        }>,
        $strip
      >
    >[]
  | undefined;

const removeNewIdForMutate = (productArray?: ZodProductArrayType): ZodProductArrayType => {
  return productArray?.map((product) => {
    if (product.id?.startsWith(newIdPrefix)) {
      return { ...product, id: undefined };
    }
    return product;
  });
};

const descriptionsToDelete = ref<string[]>([]);
const recipeProductIdsToDelete = ref<string[]>([]);
const recipeGroupIdsToDelete = ref<IRecipeGroup[]>([]);

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
  await removeProductGroups(recipeGroupIdsToDelete.value);

  await removeRecipeProducts(recipeProductIdsToDelete.value);
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
  unit: "",
  groupPosition: 0,
  id: undefined,
  activeUnitId: "",
};

const resetForm = () => {
  form.resetForm();
  form.setValues(getRecipeProductObj(recipe.value));
  resetRecipeInStore();
  descriptions.value = recipe.value?.recipeDescriptions ?? [{ position: 0, text: "", header: "" }];
  headersProductArray.value = recipe.value?.recipeHeaderProducts ?? [];
  productArray.value = recipe.value?.recipeProducts ?? [defaultProduct];
};

const updateValue = ref(false);
const textareaFocus = ref(false);

const enterPress = async () => {
  Logger(args("Submit values by enter press"));
  if (!textareaFocus.value) {
    await onSubmit();
  }
};

const headersProductArray = ref<TextPositionType[]>([]);
const productArray = ref<ProductObjType[]>([defaultProduct]);

watch(
  headersProductArray,
  (newValue) => {
    Logger("Headers Array changed:", { value: newValue, useDebugMode: true });
    form.setFieldValue("headersProductArray", newValue);
  },
  { deep: true },
);

watch(
  productArray,
  (newValue) => {
    Logger("Product Array changed:", { value: newValue, useDebugMode: true });

    form.setFieldValue("productArray", newValue);
  },
  { deep: true },
);

const countedProductGroups = computed(() => {
  if (!productArray.value?.length) {
    return 0;
  }
  return (
    productArray.value?.reduce((acc, curr) => {
      return curr.groupPosition > acc ? curr.groupPosition : acc;
    }, 0) + 1
  );
});

const addDescription = () => {
  descriptions.value.push({ position: descriptions.value.length, text: "", header: "" });
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
            v-for="(description, index) in descriptions.sort((a, b) => a.position - b.position)"
            :key="index"
            class="bg-accent rounded-lg p-2 mt-2"
          >
            <RecipeDescriptionGroup :description="description" />
            <RecipeRemoveDescription v-model:descriptions="descriptions" v-model:descriptions-to-delete="descriptionsToDelete" :description />
          </div>
          <div class="flex justify-end mt-2 gap-2">
            <Button size="icon" variant="outline" icon="add" @click.prevent="addDescription" />
          </div>
        </div>

        <div class="w-120">
          <RecipeFormFooter @abort="resetForm" />
          <div v-for="oneBasedIndex in countedProductGroups" :key="oneBasedIndex" class="mb-2">
            <RecipeProductGroup
              v-model:product-array="productArray"
              v-model:headers-product-array="headersProductArray"
              v-model:counted-product-groups="countedProductGroups"
              v-model:recipe-product-ids-to-delete="recipeProductIdsToDelete"
              v-model:recipe-group-ids-to-delete="recipeGroupIdsToDelete"
              :recipe="recipe"
              :group-index="toZeroBasedIndex(oneBasedIndex)"
            />
          </div>
          <AddNewProductGroup
            v-model:headers-product-array="headersProductArray"
            v-model:counted-product-groups="countedProductGroups"
            v-model:product-array="productArray"
          />
        </div>
      </div>

      <RecipeFormFooter @abort="resetForm" class="mt-2" />
    </Form>
  </div>
</template>
