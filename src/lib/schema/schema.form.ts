import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { removeMultipleSpaces } from "@/lib/string.ts";

export const listingErrors = {
  date: "Wähle ein Datum",
  priceRequired: "Bitte gib einen Wert ein",
  pricePositive: "Bitte gib einen positiven Wert ein",
  addressId: "Wähle eine Adresse",
} as const;

export const addressErrors = {
  name: "Bitte gib einen Namen ein",
  street: "Bitte gib eine Straße ein",
  city: "Bitte gib eine Stadt ein",
} as const;

const listingSchema = {
  date: z.string().min(5, { error: listingErrors.date }),
  description: z.string().nullable().optional(),
  price: z.number(listingErrors.priceRequired).min(0.01, { error: listingErrors.pricePositive }),
  addressId: z.uuidv4(listingErrors.addressId),
  descriptionHelper: z.string().nullable().optional(),
};

const addressSchema = {
  name: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: addressErrors.name })),
  street: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: addressErrors.street })),
  city: z
    .string()
    .transform(removeMultipleSpaces)
    .pipe(z.string().min(1, { error: addressErrors.city })),
};

export const formSchemaAddress = toTypedSchema(z.object(addressSchema));
export const formSchemaListing = toTypedSchema(z.object(listingSchema));
