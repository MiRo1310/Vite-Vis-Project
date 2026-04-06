<script setup lang="ts">
import { computed } from "vue";
import { SelectOption } from "@/types/types";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RecipeProductDialogContent from "@/components/section/recipe-form/RecipeProductDialogContent.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql.ts";
import { TForm } from "@/components/section/recipe-form/index.ts";
import ProductUnit from "@/components/section/recipe-form/ProductUnit.vue";
import { fieldsRecipe, TProductSchema } from "@/components/section/recipe-form/formSchema.ts";

const props = defineProps<{
  index: number;
  product: TProductSchema;
  countedProducts: number;
  recipe?: GetRecipeByIdQuery["recipe"] | null;
  groupIndex: number;
  form: TForm;
}>();
const emits = defineEmits(["removeProductId", "dialogClose"]);

const { result } = useQuery(
  graphql(`
    query products {
      products {
        id
        carbs
        category
        fat
        kcal
        name
        protein
        salt
        sugar
        kcal
        productUnits {
          id
          unit
          amount
          isDefault
          faktor
        }
      }
    }
  `),
);

const selectableProducts = computed((): SelectOption[] => getSelectableOptions(result.value?.products));

const productLabel = computed(() => selectableProducts.value.find((option) => option.value === props.product?.productId)?.label);

const updateProduct = (product: TProductSchema) => {
  const index = props.form.values[fieldsRecipe.products].findIndex((p: TProductSchema) => p.id === product.id);
  props.form.setFieldValue(`${fieldsRecipe.products}.${index}`, { ...props.product, ...product });
  open.value = false;
};

const open = defineModel("dialogOpen", { default: false });
</script>
<template>
  <Dialog v-if="product" v-model:open="open">
    <DialogTrigger class="w-full">
      <div class="flex justify-between items-center px-2 cursor-pointer">
        <div class="flex justify-between items-center p-1 flex-1 mr-6" data-component="product-summary">
          <div>
            <span>{{ index + 1 }}.</span>
            <span class="ml-2 text-amber-600 dark:text-amber-300">{{ productLabel }}</span>

            <span class="text-xs font-bold ml-2">{{ product?.description }}</span>
          </div>
          <span class="font-semibold">{{ product?.amount }} <ProductUnit :id="product?.activeUnitId" /> </span>
        </div>
        <slot />
      </div>
      <DialogContent>
        <DialogTitle> Ein Produkt anlegen </DialogTitle>
        <RecipeProductDialogContent
          :product
          :counted-products
          :recipe
          :groupIndex
          @remove-product-id="emits('removeProductId', $event)"
          @submit="updateProduct"
          v-model:open="open"
        />
      </DialogContent>
    </DialogTrigger>
  </Dialog>
</template>
