export const newIdPrefix = "NEW_ID_TEMP_";

export interface IRecipeDescriptionCreateOrUpdate {
  header?: string;
  id?: string | null;
  position: number;
  text: string;
  positionByCreate: number;
}
