import { describe, it, expect } from "vitest";
import { z } from "zod";
import { getFieldError, createIsValid, createIsValidComputed } from "../../src/lib/form";

const schema = z.object({
  name: z.string().min(3, { message: "too short" }),
  qty: z.number().min(1, { message: "min 1" }),
});

describe("form generic helpers", () => {
  it("getFieldError returns the message for failing field", () => {
    const data = { name: "ab", qty: 0 };
    expect(getFieldError(schema, data, "name")).toBe("too short");
    expect(getFieldError(schema, data, "qty")).toBe("min 1");
  });

  it("getFieldError returns undefined when field is valid or no issue", () => {
    const data = { name: "abcd", qty: 2 };
    expect(getFieldError(schema, data, "name")).toBeUndefined();
    expect(getFieldError(schema, data, "qty")).toBeUndefined();
  });

  it("createIsValid returns a validator function that validates data", () => {
    const isValid = createIsValid(schema);
    expect(isValid({ name: "abc", qty: 1 })).toBe(true);
    expect(isValid({ name: "a", qty: 1 })).toBe(false);
  });

  it("createIsValidComputed returns a computed wrapper that yields a validator", () => {
    const computedValidator = createIsValidComputed(schema);
    const validator = computedValidator.value;
    expect(typeof validator).toBe("function");
    expect(validator({ name: "abc", qty: 1 })).toBe(true);
    expect(validator({ name: "a", qty: 1 })).toBe(false);
  });
});

