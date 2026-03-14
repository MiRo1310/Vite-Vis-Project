<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { computed, onMounted, reactive, ref } from "vue";
import { updateTextByGroupPosition } from "@/components/section/new-recipe/utils";
import { ProductObjType, TextPositionType } from "@/types/types";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import RecipeProduct from "@/components/section/new-recipe/RecipeProduct.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { Logger } from "@/lib/logger.ts";
import { Input } from "@/components/shared/input";
import { newIdPrefix, TForm } from "@/components/section/new-recipe/index.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import ButtonGroupUpDown from "@/components/shared/button/ButtonGroupUpDown.vue";

const props = defineProps<{ groupIndex: number; recipe?: GetRecipeByIdQuery["recipe"]; form: TForm }>();

const store = useRecipeStore();

const headersProductArray = defineModel<TextPositionType[]>("headersProductArray", { default: [] });
const productArray = defineModel<ProductObjType[]>("productArray", { default: [] });

const isProductOpen = reactive<Record<string, boolean>[]>([]);
const useProductCards = () => {
  const groupIndex = props.groupIndex;

  return {
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

const removeProductGroup = async () => {
  if (deleteBtnIsDisabled()) {
    return;
  }

  const recipeId = props.recipe?.id;
  if (recipeId) {
    store.addRecipeGroupToDelete({ groupPosition: props.groupIndex, recipeId });
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

const deleteBtnIsDisabled = () => countedProducts.value === 1 && store.getProductGroupsCount === 1;

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

onMounted(() => {
  productArray.value.forEach((product) => {
    if (product.id) {
      productCardsHandler.add(product.id);
    }
  });
});

const removeProductId = (id: string) => {
  productArray.value = productArray.value.filter((p) => p.id !== id);
};

const filteredProductsByGroupPosition = computed(() =>
  [...productArray.value].filter((p) => p.groupPosition === props.groupIndex).sort((a, b) => a.sortOrder - b.sortOrder),
);

const sortOrder = (product: ProductObjType, direction: "up" | "down") => {
  const products = [...productArray.value];

  const productsWithSameSortOrder = products.filter(
    (p) => p.sortOrder === product.sortOrder + (direction === "up" ? -1 : 1) && p.groupPosition === props.groupIndex,
  );

  const current = products.find((p) => p.position === product.position && p.groupPosition === props.groupIndex);
  if (current) {
    if (direction === "up") {
      current.sortOrder--;
    } else {
      current.sortOrder++;
    }
  }

  if (productsWithSameSortOrder.length > 0) {
    productsWithSameSortOrder.map((p) => {
      return (p.sortOrder = p.sortOrder + (direction === "up" ? 1 : -1));
    });
  }
  productArray.value = products;
};
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
    v-for="(product, index) in filteredProductsByGroupPosition"
    :key="index"
    :class="['flex flex-col px-2 bg-accent border-background', index === countedProducts ? 'border-b-0 rounded-b-md' : 'border-b-2']"
  >
    <RecipeProduct :index :product :countedProducts :recipe :groupIndex @remove-product-id="removeProductId" :form>
      <ButtonGroupUpDown
        :disabled-down="product.sortOrder === filteredProductsByGroupPosition.length - 1"
        :disabledUp="product.sortOrder === 0"
        @up="sortOrder(product, 'up')"
        @down="sortOrder(product, 'down')"
      />
    </RecipeProduct>
  </div>
  <div class="flex justify-end mt-2 space-x-2">
    <Button size="icon" variant="outline" icon="add" @click.prevent="addNewProduct" />
    <Button
      size="icon"
      variant="outline"
      icon="remove"
      :disabled="store.productGroupsCount === 1"
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
</template>
