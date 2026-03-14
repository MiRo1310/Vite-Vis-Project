<script setup lang="ts">
import { computed, ref } from "vue";
import { ProductObjType, SelectOption } from "@/types/types";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Pencil } from "lucide-vue-next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RecipeProductDialogContent from "@/components/section/new-recipe/RecipeProductDialogContent.vue";
import { GetRecipeByIdQuery } from "@/api/gql/graphql.ts";
import { TForm } from "@/components/section/new-recipe/index.ts";

const props = defineProps<{
  index: number;
  product?: ProductObjType;
  countedProducts: number;
  recipe: GetRecipeByIdQuery["recipe"];
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
  props.form.setFieldValue(`productArray.${props.product?.position}`, { ...props.product, ...product });
  open.value = false;
};

const open = ref(false);
</script>
<template>
  <!--  TODO Error wenn das value nicht passt-->
  <div class="flex justify-between items-center">
    <div class="flex justify-between items-center p-1 flex-1 mr-6" data-component="product-summary">
      <div>
        <!--        TODO Remove-->
        <span class="text-amber-300 mr-3"> Sort: {{ product?.sortOrder }}</span>
        <span class="text-amber-300 mr-3"> Pos: {{ product?.position }}</span>
        <span>{{ index + 1 }}.</span>
        <span class="ml-2 text-amber-300">{{ productLabel }}</span>

        <span class="text-xs font-bold ml-2">{{ product?.description }}</span>
      </div>
      <!--      TODO Get unit by id-->
      <span class="font-semibold">{{ product?.amount }} {{ product?.unit }}</span>
    </div>
    <slot />
    <Dialog v-if="product" v-model:open="open">
      <DialogTrigger>
        <Pencil class="size-4" />
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
