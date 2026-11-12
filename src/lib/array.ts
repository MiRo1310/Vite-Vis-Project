export class Collection<T> extends Array<T> {
  static get [Symbol.species]() {
    return Array;
  }

  constructor(array: T[]) {
    super();
    this.push(...array);
  }

  public get toArray(): T[] {
    return [...this];
  }

  public get first(): T {
    return this[0];
  }

  public get last(): T {
    return this[this.length - 1];
  }

  public getPosition(nth: number): T {
    return this[nth];
  }

  public get removeDuplicates(): T[] {
    return this.filter((item: T, index: number): boolean => this.indexOf(item) === index);
  }

  public get trim() {
    return this.map((item) => (typeof item === "string" ? item.trim() : item));
  }

  public add(val: T) {
    this.push(val);
    return this.toArray;
  }
}

export class NumberCollection extends Collection<number> {
  public sum(): number {
    return this.reduce((acc, val) => acc + val, 0);
  }

  public average(): number {
    if (this.length === 0) {
      return 0;
    }
    return this.sum() / this.length;
  }

  public get min(): number {
    return Math.min(...this);
  }

  public get max(): number {
    return Math.max(...this);
  }
}
