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

  public get(fallback: T): T {
    return this.val ?? fallback;
  }
}

export class NumberValue extends BaseValue<number> {}
export class BooleanValue extends BaseValue<boolean> {}
export class StringValue extends BaseValue<string> {}

export class JsonValue<T> extends BaseValue<string> {
  #cache?: { raw: string; parsed: T | null };

  public get parsed(): T | null {
    if (!this.#cache || this.#cache.raw !== this.val) {
      this.#cache = { raw: this.val, parsed: toJSON<T>(this.val).json };
    }
    return this.#cache.parsed;
  }
}

export type ValueClassCtor = new (state: IobrokerState & { id: string; val: any }) => BaseValue<any>;
