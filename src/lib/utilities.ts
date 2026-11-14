import { Logger } from "@/lib/logger.ts";

export const isTruthy = (value?: string | number | boolean | null): boolean => isDefined(value) && ["1", 1, true, "true"].includes(value);

export const isFalsy = (value?: string | number | boolean | null): boolean => ["0", 0, false, "false", undefined, null].includes(value);

export const isDefined = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;

export const deepCopy = <T>(value: T, errorHandler?: (e: unknown) => void): T | undefined => {
  try {
    return !isDefined(value) ? value : JSON.parse(JSON.stringify(value));
  } catch (err) {
    if (errorHandler) {
      errorHandler(err);
      return;
    }

    Logger.error("Error deepCopy", err);
  }
};

export const isString = (value: unknown): value is string => typeof value === "string";
