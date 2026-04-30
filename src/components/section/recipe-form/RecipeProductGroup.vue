<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { computed, ref, watch } from "vue";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import RecipeProduct from "@/components/section/recipe-form/RecipeProduct.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { Logger } from "@/lib/logger.ts";
import { TForm } from "@/components/section/recipe-form/index.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import ButtonGroupUpDown from "@/components/shared/button/ButtonGroupUpDown.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import { fieldsRecipe, productSchema, TProductHeaderSchema, TProductSchema } from "@/components/section/recipe-form/schema.form.js";
import { isDefined } from "@vueuse/core";
import { newIdPrefix, PrefixedIdGenerator } from "@/components/section/recipe-form/utils.ts";

const props = defineProps<{ groupIndex: number; recipe?: GetRecipeByIdQuery["recipe"]; form: TForm }>();

const store = useRecipeStore();

const formProducts = computed((): TProductSchema[] => props.form.values.productArray);
const formProductHeaders = computed((): TProductHeaderSchema[] => props.form.values.headersProductArray);

const saveProductsToForm = (products: TProductSchema[]) => {
  props.form.setFieldValue(fieldsRecipe.products, products);
};

const saveHeadersToForm = (productHeaders: TProductHeaderSchema[]) => {
  props.form.setFieldValue(fieldsRecipe.headers, productHeaders);
};

const removeProductGroup = async () => {
  if (disableDeleteBtn()) {
    return;
  }

  const recipeId = props.recipe?.id;
  if (recipeId) {
    store.addRecipeGroupToDelete({ groupPosition: props.groupIndex, recipeId });
  }

  const groupToDelete = props.groupIndex;
  Logger(`Remove group with index: ${groupToDelete}`);
  saveProductsToForm(filterByTargetAndDecrement(formProducts.value, "groupPosition", groupToDelete));
  saveHeadersToForm(filterByTargetAndDecrement(formProductHeaders.value, "position", groupToDelete));
};

const filterByTargetAndDecrement = <T,>(obj: T[], target: keyof T, number: number, targetOptional?: keyof T, numberOptional?: number) =>
  obj
    .filter((item) => {
      if (isDefined(targetOptional) && isDefined(numberOptional)) {
        if ((item[targetOptional] as number) === numberOptional) {
          return item[target] !== number;
        }
        return true;
      }
      return item[target] !== number;
    })
    .map((item) => {
      const nextItem = { ...item };
      if (isDefined(targetOptional) && isDefined(numberOptional)) {
        if ((nextItem[target] as number) > number && (nextItem[targetOptional] as number) === numberOptional) {
          nextItem[target] = ((nextItem[target] as number) - 1) as T[keyof T];
        }
        return nextItem;
      }
      if ((nextItem[target] as number) > number) {
        nextItem[target] = ((nextItem[target] as number) - 1) as T[keyof T];
      }
      return nextItem;
    });

const disableDeleteBtn = () => productsLength.value === 1 && store.getProductGroupsCount === 1;

const productsLength = computed((): number => formProducts.value.filter((product) => product.groupPosition === props.groupIndex).length);

const prefixedIdGenerator = new PrefixedIdGenerator(newIdPrefix);

const addNewProduct = () => {
  const newRecipeProduct = {
    productId: "",
    description: "",
    amount: 0,
    groupPosition: props.groupIndex,
    activeUnitId: "",
    id: prefixedIdGenerator.nextId(),
    position: productsLength.value,
    sortOrder: productsLength.value,
  };
  newProductIdToOpenModal.value = newRecipeProduct.id;

  Logger("Adding new product:", { value: newRecipeProduct, useDebugMode: false });
  saveProductsToForm([...formProducts.value, newRecipeProduct]);
};

const isOpenDialogRemoveGroup = ref(false);

const removeProductId = (id: string) => {
  const filtered = [...props.form.values.productArray].filter((p) => p.id !== id);
  saveProductsToForm(filtered);
};

const filteredProductsByGroupPosition = computed((): TProductSchema[] =>
  [...props.form.values.productArray].filter((p) => p.groupPosition === props.groupIndex).sort((a, b) => a.sortOrder - b.sortOrder),
);

const sortOrder = (product: TProductSchema, direction: "up" | "down") => {
  const delta = direction === "up" ? -1 : 1;
  const products = formProducts.value.map((p) => ({ ...p }));

  const currentIndex = products.findIndex((p) => p.position === product.position && p.groupPosition === props.groupIndex);
  if (currentIndex !== -1) {
    products[currentIndex] = {
      ...products[currentIndex],
      sortOrder: products[currentIndex].sortOrder + delta,
    };
  }

  const swapIndex = products.findIndex(
    (p) => p.sortOrder === product.sortOrder + delta && p.groupPosition === props.groupIndex && p.position !== product.position,
  );
  if (swapIndex !== -1) {
    products[swapIndex] = {
      ...products[swapIndex],
      sortOrder: products[swapIndex].sortOrder - delta,
    };
  }
  saveProductsToForm(products);
};

/**
 * Set shouldValidate to true when the form is submitting to trigger validation for all products. This ensures that validation errors are displayed for all products when the user tries to submit the form, even if they haven't interacted with some of the product fields.
 */
watch(
  () => props.form.isSubmitting.value,
  (val) => {
    if (!val) {
      return;
    }
    store.setShouldValidate(true);
  },
);

/**
 * Flag that indicates whether the product is valid based on the product schema validation. If shouldValidate is false, it returns true to avoid showing validation errors before the user attempts to submit the form. Once shouldValidate is true, it validates the product against the schema and returns whether it's valid or not.
 */
const isValid = computed(() => (product: TProductSchema) => {
  if (!store.getShouldValidate) {
    return true;
  }
  const result = productSchema.safeParse(product);
  return result.success;
});

const dialogClosedHandler = () => {
  newProductIdToOpenModal.value = "";
};
const newProductIdToOpenModal = ref("");
</script>

<template>
  <FormInput :name="`headersProductArray.${groupIndex}.text`" placeholder="Beschreibung" />
  <div
    v-for="(product, index) in filteredProductsByGroupPosition"
    :key="index"
    :class="['bg-accent border-2 rounded-md mb-1', { 'border-destructive': !isValid(product) }]"
  >
    <RecipeProduct
      :index
      :product
      :counted-products="productsLength"
      :dialog-open="newProductIdToOpenModal === product.id"
      :recipe
      :groupIndex
      @remove-product-id="removeProductId"
      :form
      @dialog-close="dialogClosedHandler"
    >
      <ButtonGroupUpDown
        :disabled-down="product.sortOrder === filteredProductsByGroupPosition.length - 1"
        :disabledUp="product.sortOrder === 0"
        @up="sortOrder(product, 'up')"
        @down="sortOrder(product, 'down')"
      />
    </RecipeProduct>
  </div>
  <div class="flex justify-end mt-2 space-x-2">
    <Button variant="warning" @click.prevent="addNewProduct">Neues Produkt anlegen</Button>
    <Button
      size="icon"
      variant="destructive"
      icon="remove"
      :disabled="store.productGroupsCount === 1"
      @click.prevent="
        () => {
          if (disableDeleteBtn()) return;
          isOpenDialogRemoveGroup = true;
        }
      "
    />
  </div>
  <DialogConfirm
    v-model:dialog-open="isOpenDialogRemoveGroup"
    description="Willst du die Produktgruppe wirklich löschen?"
    @update:confirm="() => removeProductGroup()"
  />
</template>
