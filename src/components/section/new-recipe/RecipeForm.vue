<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { useForm } from "vee-validate";
import Form from "@/components/shared/form/Form.vue";
import { computed, onMounted, ref, watch } from "vue";
import { Button } from "@/components/shared/button";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { addRecipe } from "@/api/mutation/addRecipe";
import { updateRecipe } from "@/api/mutation/updateRecipe";
import RecipeDescriptionGroup from "@/components/section/new-recipe/RecipeDescriptionGroup.vue";
import RecipeProductGroup from "@/components/section/new-recipe/RecipeProductGroup.vue";
import AddNewGroup from "@/components/section/new-recipe/AddNewGroup.vue";
import { OnResult, ProductObjType, TextPositionType } from "@/types/types";
import { useRecipeStore } from "@/store/recipeStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { getRecipeById } from "@/api/query/getRecipeById";
import { isDefined } from "@vueuse/core";
import { GetRecipeByIdQuery, RecipeCreateDtoInput, RecipeDescriptionCreateOrUpdateDtoInput, RecipeUpdateDtoInput } from "@/api/gql/graphql";
import { formSchema } from "@/components/section/new-recipe/formSchema";
import { useRouter } from "vue-router";
import { translation } from "@/lib/translation";

type RecipeType = GetRecipeByIdQuery["recipe"];

const router = useRouter();
const props = defineProps<{ recipeId?: string }>();

const { toast } = useToast();
const { mutate } = useMutation(addRecipe);
const { mutate: updateMutate } = useMutation(updateRecipe);

const { load, onResult } = useLazyQuery(getRecipeById);

onResult((result: OnResult<GetRecipeByIdQuery>) => {
  if (!result.data?.recipe) return;
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
    await load(getRecipeById, { id: props.recipeId });
  }
});

const getRecipeProductObj = (recipe?: RecipeType): RecipeCreateDtoInput => ({
  name: recipe?.name ?? "",
  portions: recipe?.portions ?? 1,
  recipeDescriptions: recipe?.recipeDescriptions ?? [],
  recipeHeaderProducts: recipe?.recipeHeaderProducts ?? [],
  recipeProducts: recipe?.recipeProducts ?? [],
});

const setValuesToForm = (recipe?: RecipeType) => {
  if (!recipe) return;
  form.setValues(getRecipeProductObj(recipe));

  descriptions.value = getTextPositionTypeFromResult(recipe.recipeDescriptions);
  headersProductArray.value = getTextPositionTypeFromResult(recipe.recipeHeaderProducts);

  productArray.value = recipe.recipeProducts.map((item) => ({
    amount: item.amount || 0,
    description: item.description,
    groupPosition: item.groupPosition,
    productId: item.productId,
    productPosition: item.productPosition,
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

const onSubmit = form.handleSubmit(async (values) => {
  //TODO das new darf nicht in der id stehen
  const dto: RecipeCreateDtoInput = {
    name: values.name,
    portions: values.portions ?? 0,
    recipeDescriptions: values.descriptions,
    recipeHeaderProducts: values.headersProductArray,
    recipeProducts: values.productArray,
  };

  if (props.recipeId == "new" || props.recipeId === "undefined" || !props.recipeId) {
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

  if (props.recipeId) {
    const dtoUpdate: RecipeUpdateDtoInput = {
      id: props.recipeId,
      ...dto,
    };
    await updateMutate({ dto: dtoUpdate });

    toast({
      title: "Das Rezept wurde aktualisiert",
      description: values.name,
    });
    if (props.recipeId) {
      await goBack(props.recipeId);
    }
  }
});

const backToRecipe = ref(false);
const goBack = async (id: string) => {
  if (backToRecipe.value) {
    resetForm();
    backToRecipe.value = false;
    await router.push({ name: "recipe-details", params: { recipeId: id } });
  }
};

const defaultProduct: ProductObjType = {
  productId: "",
  description: "",
  amount: 0,
  unit: "",
  productPosition: 1,
  groupPosition: 1,
  id: undefined,
  activeUnitId: "",
};

const resetForm = () => {
  form.resetForm();
  form.setValues(getRecipeProductObj());
  resetRecipeInStore();
  descriptions.value = [{ position: 1, text: "", header: "" }];
  headersProductArray.value = [];
  productArray.value = [defaultProduct];
};

const updateValue = ref(false);
const textareaFocus = ref(false);

const enterPress = async () => {
  if (!textareaFocus.value) {
    await onSubmit();
  }
};

const descriptions = ref<RecipeDescriptionCreateOrUpdateDtoInput[]>([]);
const headersProductArray = ref<TextPositionType[]>([]);
const productArray = ref<ProductObjType[]>([defaultProduct]);

watch(
  descriptions,
  (newValue) => {
    form.setFieldValue("descriptions", newValue);
  },
  { deep: true },
);

watch(
  headersProductArray,
  (newValue) => {
    form.setFieldValue("headersProductArray", newValue);
  },
  { deep: true },
);

watch(
  productArray,
  (newValue) => {
    form.setFieldValue("productArray", newValue);
  },
  { deep: true },
);

const countedProductGroups = computed(() =>
  productArray.value.reduce((acc, curr) => {
    return curr.groupPosition > acc ? curr.groupPosition : acc;
  }, 1),
);

const addDescription = () => {
  descriptions.value.push({ position: descriptions.value.length + 1, text: "", header: "" });
};
</script>

<template>
  <div class="new-recipe">
    <Form class-content="h-full" @keydown.enter.prevent="enterPress" @update:on-submit="onSubmit">
      <div class="new-recipe__form-inner">
        <div class="new-recipe__left-col">
          <FormInput :placeholder="translation('addRecipe.recipeName')" name="name" :model-value="form.values.name" />
          <FormInput :placeholder="translation('addRecipe.portions')" name="portions" type="number" :model-value="String(form.values.portions)" />
          <div v-for="index in descriptions.length" :key="index" class="new-recipe__form-textarea">
            <RecipeDescriptionGroup v-model:descriptions="descriptions" :index />
          </div>
          <div class="new-recipe__left-col-button">
            <Button size="icon" variant="outline" icon="add" @click.prevent="addDescription" />
          </div>
        </div>
        <div class="new-recipe__right-col">
          <div v-for="index in countedProductGroups" :key="index" class="new-recipe__product-groups">
            <RecipeProductGroup
              v-model:product-array="productArray"
              v-model:headers-product-array="headersProductArray"
              v-model:counted-product-groups="countedProductGroups"
              :recipe="recipe"
              :group-index="index"
            />
          </div>
          <AddNewGroup
            v-model:headers-product-array="headersProductArray"
            v-model:counted-product-groups="countedProductGroups"
            v-model:product-array="productArray"
          />
        </div>
      </div>

      <div class="w-full flex justify-end mt-4 space-x-2">
        <Button class="w-60" type="submit" variant="outline">Speichern</Button>
        <Button class="w-60" type="submit" @click="backToRecipe = true">Speichern und zurück zum Rezept</Button>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="scss">
.new-recipe {
  @apply p-2 rounded-lg max-h-full overflow-auto;

  &__form-inner {
    @apply flex w-full h-full pl-2;
  }

  &__left-col {
    @apply flex-col flex-1 mr-2 h-full;
  }

  &__form-textarea {
    @apply bg-accent rounded-lg p-2 mt-2;
  }

  &__left-col-button {
    @apply flex justify-end mt-2;
  }

  &__right-col {
    @apply w-[30rem];
  }

  &__product-groups {
    @apply mb-2;
  }
}

.form input {
  @apply bg-white;
}

.form label span {
  @apply text-[0.7rem];
}
</style>
