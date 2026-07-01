import { type TRoute } from "@/router/routes.ts";
import { isDefined } from "@vueuse/core";
import { type TNotificationType } from "@/types/notification.ts";

export class NotificationMessage {
  constructor(
    private _id: string,
    private _message: string,
    private _type: TNotificationType,
    private _priority: number,
    private _date: Date,
    private _statusBoolean?: boolean | undefined,
    private _route?: TRoute,
  ) {}

  public get hasStatus(): boolean {
    return isDefined(this._statusBoolean);
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
    return this._statusBoolean ?? false;
  }
  public get date() {
    return this._date;
  }
  public get id() {
    return this._id;
  }
  public get route(): TRoute | undefined {
    return this._route;
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
