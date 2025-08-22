import { computed } from "vue";
import { isDefined } from "@vueuse/core";
import { HasOptionalNameAndId, SelectOption } from "@/types/types";

function isHasOptionalNameAndId<T>(item: T): item is T & HasOptionalNameAndId {
  return isDefined((item as HasOptionalNameAndId).name) && isDefined((item as HasOptionalNameAndId).id);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const options = computed(() => <T>(array: T[]): SelectOption[] => {
  return array
    .filter(isHasOptionalNameAndId)
    .map((item) => ({
      label: item.name ?? "",
      value: item.id ?? "",
    }))
    .filter((category) => category.label !== "" && category.value !== "");
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const getSelectableOptions = <T extends { name?: string | null } | undefined | null>(array?: T[] | null): SelectOption[] => {
  if (!array) {
    return [];
  }
  const selectedItems = options.value(array);

  return selectedItems.sort((a, b) => (a.label && b.label ? a.label.localeCompare(b.label) : 0));
};
