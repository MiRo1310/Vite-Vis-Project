import { startYear } from "@/constants/finance.ts";

export const financeYearBtns = (start: number = startYear, current: number = new Date().getFullYear()): number => {
  return current - start + 1;
};

export const yearRange = (start: number = startYear, current?: number): { list: number[]; isValidYear: (year?: number) => boolean } => {
  const list = Array.from({ length: financeYearBtns(start, current) }, (_, i) => start + i);
  const isValidYear = (year?: number): boolean => list.some((y) => year === y);

  return { list, isValidYear };
};
