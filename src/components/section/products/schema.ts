import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const formSchemaProduct = toTypedSchema(
  z.object({
    name: z.string().min(4, { error: "Der Name muss mindestens 4 Zeichen haben" }).max(50, { error: "Der Name darf max. 50 Zeichen lang sein" }),
    category: z.string().min(2, { error: "Eine Kategorie muss gewählt werden" }),
    carbs: z.number().optional().nullable(),
    fat: z.number().optional().nullable(),
    kcal: z.number().optional().nullable(),
    protein: z.number().optional().nullable(),
    salt: z.number().optional().nullable(),
    sugar: z.number().optional().nullable(),
    amount: z.number(),
    unit: z.string("Wähle eine Einheit"),
  }),
);
