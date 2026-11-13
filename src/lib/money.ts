/**
 * Sums a list of money values. Each value is rounded to whole cents before summing to avoid floating point errors.
 *
 * @param list The money values to sum.
 * @returns The sum as a new `Money` in Euro. Returns `0` for an empty list.
 */
export function getTotalByPrice(list: Money[]): Money {
  const cents = list.reduce((acc, item) => acc + Math.round(item.money * 100), 0);

  return new Money(cents / 100);
}

/**
 * An amount of money with its unit.
 */
export class Money {
  /**
   * @param _money The amount. Defaults to `0`.
   * @param _unit The currency unit. Defaults to `€`.
   */
  constructor(
    private _money: number = 0,
    private _unit: string = "€",
  ) {}

  /**
   * The currency unit, e.g. `€`.
   */
  public get unit() {
    return this._unit;
  }

  /**
   * The raw, unrounded amount.
   */
  public get money() {
    return this._money;
  }

  /**
   * The amount rounded to two decimals with a decimal comma and the unit, e.g. `12,50 €`.
   */
  public get formated() {
    return `${this.money.toFixed(2).replace(".", ",")} ${this.unit}`;
  }
}
