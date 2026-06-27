import { type SelectOption } from "@/types/types.ts";

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
