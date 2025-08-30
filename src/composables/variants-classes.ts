import { twMerge } from "tailwind-merge";

type Variants = Record<string, Record<string, string>>;

export const getVariantsClasses = <T>(variants: Variants, props: Record<string, unknown>, excludedVariants?: (keyof T)[]) => {
  const classes: string[] = [];
  Object.keys(variants).forEach((variant) => {
    if (isExcluded<T>(variant as keyof T, excludedVariants)) {
      return;
    }
    if (props[variant]) {
      classes.push(variants[variant][props[variant] as keyof (typeof variants)[typeof variant]]);
    }
  });
  return twMerge(classes);
};

const isExcluded = <T>(variant: keyof T, excludedVariants?: (keyof T)[]) => {
  if (!excludedVariants) {
    return false;
  }
  return excludedVariants.includes(variant);
};
