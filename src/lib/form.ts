import { computed } from "vue";
import type { ZodSchema } from "zod";

/**
 * Generic helper: returns the first issue message for a given field from any Zod schema
 * @param schema Zod schema to validate against
 * @param data data to validate
 * @param field field name (or numeric index) to look for in issue paths
 */
export const getFieldError = <T>(schema: ZodSchema<T>, data: unknown, field: string | number) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues.find((i) => i.path[0] === field);
    return issue?.message ?? undefined;
  }
  return undefined;
};

/**
 * Create a simple validator function for a schema: (data) => boolean
 */
export const createIsValid = <T>(schema: ZodSchema<T>) => {
  return (data: unknown) => schema.safeParse(data).success;
};

/**
 * Create a computed validator to produce the same reactive API shape as before
 */
export const createIsValidComputed = <T>(schema: ZodSchema<T>) => computed(() => (data: unknown) => schema.safeParse(data).success);

