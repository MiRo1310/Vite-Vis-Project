import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql";

interface INameId {
  name?: string | null;
  id?: string | null;
}

export const getElementByPosition = (
  position: number,
  array: RecipeDescriptionCreateOrUpdateDtoInput[],
): RecipeDescriptionCreateOrUpdateDtoInput | undefined => {
  return array.find((element) => element.position === position);
};

export const getNameById = <T extends INameId | null>(id?: string, array?: T[] | null): string => array?.find((item) => item?.id === id)?.name || "";

export const getIdByName = <T extends INameId | null>(name?: string, array?: T[] | null): string =>
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
