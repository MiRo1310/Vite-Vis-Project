import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export type TProductSchema = z.infer<typeof productSchema>;
export type TProductHeaderSchema = z.infer<typeof textPositionObj>;

export const fieldsRecipe = {
  products: "productArray",
  headers: "headersProductArray",
};

const textPositionObj = z.object({ position: z.number().default(0), text: z.string(), id: z.string().optional() });

const description = z.object({
  position: z.number(),
  text: z.string(),
  id: z.string().optional().nullable(),
  header: z.string().optional().default(""),
});

export const productSchema = z.object({
  productId: z.string().min(2, { error: "Wähle ein Produkt" }),
  description: z.string().optional(),
  amount: z.number().min(0.1, { error: "Gib einen Wert ein" }),
  groupPosition: z.number(),
  id: z.string().nullable().optional(),
  activeUnitId: z.uuidv4("Bitte wähle eine Einheit"),
  sortOrder: z.int(),
  position: z.number(),
});

export const fields = {
  name: z.string("Gib einen Rezeptnamen an").min(1, "Mindestlänge: 1").max(255),
  portions: z.number("Gib einen Wert ein").min(1).max(255),
  preparationTimeMin: z.number().nullable(),
  totalTimeMin: z.number().nullable(),
  recipeCategoryId: z.string().nullable(),
  descriptions: z.array(description).optional().nullable(),
  headersProductArray: z.array(textPositionObj).optional(),
  productArray: z.array(productSchema).optional(),
};

export const formSchema = toTypedSchema(z.object(fields));
export const formSchemaProduct = toTypedSchema(productSchema);
