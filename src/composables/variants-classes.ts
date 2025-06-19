import { computed } from "vue";
import { twMerge } from "tailwind-merge";

type Variants = Record<string, Record<string, string>>;

export const getVariantsClasses = computed(
  () => (variants: Variants, props: Record<string, unknown>) => {
    const classes: string[] = [];
    Object.keys(variants).forEach((variant) => {
      if (props[variant]) {
        classes.push(
          variants[variant][
            props[variant] as keyof (typeof variants)[typeof variant]
          ],
        );
      }
    });
    return twMerge(classes);
  },
);
