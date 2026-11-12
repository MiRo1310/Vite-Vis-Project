import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { removeMultipleSpaces } from "@/lib/string.ts";

export const fields = {
  date: z.string().min(5, { error: "Wähle ein Datum" }),
  description: z.string().nullable().optional(),
  price: z.number("Bitte gib einen Wert ein").min(0.01, { error: "Bitte gib einen positiven Wert ein" }),
  addressId: z.uuidv4("Wähle eine Adresse"),
  descriptionHelper: z.string().nullable().optional(),
};

export const formSchemaListing = toTypedSchema(z.object(fields));
export const fieldsAddress = {
  name: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: "Bitte gib einen Namen ein" })),
  street: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: "Bitte gib eine Straße ein" })),
  city: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: "Bitte gib eine Stadt ein" })),
};

export const formSchemaAddress = toTypedSchema(z.object(fieldsAddress));
