import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const textPositionObj = z.object({ position: z.number(), text: z.string(), id: z.string().optional() });
const description = z.object({
  position: z.number(),
  text: z.string(),
  id: z.string().optional().nullable(),
  header: z.string().optional().default(""),
});

const productObj = z.object({
  productId: z.string(),
  description: z.string(),
  amount: z.number(),
  unit: z.string(),
  productPosition: z.number(),
  groupPosition: z.number(),
  id: z.string().optional(),
  activeUnitId: z.uuidv4(),
});

export const fields = {
  name: z.string().min(1).max(255),
  portions: z.number().optional(),
  descriptions: z.array(description).optional().nullable(),
  headersProductArray: z.array(textPositionObj).optional(),
  productArray: z.array(productObj).optional(),
};

export const formSchema = toTypedSchema(z.object(fields));
