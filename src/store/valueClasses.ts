import { IobrokerState } from "@/types/types.ts";
import { toJSON } from "@michaelroling/ts-library";

export abstract class BaseValue<T> {
  public id: string;
  public val: T;
  public ack: boolean;
  public ts?: number;
  public lc?: number;
  public from?: string;
  public q?: number;

  constructor({ id, ack, ts, val, lc, q, from }: IobrokerState & { id: string; val: T }) {
    this.val = val;
    this.id = id;
    this.ack = ack;
    this.ts = ts;
    this.lc = lc;
    this.from = from;
    this.q = q;
  }

  public update(state: IobrokerState & { val: T }): void {
    this.val = state.val;
    this.ack = state.ack;
    this.ts = state.ts;
    this.lc = state.lc;
    this.from = state.from;
    this.q = state.q;
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
  #cache?: { raw: string; parsed: T | null };

  public get(fallback: string): string {
    return this.val ?? fallback;
  }

  public get parsed(): T | null {
    if (!this.#cache || this.#cache.raw !== this.val) {
      this.#cache = { raw: this.val, parsed: toJSON<T>(this.val).json };
    }
    return this.#cache.parsed;
  }
}

export type ValueClassCtor = new (state: IobrokerState & { id: string; val: any }) => BaseValue<any>;
