import { SelectOption } from "@/components/shared/select/select.vue";

export function tempArray() {
  const array: SelectOption[] = [];
  for (let i = 5; i < 31; i++) {
    if (i === 5) {
      array.push({
        label: "Aus",
        val: "0"
      });
    }
    array.push({
      label: i.toString(),
      val: i.toString()
    });
  }
  return array;
}

export function createArrayByStore(storeItem: any) {
  const data: any [] = [];
  Object.keys(storeItem).forEach((key) => {
    const item = storeItem[key as keyof typeof storeItem] as { [key: string]: { val: any } };

    Object.keys(item).forEach((value) => {
      if (!item[value as keyof typeof item]) return;

      const existingElement = data.find((element) => element.name === key);
      if (existingElement) {
        existingElement[value] = item[value as keyof typeof item]?.val;
        return;
      }
      data.push({
        name: key,
        [value]: item[value as keyof typeof item]?.val
      });
    });
  });
  return data;
}