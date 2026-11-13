import { descriptionUncheckedColor, financeListTextColorMapping, startYear } from "@/constants/finance.ts";
import type { AddressListingQuery, DescriptionsListingQuery, TravelCostQuery } from "@/api/gql/graphql.ts";
import { type InputOption, type SelectOption, type TravelCostListingAddress } from "@/types/types.ts";
import { isDefined } from "@/lib/utilities.ts";

export const financeYearBtns = (start: number = startYear, current: number = new Date().getFullYear()): number => {
  return current - start + 1;
};

export const yearRange = (start: number = startYear, current?: number): { list: number[]; isValidYear: (year?: number) => boolean } => {
  const list = Array.from({ length: financeYearBtns(start, current) }, (_, i) => start + i);
  const isValidYear = (year?: number): boolean => list.some((y) => year === y);

  return { list, isValidYear };
};

export type TravelCostRow = TravelCostQuery["travelCost"][number];

export function getCellClasses(original: TravelCostRow): string {
  if (!original.isValidated || !original.hasInvoice) {
    return descriptionUncheckedColor;
  }

  for (const [keyword, color] of financeListTextColorMapping) {
    if (original.description?.toLowerCase().includes(keyword)) {
      return color;
    }
  }

  return descriptionUncheckedColor;
}

export const formatAddress = (address: TravelCostListingAddress): string => {
  const street = address?.street;
  const city = address?.city;
  if (street && city) {
    return `${street}, ${city}`;
  }
  if (street) {
    return street;
  }
  return city ?? "";
};

export const getYearFilter = (year: string | number) => ({
  and: [{ date: { lte: `${year}-12-31` } }, { date: { gte: `${year}-01-01` } }],
});

export function getAddressOptions(addresses?: AddressListingQuery["addresses"]): InputOption[] {
  const mappingAddress = (addresses ?? []).map((address) => {
    return {
      name: address.name,
      id: address.id,
    };
  });

  return mappingAddress
    .filter((address) => isDefined(address.name) && isDefined(address.id))
    .map(({ id, name }): InputOption => ({ value: id, name: name as string }));
}

export function getDescriptionOptions(descriptions?: DescriptionsListingQuery["description"]): SelectOption[] {
  return (descriptions ?? []).map((d) => {
    return {
      label: d.text,
      value: d.text,
    };
  });
}
