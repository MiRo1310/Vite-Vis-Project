export const invertBoolean = (value: boolean): boolean => !value;

import { type IValueOf } from "@/store/valueClasses.ts";

export const countTrue = (primary: Record<string, IValueOf<boolean>>, override: Record<string, IValueOf<boolean>> = {}): number => {
  return Object.keys(primary).reduce((prev, current): number => {
    const primaryValue = primary[current].val;
    const isOverride = current in override ? override[current].val : undefined;
    prev += (isOverride ?? primaryValue) ? 1 : 0;
    return prev;
  }, 0);
};
