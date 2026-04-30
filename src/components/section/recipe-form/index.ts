import { useForm } from "vee-validate";

export interface IRecipeDescriptionCreateOrUpdate {
  header?: string;
  id?: string | null;
  position: number;
  text: string;
  positionByCreate: number;
}

export type TForm = ReturnType<typeof useForm>;

export type TRecipeDescriptionLike = { position: number; text: string; id?: string | null; header?: string | null };
export type TRecipeHeaderProductLike = { id?: string | null; recipeId?: string | null; text: string; position?: number | null };
export type TRecipeProductLike = {
  amount?: number | null;
  description?: string | null;
  groupPosition: number;
  productId: string;
  unit?: string | null;
  id?: string | null;
  activeUnitId?: string | null;
  position?: number | null;
  sortOrder: number;
};
