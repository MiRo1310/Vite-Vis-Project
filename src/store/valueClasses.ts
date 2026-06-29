import { ref, markRaw, type Ref } from "vue";
import { toJSON } from "@michaelroling/ts-library";
import { type IobrokerState } from "@/types/types.ts";
import { ioBrokerService, type IoBrokerService } from "@/lib/io-broker-service.ts";
import { useNotificationStore } from "@/store/notification-store.ts";
import { type TRoute } from "@/router/routes.ts";
import { NotificationMessage } from "@/lib/notificationMessage.ts";
import { type TNotificationType } from "@/types/notification.ts";
import { Logger } from "@/lib/logger.ts";

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

interface BaseValueOptions<T> {
  val?: T;
  onChange?: IOnChange<T>;
  notificationOnChange?: INotificationOnChange<T>;
}

export interface INotificationOnChange<T> {
  message: string;
  type?: TNotificationType;
  priority: number;
  statusBoolean?: boolean;
  showMessageOn?: (val: T) => boolean;
  removeMessageOn?: (val: T) => boolean;
  route?: TRoute;
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
  private onChange?: IOnChange<T>;
  private NotificationOnChange?: NotificationOnChange<T>;
  private defaultShowMessageOn: (val: T) => boolean = (val: T) => !!val;
  private defaultRemoveMessageOn: (val: T) => boolean = (val: T) => !val;

  public get val(): T | undefined {
    return this._valRef.value;
  }

  protected set val(v: T | undefined) {
    this._valRef.value = v;
  }

  constructor(id: string, obj?: BaseValueOptions<T>) {
    markRaw(this);
    this._valRef = ref(obj?.val) as Ref<T | undefined>;
    this.id = id;
    this._ack = false;
    this.onChange = obj?.onChange;
    if (obj?.notificationOnChange) {
      const { message, showMessageOn, statusBoolean, removeMessageOn, priority, type, route } = obj.notificationOnChange;
      this.NotificationOnChange = new NotificationOnChange<T>(
        this.id,
        new NotificationMessage(this.id, message, type ?? "info", priority, new Date(), statusBoolean ?? false, route),
        showMessageOn ?? this.defaultShowMessageOn,
        removeMessageOn ?? this.defaultRemoveMessageOn,
      );
    }

    this.ioBrokerService = ioBrokerService;

    void this.ioBrokerService.subscribe({ id: this.id, cb: this.update });
  }

  protected triggerHandlers(): void {
    if (this.val === undefined) {
      return;
    }
    this.onChange?.update(this.val);
    this.NotificationOnChange?.update(this.val);
  }

  public update = ({ val, ack, ts, lc, q, from }: IobrokerState): void => {
    this.val = val as T;
    this._ack = ack;
    this._ts = ts;
    this._lc = lc;
    this._from = from;
    this._q = q;
    this.triggerHandlers();
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
  private readonly unit?: string;
  constructor(id: string, obj?: BaseValueOptions<number> & { unit?: string }) {
    super(id, obj);
    this.unit = obj?.unit;
  }

  public get value(): number {
    return this._valRef.value ?? 0;
  }

  public get valueWithUnit(): string {
    return this.val + " " + this.unit;
  }

  public get valAndUnit() {
    return { unit: this.unit ?? "", val: this.value };
  }
}

export class BooleanValue extends BaseValue<boolean> {
  private readonly invert: boolean;
  constructor(id: string, obj?: BaseValueOptions<boolean> & { invert?: boolean }) {
    super(id, obj);
    this.invert = obj?.invert ?? false;
  }

  public update = ({ val, ack, ts, lc, q, from }: IobrokerState): void => {
    this.val = val as boolean;
    this._ack = ack;
    this._ts = ts;
    this._lc = lc;
    this._from = from;
    this._q = q;
    this.triggerHandlers();
  };

  public get value(): boolean {
    return (this.invert ? !this.val : this.val) ?? this.invert;
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

export interface IOnChange<T> {
  update(val: T): void;
}

export class OnChange<T> implements IOnChange<T> {
  public constructor(private cb: (val: T) => void) {}
  public update(val: T) {
    this.cb(val);
  }
}

export class NotificationOnChange<T> implements IOnChange<T> {
  public constructor(
    private id: string,
    private notificationMessage: NotificationMessage,
    private showMessageOn: (val: T) => boolean,
    private removeMessageOn: (val: T) => boolean,
  ) {}

  public update(val: T) {
    try {
      const store = useNotificationStore();
      if (this.showMessageOn(val)) {
        store.addNotification(this.notificationMessage);
      } else if (this.removeMessageOn(val)) {
        store.removeNotification(this.id);
      }
    } catch (e) {
      Logger(`[NotificationOnChange] error for: ${this.id},  ${e}`, { type: "error" });
    }
  }
}

export type ValueClassCtor = new (state: ValueState<any>) => BaseValue<any>;
