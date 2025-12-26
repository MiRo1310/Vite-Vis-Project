import { TextPositionType } from "@/types/types";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql";

export const getElementByPosition = (
  index: number,
  array: RecipeDescriptionCreateOrUpdateDtoInput[]
): RecipeDescriptionCreateOrUpdateDtoInput | undefined => {
  const el = array.filter((element) => element.position === index);
  return el ? el[0] : undefined;
};
export const updateNameIdArray = (index: number, array: TextPositionType[], value?: string) => {
  const obj = array.find((element) => element.position === index);

  if (obj && value) {
    obj.text = value;
    return;
  }
  array.push({ position: index, text: value ?? "", id: undefined });
};

export const getNameFromNameIdArray = (index: number, array: TextPositionType[]) => {
  return array.find((element) => element.position === index)?.text;
};

interface NameId {
  name?: string | null;
  id?: string | null;
}

 
export const getNameById = <T extends NameId | null>(id?: string, array?: T[] | null): string => array?.find((item) => item?.id === id)?.name || "";

export const getResultById = <T extends NameId | null>(id?: string, array?: T[] | null): T | undefined => array?.find((item) => item?.id === id);

 
export const getIdByName = <T extends NameId | null>(name?: string, array?: T[] | null): string =>
  array?.find((item) => item?.name === name)?.id || "";
