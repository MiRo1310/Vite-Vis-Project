<script setup lang="ts">
import { Button } from "@/components/shared/button";
import Form from "@/components/shared/form/Form.vue";
import RecipeProductName from "@/components/section/new-recipe/RecipeProductName.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { ProductObjType, SelectOption } from "@/types/types.ts";
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { useForm } from "vee-validate";
import { formSchemaProduct } from "@/components/section/new-recipe/formSchema.ts";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { isDefined } from "@vueuse/core";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { GetRecipeByIdQuery } from "@/api/gql/graphql.ts";
import FormFooter from "@/components/shared/form/FormFooter.vue";

const props = defineProps<{ product: ProductObjType; countedProducts: number; recipe: GetRecipeByIdQuery["recipe"]; groupIndex: number }>();
const emits = defineEmits(["removeProductId", "submit"]);

const open = defineModel<boolean>("open", { required: true });

const store = useRecipeStore();

const { result: productUnits } = useQuery(
  graphql(`
    query getProductUnits {
      productUnits {
        id
        createdAt
        modifiedAt
        productId
        amount
        unit
      }
    }
  `),
);

const selectableUnitOptions = computed(() => (id?: string): SelectOption[] => {
  if (!id) {
    return [];
  }
  const unitVariants = productUnits.value?.productUnits.filter((variant) => variant.productId === id);

  return (
    unitVariants?.map((variant) => ({
      value: variant.unit,
      label: variant.unit,
      id: variant.id,
    })) ?? []
  );
});

const defaultProduct: ProductObjType = {
  productId: "",
  description: "",
  amount: 0,
  groupPosition: 0,
  id: undefined,
  activeUnitId: "",
  position: 0,
  sortOrder: 0,
};

const form = useForm({
  validationSchema: formSchemaProduct,
  initialValues: props.product ?? defaultProduct,
  name: "ProductForm",
  validateOnMount: false,
});

const dialogOpenProduct = ref(false);
const dialogParam = ref<null | string>(null);

const confirmProductDelete = (id?: string) => {
  dialogParam.value = id ?? null;
  dialogOpenProduct.value = true;
};

const deleteBtnIsDisabled = () => props.countedProducts === 1 && store.getProductGroupsCount === 1;

const removeProduct = async (id: string | null) => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  if (props.countedProducts === 1) {
    const recipeId = props.recipe?.id;
    if (recipeId) {
      store.addRecipeGroupToDelete({ groupPosition: props.groupIndex, recipeId });
    }
  }

  if (isDefined(id)) {
    emits("removeProductId", id);
    store.addRecipeProductIdToDelete(id);
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  emits("submit", values);
});
</script>

<template>
  <Form @update:on-submit="onSubmit" @keydown.enter="onSubmit">
    <div class="flex mt-2">
      <RecipeProductName />
    </div>

    <template v-if="product.id">
      <FormInput type="text" name="description" placeholder="Beschreibung" />
      <div class="flex justify-between mt-2">
        <div class="flex gap-2 items-start flex-1 mr-2">
          <FormInput placeholder="Menge" type="number" :step="0.1" name="amount" />

          <FormSelect
            label=""
            class="w-full"
            :disabled="!form.values.productId"
            placeholder="Wähle eine Einheit"
            name="activeUnitId"
            :select-options="selectableUnitOptions(form.values.productId)"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          icon="remove"
          :disabled="countedProducts === 1"
          @click.prevent="
            () => {
              if (deleteBtnIsDisabled()) return;
              confirmProductDelete(product.id);
            }
          "
        />
      </div>
    </template>

    <FormFooter @update:close="open = false" />
  </Form>

  <DialogConfirm
    v-model:dialog-open="dialogOpenProduct"
    description="Willst du die Zutat wirklich löschen?"
    @update:confirm="
      () => {
        removeProduct(dialogParam);
        dialogParam = null;
      }
    "
  />
</template>
