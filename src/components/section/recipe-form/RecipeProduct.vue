<script setup lang="ts">
import { computed, ref } from "vue";
import { ProductObjType, SelectOption } from "@/types/types";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Pencil } from "lucide-vue-next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RecipeProductDialogContent from "@/components/section/recipe-form/RecipeProductDialogContent.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql.ts";
import { TForm } from "@/components/section/recipe-form/index.ts";
import ProductUnit from "@/components/section/recipe-form/ProductUnit.vue";
import { fieldsRecipe, TProductSchema } from "@/components/section/recipe-form/formSchema.ts";

const props = defineProps<{
  index: number;
  product?: ProductObjType;
  countedProducts: number;
  recipe?: GetRecipeByIdQuery["recipe"] | null;
  groupIndex: number;
  form: TForm;
}>();
const emits = defineEmits(["removeProductId"]);

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

const updateProduct = (product: ProductObjType) => {
  const index = props.form.values[fieldsRecipe.products].findIndex((p: TProductSchema) => p.id === product.id);
  props.form.setFieldValue(`${fieldsRecipe.products}.${index}`, { ...props.product, ...product });
  open.value = false;
};

const open = ref(false);
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex justify-between items-center p-1 flex-1 mr-6" data-component="product-summary">
      <div>
        <span>{{ index + 1 }}.</span>
        <span class="ml-2 text-amber-600 dark:text-amber-300">{{ productLabel }}</span>

        <span class="text-xs font-bold ml-2">{{ product?.description }}</span>
      </div>
      <span class="font-semibold">{{ product?.amount }} <ProductUnit :id="product?.activeUnitId" /> </span>
    </div>
    <slot />
    <Dialog v-if="product" v-model:open="open">
      <DialogTrigger>
        <Pencil class="size-4 cursor-pointer" />
        <DialogContent>
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
  </div>
</template>
