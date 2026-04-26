/**
 * Calculate the total price from an array of objects with a price property.
 *
 * @param obj An array of objects, each containing a price property that is a number or null.Price only should have 2 decimal places
 * @returns The total price calculated by summing the price properties of the objects in the array. If the input is undefined, it returns 0.
 */
export function getTotalByPrice<T extends { price?: number | null }>(obj?: T[]): number {
  const cents = obj?.reduce((acc, item) => acc + Math.round((item?.price ?? 0) * 100), 0) ?? 0;

  return cents / 100;
}
