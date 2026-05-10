import { Row } from "@tanstack/vue-table";
import { ApolloQueryResult } from "@apollo/client";
import { FunctionalComponent, HTMLAttributes } from "vue";
import { Badge } from "../components/shared/badge/badge.variants";
import { IoBrokerStates, StoreValue } from "@/store";

export interface AlexaList {
  name: string;
  time: string;
  id: string;
  pos: number;
  buttonmove: string;
  buttondelete: string;
  buttonCompletedId: string;
  buttonDeleteId: string;
}

export interface GlobalObject {
  [key: string]: any;
}

export interface TimerObject {
  timerAlive: StoreValue<boolean>;
}

export interface Timer {
  timeString: StoreValue<string>;
  device: StoreValue<string>;
  timeEnd: StoreValue<string>;
  timeStart: StoreValue<string>;
  percent: StoreValue<number>;
  name: StoreValue<string>;
  initialTimer: StoreValue<string>;
}

export interface Timers {
  1: Timer;
  2: Timer;
  3: Timer;
  4: Timer;
}

export interface RoomType {
  name: string;
  shutter: boolean;
  batteryHeating?: StoreValue<boolean>[];
  bellStatus?: StoreValue<boolean>;
  temp?: (number | undefined)[];
  windows: {
    name: string;
    idShutterPosition?: string;
    isOpenStatus?: boolean;
    door?: boolean;
    shutterPosition?: number;
    shutterAutoDown?: StoreValue<boolean>;
    shutterAutoUp?: StoreValue<boolean>;
    shutterAutoUpTime?: StoreValue<number>;
    shutterAutoDownDelay?: StoreValue<number>;
    windowSensorReachable: StoreValue<boolean>;
  }[];
}

export interface IdToSubscribe<TData, SubKey = string> {
  value: Ids<TData, SubKey>[];
  storeFolder: IoBrokerStates;
}

export interface Ids<TData, SubKey = string> {
  id: string;
  key: keyof TData;
  subKey?: SubKey;
  invertValue?: boolean; // if true, the value(boolean) will be inverted
}

export interface IdsToControl {
  tempSetId: string;
}

export type Esszimmer = "links" | "rechts";
export type Kinderzimmer = "fenster";
export type Bad = "fenster";
export type Abstellraum = "fenster";

export interface IobrokerState {
  val: IobrokerStateValue;
  ack: boolean;
  ts: number;
  lc: number;
  from: string;
  q: number;
}

export type IobrokerStateValue = string | number | boolean;

export interface CalendarDayType {
  date: string;
  event: string;
  _class: string;
  _date: string;
  _end: string;
  _section: string;
  _IDID: string;
  _allDay: string;
  _private: string;
  _rule: string;
  _location: string;
  _calName: string;
  _object: CalendarObject;
}

export interface CalendarObject {
  type: string;
  params: [];
  created: string;
  description: string;
  end: string;
  dtstamp: string;
  start: string;
  datetype: string;
  lastmodified: string;
  sequence: number;
  summary: string;
  uid: string;
  "APPLE-CREATOR-IDENTITY": string;
  "APPLE-CREATOR-TEAM-IDENTITY": string;
}

export interface Entries {
  title: string;
  value: boolean | number | string | undefined;
  type: "string" | "number" | "boolean";
  unit?: string;
}

export type IobrokerLanguages = "en" | "de" | "ru" | "pt" | "nl" | "fr" | "it" | "es" | "pl" | "uk" | "zh-cn";

export type DefaultTypes = string | number | boolean | object;
export type CallbackFunktion = (args?: DefaultTypes) => void | DefaultTypes;

export interface TextPositionType {
  position: number;
  text: string;
  id?: string;
}

export interface SelectOption {
  value: string;
  label?: string;
  id?: string;
  class?: string;
}

export interface InputOption {
  name: string;
  value: string | number;
  description?: string;
}

export interface HasOptionalNameAndId {
  name?: string;
  id?: string;
}

export type OnResult<T> = Omit<ApolloQueryResult<T>, "data"> & { data: T | undefined };

export interface FileData {
  name: string;
  url: string;
}

export type Pathes<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Pathes<T[K]>> : never;
    }[keyof T]
  : "";
type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}.${P}` : never) : never;

export interface ITableColumn<Value, TRow, CustomValue = null, F = null> {
  value: Value;
  row: Row<TRow>;
  source: string;
  customValue?: CustomValue | null;
  callback?: F | CallbackFunktion;
}

export interface InfoType {
  title: string;
  value: string | number | undefined;
  unit?: string;
  bounce?: boolean;
  class?: string;
  callback?: () => void;
}

export interface NavigationType {
  icon: FunctionalComponent;
  text: string;
  to: string;
  externalLink?: boolean;
  badges?: {
    value: number;
    color: Badge["color"];
    class?: HTMLAttributes["class"];
  }[];
}

export interface Log {
  date: string;
  severity: string;
  message: string;
  from: string;
  ts: number;
}

export type Level = "info" | "warn" | "error";

export interface LogReset {
  error: StoreValue<boolean>;
  warn: StoreValue<boolean>;
  info: StoreValue<boolean>;
}

export type RoomItems =
  | "Esszimmer"
  | "Gäste WC"
  | "Bad"
  | "Flur"
  | "Gästezimmer"
  | "Kinderzimmer"
  | "Küche"
  | "Schlafzimmer"
  | "Wohnzimmer"
  | "Keller Michael"
  | "Keller Waschen";
