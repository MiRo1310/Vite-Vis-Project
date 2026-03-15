import { ProductObjType } from "@/types/types.ts";
import { productSchema } from "@/components/section/new-recipe/formSchema.ts";
import { computed } from "vue";

export const getProductFieldError = (product: ProductObjType, field: keyof typeof productSchema.shape) => {
  const result = productSchema.safeParse(product);
  if (!result.success) {
    const issue = result.error.issues.find((i) => i.path[0] === field);
    return issue?.message ?? undefined;
  }
  return undefined;
};

export const isValid = computed(() => (product: ProductObjType) => {
  const result = productSchema.safeParse(product);
  return result.success;
});
