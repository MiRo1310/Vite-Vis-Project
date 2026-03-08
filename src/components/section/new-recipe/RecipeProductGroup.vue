<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { Button } from "@/components/shared/button";
import { computed, reactive, ref } from "vue";
import { updateTextByGroupPosition } from "@/components/section/new-recipe/utils";
import { ProductObjType, SelectOption, TextPositionType } from "@/types/types";
import RecipeProductName from "@/components/section/new-recipe/RecipeProductName.vue";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import ProductValuesSummary from "@/components/section/new-recipe/ProductValuesSummary.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { isDefined } from "@vueuse/core";
import { graphql } from "@/api/gql";
import { Logger } from "@/lib/logger.ts";
import { Input } from "@/components/shared/input";
import Select from "@/components/shared/select/Select.vue";
import { newIdPrefix } from "@/components/section/new-recipe/index.ts";

const props = defineProps<{ groupIndex: number; recipe?: GetRecipeByIdQuery["recipe"] }>();

const countedProductGroups = defineModel<number>("countedProductGroups");
const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });

const { mutate: mutationRemoveRecipeProduct } = useMutation(
  graphql(`
    mutation removeRecipeProduct($id: UUID!) {
      removeRecipeProduct(id: $id)
    }
  `),
);
const { mutate } = useMutation(
  graphql(`
    mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {
      removeProductGroup(dto: $dto)
    }
  `),
);

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

const updateProduct = ({ target, val, product }: { target: keyof Omit<ProductObjType, "id">; val?: string; product: ProductObjType }) => {
  if (!val) {
    return;
  }
  // console.log(target, val, product);
  // if (!product.id) {
  //   const newItem = {
  //     productId: "",
  //     description: "",
  //     amount: 0,
  //     unit: "",
  //     groupPosition: props.groupIndex,
  //     factor: null,
  //     unitVariants: null,
  //     activeUnitId: "",
  //   };
  //   console.log(target);
  //   if (target === "unit" && product.id) {
  //     const id = selectableOptions.value(product.id).find((variant) => variant.value === val)?.id;
  //     console.log("id", id);
  //     if (id) {
  //       saveValToItem(newItem, "activeUnitId", id);
  //     }
  //   }
  //   saveValToItem(newItem, target, val);
  //   productArray.value.push(newItem);
  //   return;
  // }

  if (target === "unit") {
    const id = selectableUnitOptions.value(product.productId).find((variant) => variant.value === val)?.id;
    Logger("Unit id to set:", { value: id });
    if (id) {
      saveValToItem(product, "activeUnitId", id);
    }
  }
  saveValToItem(product, target, val);
};

const saveValToItem = <T,>(obj: T, target: keyof T, val: string | number) => {
  if (typeof (obj as ProductObjType)[target as keyof ProductObjType] === "number") {
    ((obj as ProductObjType)[target as keyof ProductObjType] as number) = parseFloat(val.toString());
    return;
  }
  ((obj as ProductObjType)[target as keyof ProductObjType] as string) = val.toString();
};

const removeProduct = async (id: string | null) => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  if (countedProducts.value === 1) {
    const recipeId = props.recipe?.id;
    if (recipeId) {
      await mutate({ dto: { position: props.groupIndex, recipeId } });
    }
  }

  if (isDefined(id)) {
    useProductCards(id).remove();
    await removeProductInDB(id);
  }
};

//TODO Das darf erst passieren beim submit
const removeProductGroupInDB = async () => {
  const groupId = headersProductArray.value.find((header) => header.position === props.groupIndex)?.id;
  if (!groupId) {
    return true;
  } // if no id is found, the group is not saved in the db

  const recipeId = props.recipe?.id;
  if (!recipeId) {
    return false;
  }
  const result = await mutate({ dto: { position: props.groupIndex, recipeId: recipeId } });
  return result ?? false;
};

// TODO Das darf erst passieren beim submit
const removeProductInDB = async (id: string): Promise<boolean | undefined> => {
  if (!id) {
    return false;
  }
  const result = await mutationRemoveRecipeProduct({ id });
  return result?.data?.removeRecipeProduct;
};

const removeProductGroup = async () => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  const success = await removeProductGroupInDB();
  if (!success) {
    return;
  }

  const groupToDelete = props.groupIndex;
  Logger(`Remove group with index: ${groupToDelete}`);
  productArray.value = filterByTargetAndDecrement(productArray.value, "groupPosition", groupToDelete);
  headersProductArray.value = filterByTargetAndDecrement(headersProductArray.value, "position", groupToDelete);
};

const filterByTargetAndDecrement = <T,>(obj: T[], target: keyof T, number: number, targetOptional?: keyof T, numberOptional?: number) =>
  obj
    .filter((item) => {
      if (targetOptional && numberOptional) {
        if ((item[targetOptional] as number) === numberOptional) {
          return item[target] !== number;
        }
        return true;
      }
      return item[target] !== number;
    })
    .map((item) => {
      if (targetOptional && numberOptional) {
        if ((item[target] as number) > number && (item[targetOptional] as number) === numberOptional) {
          (item[target] as number) = (item[target] as number) - 1;
        }
        return item;
      } else if ((item[target] as number) > number) {
        (item[target] as number) = (item[target] as number) - 1;
      }
      return item;
    });

const deleteBtnIsDisabled = () => countedProducts.value === 1 && countedProductGroups.value === 1;

const countedProducts = computed((): number => productArray.value.filter((product) => product.groupPosition === props.groupIndex).length);

let newProductIdCounter = 0;
const newProductIdPlaceholder = computed(() => `${newIdPrefix}-${newProductIdCounter++}`);

const addNewProduct = () => {
  productArray.value.push({
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    groupPosition: props.groupIndex,
    activeUnitId: "",
    id: newProductIdPlaceholder.value,
  });

  useProductCards("").closeGroup();
  useProductCards(newProductIdPlaceholder.value).add();
};

const dialogOpenGroup = ref(false);
const dialogOpenProduct = ref(false);
const dialogParam = ref<null | string>(null);

const confirmProductDelete = (id?: string) => {
  dialogParam.value = id ?? null;
  dialogOpenProduct.value = true;
};

const selectableUnitOptions = computed(() => (id: string): SelectOption[] => {
  const unitVariants = productUnits.value?.productUnits.filter((variant) => variant.productId === id);

  return (
    unitVariants?.map((variant) => ({
      value: variant.unit,
      label: variant.unit,
      id: variant.id,
    })) ?? []
  );
});

const isProductOpen = reactive<Record<string, boolean>[]>([]);

const useProductCards = (productId: string) => {
  const groupIndex = props.groupIndex;

  if (!isProductOpen[groupIndex]) {
    if (groupIndex === 0) {
      isProductOpen[groupIndex] = {};
    } else {
      isProductOpen[groupIndex] = { [productId]: true };
    }
  }

  return {
    toggle: () => (isProductOpen[groupIndex][productId] = !isProductOpen[groupIndex][productId]),
    add: () => (isProductOpen[groupIndex][productId] = true),
    isOpen: computed(() => isProductOpen[groupIndex][productId]),
    closeGroup: () => Object.keys(isProductOpen[groupIndex]).map((k) => (isProductOpen[groupIndex][k] = false)),
    remove: () => delete isProductOpen[groupIndex][productId],
  };
};
</script>

<template>
  <Input
    v-if="headersProductArray"
    type="text"
    placeholder="Überschrift z.B. Soße"
    class="mb-2"
    :model-value="headersProductArray.find((header) => header.position === groupIndex)?.text ?? ''"
    @update:model-value="updateTextByGroupPosition(groupIndex, headersProductArray, String($event))"
  />
  <div
    v-for="(product, index) in productArray.filter((p) => p.groupPosition === props.groupIndex)"
    :key="index"
    :class="['flex flex-col px-2 bg-accent border-black', index === countedProducts ? 'border-b-0 rounded-b-md' : 'border-b-2']"
  >
    <div class="flex mt-2">
      <RecipeProductName
        v-if="productArray && useProductCards(product.id ?? newProductIdPlaceholder).isOpen.value"
        :product
        v-model:product-array="productArray"
        class="flex-1 mr-4"
      />
      <div v-else class="flex-1 mr-4">
        <ProductValuesSummary :index :product />
      </div>
      <Button
        variant="outline"
        :size="useProductCards(product.id ?? newProductIdPlaceholder).isOpen.value ? 'icon' : 'iconRow'"
        class="mb-2"
        :icon="useProductCards(product.id ?? newProductIdPlaceholder).isOpen.value ? 'chevronDown' : 'chevronRight'"
        @click.prevent="useProductCards(product.id ?? newProductIdPlaceholder).toggle()"
      />
    </div>
    <template v-if="product.id && useProductCards(product.id).isOpen.value">
      <Input
        v-if="productArray"
        type="text"
        :model-value="product.description"
        placeholder="Beschreibung"
        @update:model-value="updateProduct({ target: 'description', val: String($event), product })"
      />
      <div class="flex justify-between mt-2">
        <div class="flex gap-2 items-start flex-1 mr-2">
          <FormInput
            v-if="productArray"
            placeholder="Menge"
            :model-value="product.amount"
            type="number"
            :step="0.1"
            :name="`amount-${product.id}`"
            @update:model-value="updateProduct({ target: 'amount', val: $event, product })"
          />
          <Select
            label=""
            class="w-full"
            :model-value="product.unit"
            placeholder="Wähle eine Einheit"
            :name="`name-${product.id}`"
            :items="selectableUnitOptions(product.productId)"
            @update:model-value="updateProduct({ target: 'unit', val: $event, product })"
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
  </div>
  <div class="flex justify-end mt-2 space-x-2">
    <Button size="icon" variant="outline" icon="add" @click.prevent="addNewProduct" />
    <Button
      size="icon"
      variant="outline"
      icon="remove"
      :disabled="countedProductGroups === 1"
      @click.prevent="
        () => {
          if (deleteBtnIsDisabled()) return;
          dialogOpenGroup = true;
        }
      "
    />
  </div>
  <DialogConfirm
    v-model:dialog-open="dialogOpenGroup"
    description="Willst du die Produktgruppe wirklich löschen?"
    @update:confirm="() => removeProductGroup()"
  />
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
