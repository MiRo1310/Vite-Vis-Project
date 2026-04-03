import { useForm } from "vee-validate";

export const newIdPrefix = "NEW_ID_TEMP_";

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

export class PrefixedIdGenerator {
  index = 0;

  constructor(readonly prefix: string) {}

  public nextId(): string {
    const id = `${this.prefix}${this.index}`;
    this.index++;
    return id;
  }
}
