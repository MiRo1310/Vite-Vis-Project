<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { Button } from "@/components/shared/button";
import { computed, reactive, ref } from "vue";
import { updateTextByGroupPosition } from "@/components/section/new-recipe/utils";
import { ProductObjType, SelectOption, TextPositionType } from "@/types/types";
import RecipeProductName from "@/components/section/new-recipe/RecipeProductName.vue";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import ProductValuesSummary from "@/components/section/new-recipe/ProductValuesSummary.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { isDefined } from "@vueuse/core";
import { graphql } from "@/api/gql";
import { Logger } from "@/lib/logger.ts";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";
import { Input } from "@/components/shared/input";

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

const getProductByPositions = (productIndex: number, groupIndex: number): ProductObjType | undefined =>
  productArray.value.find((product) => product.productPosition === productIndex && product.groupPosition === groupIndex);

const updateProduct = ({ target, val, productIndex }: { target: keyof Omit<ProductObjType, "id">; val?: string; productIndex: number }) => {
  const obj = getProductByPositions(productIndex, props.groupIndex);
  console.log(obj);
  if (!val) {
    return;
  }
  if (!obj) {
    const newItem = {
      productId: "",
      description: "",
      amount: 0,
      unit: "",
      productPosition: productIndex,
      groupPosition: props.groupIndex,
      factor: null,
      unitVariants: null,
      activeUnitId: "",
    };
    if (target === "unit") {
      const id = selectableOptions.value(productIndex).find((variant) => variant.value === val)?.id;
      if (id) {
        saveValToItem(newItem, "activeUnitId", id);
      }
    }
    saveValToItem(newItem, target, val);
    productArray.value.push(newItem);
    return;
  }

  if (target === "unit") {
    const id = selectableOptions.value(productIndex).find((variant) => variant.value === val)?.id;
    if (id) {
      saveValToItem(obj, "activeUnitId", id);
    }
  }
  saveValToItem(obj, target, val);
};

const saveValToItem = <T,>(obj: T, target: keyof T, val: string | number) => {
  if (typeof (obj as ProductObjType)[target as keyof ProductObjType] === "number") {
    ((obj as ProductObjType)[target as keyof ProductObjType] as number) = parseFloat(val.toString());
    return;
  }
  ((obj as ProductObjType)[target as keyof ProductObjType] as string) = val.toString();
};

const removeProduct = async (productIndex: number | null) => {
  if (disableDelete()) {
    return;
  }

  if (countedProducts.value === 1) {
    const recipeId = props.recipe?.id;
    if (recipeId && isDefined(productIndex)) {
      await mutate({ dto: { position: props.groupIndex, recipeId } });
    }
  }

  if (isDefined(productIndex)) {
    useProductCards(productIndex).remove();
    await removeProductInDB(productIndex);

    productArray.value = filterByTargetAndDecrement(productArray.value, "productPosition", productIndex, "groupPosition", props.groupIndex);
  }
};

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

const removeProductInDB = async (productIndex: number): Promise<boolean | undefined> => {
  const id = productArray.value.find((product) => product.productPosition === productIndex && product.groupPosition === props.groupIndex)?.id;

  if (!id) {
    return false;
  }
  const result = await mutationRemoveRecipeProduct({ id });
  return result?.data?.removeRecipeProduct;
};

const removeProductGroup = async () => {
  if (disableDelete()) {
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

const disableDelete = () => countedProducts.value === 1 && countedProductGroups.value === 1;

const getValue = computed(() => (productIndex: number, target: keyof ProductObjType) => {
  return getProductByPositions(productIndex, props.groupIndex)?.[target];
});

const countedProducts = computed((): number => productArray.value.filter((product) => product.groupPosition === props.groupIndex).length);

const addNewProduct = () => {
  productArray.value.push({
    productId: "",
    description: "",
    amount: 0,
    unit: "",
    productPosition: countedProducts.value,
    groupPosition: props.groupIndex,
    activeUnitId: "",
  });

  // ProductIndex is not needed here
  useProductCards(0).closeGroup();
  useProductCards(0).add();
};

const dialogOpenGroup = ref(false);
const dialogOpenProduct = ref(false);
const dialogParam = ref<null | number>(null);

const confirmProductDelete = (productIndex: number) => {
  dialogParam.value = productIndex;
  dialogOpenProduct.value = true;
};

const selectableOptions = computed(() => (index: number): SelectOption[] => {
  const productId = productArray.value.find((product) => {
    return product.productPosition === index && product.groupPosition === props.groupIndex;
  })?.productId;
  const unitVariants = productUnits.value?.productUnits.filter((variant) => variant.productId === productId);

  return (
    unitVariants?.map((variant) => ({
      value: variant.unit,
      label: variant.unit,
      id: variant.id,
    })) ?? []
  );
});

const isProductOpen = reactive<boolean[][]>([]);

const useProductCards = (productIndex: number) => {
  const groupIndex = props.groupIndex;

  if (!isProductOpen[groupIndex]) {
    if (groupIndex === 0) {
      isProductOpen[groupIndex] = [];
    } else {
      isProductOpen[groupIndex] = [true];
    }
  }
  const groupLength = isProductOpen[groupIndex].length;

  return {
    toggle: () => (isProductOpen[groupIndex][productIndex] = !isProductOpen[groupIndex][productIndex]),
    add: () => (isProductOpen[groupIndex][groupLength] = true),
    isOpen: computed(() => isProductOpen[groupIndex][productIndex]),
    closeGroup: () => isProductOpen[groupIndex].fill(false),
    remove: () => isProductOpen[groupIndex].splice(productIndex, 1),
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
    v-for="oneBasedProductIndex in countedProducts"
    :key="oneBasedProductIndex"
    :class="['flex flex-col px-2 bg-accent border-black', oneBasedProductIndex === countedProducts ? 'border-b-0 rounded-b-md' : 'border-b-2']"
  >
    <div class="flex mt-2">
      <RecipeProductName
        v-if="productArray && useProductCards(toZeroBasedIndex(oneBasedProductIndex)).isOpen.value"
        :product-index="toZeroBasedIndex(oneBasedProductIndex)"
        :group-index="groupIndex"
        :product-array
        class="flex-1 mr-4"
      />
      <div v-else class="flex-1 mr-4">
        <ProductValuesSummary
          :product-index="oneBasedProductIndex"
          :product="getProductByPositions(toZeroBasedIndex(oneBasedProductIndex), groupIndex)"
        />
      </div>
      <Button
        variant="outline"
        :size="useProductCards(toZeroBasedIndex(oneBasedProductIndex)).isOpen.value ? 'icon' : 'iconRow'"
        class="mb-2"
        :icon="useProductCards(toZeroBasedIndex(oneBasedProductIndex)).isOpen.value ? 'chevronDown' : 'chevronRight'"
        @click.prevent="useProductCards(toZeroBasedIndex(oneBasedProductIndex)).toggle()"
      />
    </div>
    <template v-if="useProductCards(toZeroBasedIndex(oneBasedProductIndex)).isOpen.value">
      <Input
        v-if="productArray"
        type="text"
        :model-value="getValue(toZeroBasedIndex(oneBasedProductIndex), 'description')?.toString()"
        placeholder="Beschreibung"
        @update:model-value="updateProduct({ target: 'description', val: String($event), productIndex: toZeroBasedIndex(oneBasedProductIndex) })"
      />
      <div class="flex justify-between mt-2">
        <div class="flex gap-2 items-center flex-1">
          <FormInput
            v-if="productArray"
            placeholder="Menge"
            :model-value="getValue(toZeroBasedIndex(oneBasedProductIndex), 'amount')?.toString()"
            type="number"
            :step="0.1"
            :name="`amount-${groupIndex}-${toZeroBasedIndex(oneBasedProductIndex)}`"
            @update:model-value="updateProduct({ target: 'amount', val: $event, productIndex: toZeroBasedIndex(oneBasedProductIndex) })"
          />
          <FormSelect
            v-if="selectableOptions(toZeroBasedIndex(oneBasedProductIndex)).length"
            label=""
            class="w-full"
            :selected="getValue(toZeroBasedIndex(oneBasedProductIndex), 'unit')?.toString()"
            placeholder="Wähle eine Einheit"
            :name="`name-${groupIndex}-${toZeroBasedIndex(oneBasedProductIndex)}`"
            :select-options="selectableOptions(toZeroBasedIndex(oneBasedProductIndex))"
            @update:selected="updateProduct({ target: 'unit', val: $event, productIndex: toZeroBasedIndex(oneBasedProductIndex) })"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          icon="remove"
          :disabled="countedProducts === 1"
          @click.prevent="
            () => {
              if (disableDelete()) return;
              confirmProductDelete(toZeroBasedIndex(oneBasedProductIndex));
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
          if (disableDelete()) return;
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
