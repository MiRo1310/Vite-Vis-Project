import { type TRoute } from "@/router/routes.ts";
import { isDefined } from "@vueuse/core";
import { type TNotificationType } from "@/types/notification.ts";

export interface OptionalMessageParameter {
  route?: TRoute;
  date?: Date;
  statusBoolean?: boolean;
  durationMS?: number;
}

export class NotificationMessage {
  private readonly _date: Date;

  constructor(
    private _id: string,
    private _message: string,
    private _type: TNotificationType,
    private _priority: number,
    private _optional: OptionalMessageParameter,
  ) {
    this._date = this._optional.date ?? new Date();
  }

  public get hasStatus(): boolean {
    return isDefined(this._optional.statusBoolean);
  }

  public get message() {
    return this._message;
  }

  public get priority() {
    return this._priority;
  }

  public get type() {
    return this._type;
  }

  public get status() {
    return this._optional.statusBoolean ?? false;
  }

  public get date() {
    return this._date;
  }

  public get id() {
    return this._id;
  }

  public get route(): TRoute | undefined {
    return this._optional.route;
  }

  public get hasDuration(): boolean {
    const ms = this._optional.durationMS;
    return !!ms && ms > 0;
  }

  public get durationMS(): number | undefined {
    return this._optional.durationMS;
  }

  public get getNotificationClass() {
    switch (this._type) {
      case "success":
        return "success";
      case "error":
        return "border border-destructive animate-pulse";
      case "info":
        return "info";
      case "warning":
        return "border border-yellow-400 animate-pulse";
    }
  }
}
