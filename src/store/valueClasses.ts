import { toJSON } from "@michaelroling/ts-library";

// Erlaubt das Anlegen einer "leeren" Instanz (nur id, val: undefined) im Skeleton
// sowie das vollständige Befüllen beim Eintreffen einer echten ioBroker-Nachricht.
export interface ValueState<T> {
  id: string;
  val: T | undefined;
  ack?: boolean;
  ts?: number;
  lc?: number;
  from?: string;
  q?: number;
}

export abstract class BaseValue<T> {
  public id: string;
  public val: T | undefined;
  public ack: boolean;
  public ts?: number;
  public lc?: number;
  public from?: string;
  public q?: number;

  constructor({ id, ack = false, ts, val, lc, q, from }: ValueState<T>) {
    this.val = val;
    this.id = id;
    this.ack = ack;
    this.ts = ts;
    this.lc = lc;
    this.from = from;
    this.q = q;
  }

  public update({ val, ack = false, ts, lc, q, from }: ValueState<T>): void {
    this.val = val;
    this.ack = ack;
    this.ts = ts;
    this.lc = lc;
    this.from = from;
    this.q = q;
  }

  public abstract get(fallback: T): T;
}

export class NumberValue extends BaseValue<number> {
  public get(fallback?: number): number {
    return this.val ?? fallback ?? 0;
  }
}

export class BooleanValue extends BaseValue<boolean> {
  public get(fallback?: boolean): boolean {
    return this.val ?? fallback ?? false;
  }
}

export class StringValue extends BaseValue<string> {
  public get(fallback?: string): string {
    return this.val ?? fallback ?? "";
  }
}

export class JsonValue<T> extends BaseValue<string> {
  #cache?: { raw: string | undefined; parsed: T | null };

  public get(fallback?: string): string {
    return this.val ?? fallback ?? "";
  }

  public get parsed(): T | null {
    if (!this.#cache || this.#cache.raw !== this.val) {
      this.#cache = { raw: this.val, parsed: this.val === undefined ? null : toJSON<T>(this.val).json };
    }
    return this.#cache.parsed;
  }
}

export type ValueClassCtor = new (state: ValueState<any>) => BaseValue<any>;
