import { ref, markRaw, type Ref } from "vue";
import { toJSON } from "@michaelroling/ts-library";
import { type IobrokerState } from "@/types/types.ts";
import { ioBrokerService, type IoBrokerService } from "@/lib/io-broker-service.ts";

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

export interface IValueOf<T> {
  readonly value: T;
  readonly id: string;
  readonly ts: number | undefined;
  readonly val: T | undefined;
  readonly ack: boolean;
  setState(val: string | number | boolean | null, ack?: boolean): void;
  toggle(ack?: boolean): void;
}

export abstract class BaseValue<T> implements IValueOf<T> {
  public readonly id: string;
  protected readonly _valRef: Ref<T | undefined>;
  protected _ack: boolean = false;
  protected _ts?: number;
  protected _lc?: number;
  protected _from?: string;
  protected _q?: number;
  private ioBrokerService: IoBrokerService;

  public get val(): T | undefined {
    return this._valRef.value;
  }

  protected set val(v: T | undefined) {
    this._valRef.value = v;
  }

  constructor(id: string, val?: T) {
    markRaw(this);
    this._valRef = ref(val) as Ref<T | undefined>;
    this.id = id;
    this._ack = false;

    this.ioBrokerService = ioBrokerService;

    void this.ioBrokerService.subscribe({ id: this.id, cb: this.update });
  }

  public update = ({ val, ack, ts, lc, q, from }: IobrokerState): void => {
    this.val = val as T;
    this._ack = ack;
    this._ts = ts;
    this._lc = lc;
    this._from = from;
    this._q = q;
  };

  public get ack() {
    return this._ack;
  }

  public get ts() {
    return this._ts;
  }

  public get lc() {
    return this._lc;
  }

  public get from() {
    return this._from;
  }

  public get q() {
    return this._q;
  }

  public abstract get value(): T;

  public setState(val: string | number | boolean | null, ack = false) {
    void this.ioBrokerService.connection?.setState(this.id, val, ack);
  }

  public toggle(ack = false) {
    void this.ioBrokerService.connection?.setState(this.id, !this.val, ack);
  }
}

export class NumberValue extends BaseValue<number> {
  constructor(
    id: string,
    val?: number,
    private unit?: string,
  ) {
    super(id, val);
  }

  public get value(): number {
    return this._valRef.value ?? 0;
  }

  public get valueWithUnit(): string {
    return this.val + " " + this.unit;
  }
}

export class BooleanValue extends BaseValue<boolean> {
  constructor(
    id: string,
    val?: boolean,
    private invert = false,
  ) {
    super(id, val);
  }

  public update = ({ val, ack, ts, lc, q, from }: IobrokerState): void => {
    this.val = this.invert ? !val : (val as boolean);
    this._ack = ack;
    this._ts = ts;
    this._lc = lc;
    this._from = from;
    this._q = q;
  };

  public get value(): boolean {
    return this.val ?? false;
  }
}

export class StringValue extends BaseValue<string> {
  public get(): string {
    return this.val ?? "";
  }

  public get value(): string {
    return this._valRef.value ?? "";
  }
}

export class JsonValue<T> extends BaseValue<string> {
  #cache?: { raw: string | undefined; parsed: T | null };

  public get(fallback?: string): string {
    return this.val ?? fallback ?? "";
  }

  public get value(): string {
    return this._valRef.value ?? "";
  }

  public parsed(fallback: T): T {
    if (!this.#cache || this.#cache.raw !== this.val) {
      this.#cache = { raw: this.val, parsed: this.val === undefined ? null : toJSON<T>(this.val).json };
    }
    return this.#cache.parsed ?? fallback;
  }
}

export type ValueClassCtor = new (state: ValueState<any>) => BaseValue<any>;
