import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const fields = {
  date: z.string().min(5, { error: "Wähle ein Datum" }),
  description: z.string().nullable().optional(),
  price: z.number("Bitte gib einen Wert ein").positive("Bitte gib einen Wert ein").min(0.01, { error: "Bitte gib einen Wert ein" }),
  addressId: z.uuidv4("Wähle eine Adresse"),
  descriptionHelper: z.string().nullable().optional(),
};

export const formSchemaListing = toTypedSchema(z.object(fields));
