<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import { Button } from "@/components/shared/button";
import { computed, onMounted, reactive, ref } from "vue";
import { updateTextByGroupPosition } from "@/components/section/new-recipe/utils";
import { ProductObjType, SelectOption, TextPositionType } from "@/types/types";
import RecipeProductName from "@/components/section/new-recipe/RecipeProductName.vue";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { useQuery } from "@vue/apollo-composable";
import ProductValuesSummary from "@/components/section/new-recipe/ProductValuesSummary.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { isDefined } from "@vueuse/core";
import { graphql } from "@/api/gql";
import { Logger } from "@/lib/logger.ts";
import { Input } from "@/components/shared/input";
import { newIdPrefix } from "@/components/section/new-recipe/index.ts";
import { IRecipeGroup } from "@/components/section/new-recipe/removeProductGroups.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";

const props = defineProps<{ groupIndex: number; recipe?: GetRecipeByIdQuery["recipe"] }>();

const countedProductGroups = defineModel<number>("countedProductGroups");
const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });
const recipeProductIdsToDelete = defineModel<string[]>("recipeProductIdsToDelete", { default: [] });
const recipeGroupIdsToDelete = defineModel<IRecipeGroup[]>("recipeGroupIdsToDelete", { default: [] });

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

const isProductOpen = reactive<Record<string, boolean>[]>([]);
const useProductCards = () => {
  const groupIndex = props.groupIndex;

  return {
    toggle: (productId: string) => (isProductOpen[groupIndex][productId] = !isProductOpen[groupIndex][productId]),
    add: (productId: string) => {
      if (!isProductOpen[groupIndex]) {
        isProductOpen[groupIndex] = {};
      }
      isProductOpen[groupIndex][productId] = true;
      newProductIdCounter.value++;
    },
    isOpen: computed(() => (productId: string) => isProductOpen?.[groupIndex]?.[productId] ?? false),
    closeAllInGroup: () => Object.keys(isProductOpen[groupIndex]).map((k) => (isProductOpen[groupIndex][k] = false)),
    remove: (productId: string) => delete isProductOpen[groupIndex][productId],
  };
};
const productCardsHandler = useProductCards();

const removeProduct = async (id: string | null) => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  if (countedProducts.value === 1) {
    const recipeId = props.recipe?.id;
    if (recipeId) {
      recipeGroupIdsToDelete.value.push({ position: props.groupIndex, recipeId });
    }
  }

  if (isDefined(id)) {
    productCardsHandler.remove(id);
    productArray.value = productArray.value.filter((p) => p.id !== id);
    recipeProductIdsToDelete.value.push(id);
  }
};

const removeProductGroup = async () => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  const recipeId = props.recipe?.id;
  if (recipeId) {
    recipeGroupIdsToDelete.value.push({ position: props.groupIndex, recipeId });
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

const newProductIdCounter = ref(0);
const newProductIdPlaceholder = computed(() => {
  return `${newIdPrefix}${newProductIdCounter.value}`;
});

const addNewProduct = () => {
  const newRecipeProduct = {
    productId: "",
    description: "",
    amount: 0,
    groupPosition: props.groupIndex,
    activeUnitId: "",
    id: newProductIdPlaceholder.value,
    position: 0,
    sortOrder: [...productArray.value].filter((p) => p.groupPosition === props.groupIndex).length,
  };

  Logger("Adding new product:", { value: newRecipeProduct, useDebugMode: false });

  productCardsHandler.closeAllInGroup();
  productArray.value = [...productArray.value, newRecipeProduct];

  productCardsHandler.add(newProductIdPlaceholder.value);
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

onMounted(() => {
  productArray.value.forEach((product) => {
    if (product.id) {
      productCardsHandler.add(product.id);
    }
  });
});
</script>

<template>
  <!--  TODO to formInput-->
  <Input
    v-show="headersProductArray"
    type="text"
    placeholder="Überschrift z.B. Soße"
    class="mb-2"
    :model-value="headersProductArray.find((header) => header.position === groupIndex)?.text ?? ''"
    @update:model-value="updateTextByGroupPosition(groupIndex, headersProductArray, String($event))"
  />
  <div
    v-for="(product, index) in [...productArray].filter((p) => p.groupPosition === props.groupIndex)"
    :key="index"
    :class="['flex flex-col px-2 bg-accent border-black', index === countedProducts ? 'border-b-0 rounded-b-md' : 'border-b-2']"
  >
    <div v-if="product.id" class="flex mt-2">
      <RecipeProductName
        :index="product.position"
        :class="[
          {
            'invisible w-0 h-0': !productCardsHandler.isOpen.value(product.id ?? newProductIdPlaceholder),
            'flex-1 mr-4': productCardsHandler.isOpen.value(product.id ?? newProductIdPlaceholder),
          },
        ]"
      />

      <div v-show="!productCardsHandler.isOpen.value(product.id ?? newProductIdPlaceholder)" class="flex-1 mr-4">
        <ProductValuesSummary :index :product />
      </div>

      <Button
        variant="outline"
        :size="productCardsHandler.isOpen.value(product.id ?? newProductIdPlaceholder) ? 'icon' : 'iconRow'"
        class="mb-2"
        :icon="productCardsHandler.isOpen.value(product.id ?? newProductIdPlaceholder) ? 'chevronDown' : 'chevronRight'"
        @click.prevent="productCardsHandler.toggle(product.id ?? newProductIdPlaceholder)"
      />
    </div>

    <div v-show="product.id && productCardsHandler.isOpen.value(product.id)">
      <template v-if="product.id">
        <FormInput type="text" :name="`productArray.${product.position}.description`" placeholder="Beschreibung" />
        <div class="flex justify-between mt-2">
          <div class="flex gap-2 items-start flex-1 mr-2">
            <FormInput placeholder="Menge" type="number" :step="0.1" :name="`productArray.${product.position}.amount`" />

            <FormSelect
              label=""
              class="w-full"
              :disabled="!product.productId"
              placeholder="Wähle eine Einheit"
              :name="`productArray.${product.position}.activeUnitId`"
              :select-options="selectableUnitOptions(product.productId)"
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
