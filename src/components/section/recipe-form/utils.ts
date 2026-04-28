import { TextPositionType } from "@/types/types";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql";
import { Logger } from "@/lib/logger.ts";

export const getElementByPosition = (
  index: number,
  array: RecipeDescriptionCreateOrUpdateDtoInput[],
): RecipeDescriptionCreateOrUpdateDtoInput | undefined => {
  const el = array.filter((element) => element.position === index);
  return el ? el[0] : undefined;
};

export const updateTextByGroupPosition = (index: number, array: TextPositionType[], value?: string) => {
  Logger("Update text by position", { value: { index, value, array } });
  const obj = array.find((element) => element.position === index);

  if (obj && value) {
    obj.text = value;
    return;
  }
  array.push({ position: index, text: value ?? "", id: undefined });
};

interface NameId {
  name?: string | null;
  id?: string | null;
}

export const getNameById = <T extends NameId | null>(id?: string, array?: T[] | null): string => array?.find((item) => item?.id === id)?.name || "";

export const getIdByName = <T extends NameId | null>(name?: string, array?: T[] | null): string =>
  array?.find((item) => item?.name === name)?.id || "";

export const newIdPrefix = "NEW_ID_TEMP_";

export class PrefixedIdGenerator {
  index = 0;

  constructor(readonly prefix: string) {}

  public nextId(): string {
    const id = `${this.prefix}${this.index}`;
    this.index++;
    return id;
  }
}
