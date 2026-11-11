export type ParseJson = <T>(val: string | null) => JsonResponse<T>;
export type StringifyJson = (val: string | number | boolean | object) => string;

export interface JsonResponse<T> {
  json: T | null;
  isValidJson: boolean;
  error?: unknown;
}
export const stringifyJson: StringifyJson = (val: string | number | boolean | object): string => JSON.stringify(val, null, 2);

export const parseJson: ParseJson = <T>(val: string | null): JsonResponse<T> => {
  try {
    return val ? { json: JSON.parse(val) as T, isValidJson: true } : { json: null, isValidJson: false, error: "Value is null" };
  } catch (e: unknown) {
    return { json: null, isValidJson: false, error: e };
  }
};
