import { descriptionUncheckedColor, financeListTextColorMapping, startYear } from "@/constants/finance.ts";
import type { TravelCostQuery } from "@/api/gql/graphql.ts";
import { type TravelCostListingAddress } from "@/types/types.ts";

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

export const listingAddress = (address: TravelCostListingAddress): string => {
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
