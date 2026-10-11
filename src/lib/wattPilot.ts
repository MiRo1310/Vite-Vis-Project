import { type SelectOption } from "@/types/types.ts";

/**
 * Builds select options for all enum keys starting with one of `prefixes` (e.g. "1P", "3P").
 * The label shows phase and current (e.g. "1P 6A") plus the charging power from `curve`.
 */
export const chargingModeOptions = (
  _enum: Record<string, string>,
  prefixes: string[],
  curve: Partial<Record<string, number>>,
): SelectOption[] => {
  const options: SelectOption[] = [];
  for (const key in _enum) {
    const prefix = prefixes.find((p) => key.startsWith(p));
    if (!prefix) {
      continue;
    }
    const value = _enum[key];
    const power = curve[value];
    const name = `${prefix} ${key.replace(prefix, "")}`;
    options.push({ value, label: power === undefined ? name : `${name} – ${power} W` });
  }
  return options;
};
