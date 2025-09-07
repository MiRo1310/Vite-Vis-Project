import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const formSchemaProduct = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    category: z.string().min(2),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    kcal: z.number().optional(),
    protein: z.number().optional(),
    salt: z.number().optional(),
    sugar: z.number().optional(),
    amount: z.number().optional(),
    unit: z.string().optional(),
  }),
);
