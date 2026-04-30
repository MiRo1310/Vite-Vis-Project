import { SelectOption } from "@/types/types.ts";
import { StoreValue } from "@/store";

export function tempArray() {
  const array: SelectOption[] = [];
  for (let i = 5; i < 31; i++) {
    if (i === 5) {
      array.push({
        label: "Aus",
        value: "0",
      });
    }
    array.push({
      label: i.toString(),
      value: i.toString(),
    });
  }
  return array;
}

export const getValNumber = (storeValue: StoreValue<number>): number => storeValue?.val ?? 0;
export const getValBoolean = (storeValue: StoreValue<boolean>): boolean => storeValue?.val ?? false;
export const getValString = (storeValue: StoreValue<string>): string => storeValue?.val ?? "";
export const getValId = (storeValue: StoreValue<unknown>): string | undefined => storeValue?.id;
