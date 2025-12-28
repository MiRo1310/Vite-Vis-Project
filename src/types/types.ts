import { IoBrokerStates, StoreValue } from "@/store/iobrokerStore.ts";

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

export interface RowShoppinglist {
  user: string;
  amount: number;
  getValue: (key: string) => any;
}

export interface GlobalObject {
  [key: string]: any;
}

export interface TimerObject extends Timers {
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

export interface WindowObject {
  name: string;
  shutter: boolean;
  windows: {
    name: string;
    idShutterPosition?: string;
    isOpenStatus: boolean;
    door?: boolean;
    shutterPosition?: number;
    shutterAutoDown?: StoreValue<boolean>;
    shutterAutoUp?: StoreValue<boolean>;
    shutterAutoUpTime?: StoreValue<number>;
    shutterAutoDownDelay?: StoreValue<number>;
  }[];
}

export interface Shutter {
  wohnzimmerMitteAuto: StoreValue<boolean>;
  wohnzimmerEckeAuto: StoreValue<boolean>;
  wohnzimmerLinksAuto: StoreValue<boolean>;
  wohnzimmerRechtsAuto: StoreValue<boolean>;

  wohnzimmerMittePosition: StoreValue<number>;
  wohnzimmerEckePosition: StoreValue<number>;
  wohnzimmerLinksPosition: StoreValue<number>;
  wohnzimmerRechtsPosition: StoreValue<number>;

  wohnzimmerMitteAutoUp: StoreValue<boolean>;
  wohnzimmerEckeAutoUp: StoreValue<boolean>;
  wohnzimmerLinksAutoUp: StoreValue<boolean>;
  wohnzimmerRechtsAutoUp: StoreValue<boolean>;

  wohnzimmerMitteAutoUpTime: StoreValue<number>;
  wohnzimmerEckeAutoUpTime: StoreValue<number>;
  wohnzimmerLinksAutoUpTime: StoreValue<number>;
  wohnzimmerRechtsAutoUpTime: StoreValue<number>;

  wohnzimmerMitteDelay: StoreValue<number>;
  wohnzimmerEckeDelay: StoreValue<number>;
  wohnzimmerLinksDelay: StoreValue<number>;
  wohnzimmerRechtsDelay: StoreValue<number>;

  kuecheTuerAuto: StoreValue<boolean>;
  kuecheFensterAuto: StoreValue<boolean>;
  kuecheTuerAutoUp: StoreValue<boolean>;
  kuecheFensterAutoUp: StoreValue<boolean>;
  kuecheTuerAutoUpTime: StoreValue<number>;
  kuecheFensterAutoUpTime: StoreValue<number>;
  kuecheTuerDelay: StoreValue<number>;
  kuecheFensterDelay: StoreValue<number>;
  kuecheTuerPosition: StoreValue<number>;
  kuecheFensterPosition: StoreValue<number>;

  esszimmerLinksAuto: StoreValue<boolean>;
  esszimmerLinksAutoUp: StoreValue<boolean>;
  esszimmerLinksAutoUpTime: StoreValue<number>;
  esszimmerLinksDelay: StoreValue<number>;
  esszimmerLinksPosition: StoreValue<number>;

  kinderzimmerFensterAuto: StoreValue<boolean>;
  kinderzimmerFensterAutoUp: StoreValue<boolean>;
  kinderzimmerFensterAutoUpTime: StoreValue<number>;
  kinderzimmerFensterDelay: StoreValue<number>;
  kinderzimmerFensterPosition: StoreValue<number>;

  gaestezimmerFensterAuto: StoreValue<boolean>;
  gaestezimmerFensterAutoUp: StoreValue<boolean>;
  gaestezimmerFensterAutoUpTime: StoreValue<number>;
  gaestezimmerFensterDelay: StoreValue<number>;
  gaestezimmerFensterPosition: StoreValue<number>;

  schlafenTuerAuto: StoreValue<boolean>;
  schlafenFensterAuto: StoreValue<boolean>;
  schlafenTuerAutoUp: StoreValue<boolean>;
  schlafenFensterAutoUp: StoreValue<boolean>;
  schlafenTuerAutoUpTime: StoreValue<number>;
  schlafenFensterAutoUpTime: StoreValue<number>;
  schlafenTuerDelay: StoreValue<number>;
  schlafenFensterDelay: StoreValue<number>;
  schlafenTuerPosition: StoreValue<number>;
  schlafenFensterPosition: StoreValue<number>;

  badFensterAuto: StoreValue<boolean>;
  badFensterAutoUp: StoreValue<boolean>;
  badFensterAutoUpTime: StoreValue<number>;
  badFensterDelay: StoreValue<number>;
  badFensterPosition: StoreValue<number>;

  abstellraumOgLinksAuto: StoreValue<boolean>;
  abstellraumOgRechtsAuto: StoreValue<boolean>;
  abstellraumOgLinksAutoUp: StoreValue<boolean>;
  abstellraumOgRechtsAutoUp: StoreValue<boolean>;
  abstellraumOgLinksAutoUpTime: StoreValue<number>;
  abstellraumOgRechtsAutoUpTime: StoreValue<number>;
  abstellraumOgLinksDelay: StoreValue<number>;
  abstellraumOgRechtsDelay: StoreValue<number>;
  abstellraumOgLinksPosition: StoreValue<number>;
  abstellraumOgRechtsPosition: StoreValue<number>;
}

export interface WindowType {
  haustuer: StoreValue<boolean>;
  wohnzimmerEcke: StoreValue<boolean>;
  wohnzimmerMitte: StoreValue<boolean>;
  wohnzimmerLinks: StoreValue<boolean>;
  wohnzimmerRechts: StoreValue<boolean>;
  kuecheTuer: StoreValue<boolean>;
  kuecheFenster: StoreValue<boolean>;
  esszimmerLinks: StoreValue<boolean>;
  esszimmerRechts: StoreValue<boolean>;
  kinderzimmerFenster: StoreValue<boolean>;
  gaestezimmerFenster: StoreValue<boolean>;
  schlafenFenster: StoreValue<boolean>;
  schlafenTuer: StoreValue<boolean>;
  badFenster: StoreValue<boolean>;
  flurLinks: StoreValue<boolean>;
  flurRechts: StoreValue<boolean>;
  gaesteWcLinks: StoreValue<boolean>;
  gaesteWcRechts: StoreValue<boolean>;
  bueroFenster: StoreValue<boolean>;
  abstellraumFenster: StoreValue<boolean>;
  abstellraumOgLinks: StoreValue<boolean>;
  abstellraumOgRechts: StoreValue<boolean>;
  kellerFlurFenster: StoreValue<boolean>;
  kellerTuer: StoreValue<boolean>;
  dachbodenLinks: StoreValue<boolean>;
  dachbodenRechts: StoreValue<boolean>;
}

export interface Pv {
  feedIn: StoreValue<number>;
  batteryCharging: StoreValue<number>;
  shellyFeedOut: StoreValue<number>;
  smallPv: StoreValue<number>;
  activeCharging: StoreValue<number>;
  profit: StoreValue<number>;
  pvGross: StoreValue<number>;
  savedMoney: StoreValue<number>;
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

import { Row } from "@tanstack/vue-table";
import { ApolloQueryResult } from "@apollo/client";
import { FunctionalComponent, HTMLAttributes } from "vue";
import { Badge } from "@/components/shared/badge";

export type DefaultTypes = string | number | boolean | object;
export type CallbackFunktion = (args?: DefaultTypes) => void | DefaultTypes;

export interface TableCellTypes<T, R, C = null, F = null> {
  value?: T;
  row: Row<R>;
  source: string;
  customValue?: C | DefaultTypes;
  callback?: F | CallbackFunktion;
}

export interface TextPositionType {
  position: number;
  text: string;
  id?: string;
}

export interface ProductObjType {
  productId: string;
  description: string;
  amount: number;
  unit: string;
  productPosition: number;
  groupPosition: number;
  id?: string;
  activeUnitId: string;
}

export interface SelectOption {
  value: string;
  label?: string;
  id?: string;
  class?: HTMLAttributes["class"];
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

export interface TableColumnProps<Value, RowType, CustomValue = string> {
  value: Value;
  row: RowType;
  customValue: CustomValue;
  source: string;
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
  link: string;
  externalLink?: boolean;
  badge?: {
    value: number;
    color: Badge["color"];
  };
}
