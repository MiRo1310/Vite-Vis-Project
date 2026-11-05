import { type TValue } from "@/components/shared/energy-flow";
import { formatMoney } from "@/lib/money.ts";
import { isDefined } from "@/lib/utilities.ts";

export const sumNumbers = (val: TValue) => {
  if (Array.isArray(val)) {
    return parseFloat(val.reduce((acc, value) => acc + value, 0).toFixed(2));
  }
  return parseFloat(val.toFixed(2));
};

export function clamp(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) {
    return min;
  }
  if (max !== undefined && value > max) {
    return max;
  }
  return value;
}

export const formatNumber = (number?: number, decimals?: number): string => {
  // toFixed rounds the value
  if (!isDefined(number)) {
    return "";
  }
  if (isDefined(decimals)) {
    return number.toFixed(decimals).replace(".", ",");
  }
  return String(number).replace(".", ",");
};

const moneyUnits = ["€"];
function isMoneyUnit(unit?: string): boolean {
  return moneyUnits.some((u) => u === unit);
}

export const numberFormatter = ({ number, decimals, unit }: { number?: number | string; decimals?: number; unit?: string }) => {
  const floatNumber = parseFloat(String(number));
  if (isNaN(floatNumber)) {
    return "";
  }

  if (isMoneyUnit(unit)) {
    return formatMoney(floatNumber, unit);
  }

  let string = formatNumber(floatNumber, decimals);

  if (unit && string) {
    string += ` ${unit}`;
  }

  return string.trim();
};
