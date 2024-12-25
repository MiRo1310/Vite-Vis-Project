import { IoBrokerStates, StoreValue } from "@/store/iobrokerStore.ts";

export type IobrokerValues = Record<string, string | number | boolean | object>;

export interface ShoppingList {
  name: string;
  time: string;
  id: string;
  pos: number;
  buttonmove: string;
  buttondelete: string;
}

export interface RowShoppinglist {
  user: string;
  amount: number;
  getValue: (key: string) => any;
}

export interface GlobalObject {
  [key: string]: any;
}

export interface TimerObject extends Timer1, Timer2, Timer3, Timer4 {
}

export interface Timer1 {
  timer1: Timer;
}

export interface Timer2 {
  timer2: Timer;
}

export interface Timer3 {
  timer3: Timer;
}

export interface Timer4 {
  timer4: Timer;
}

export type KeyOfTimerObject = keyof TimerObject;

export interface Timer {
  string: StoreValue<string>;
  device: StoreValue<string>;
  timeEnd: StoreValue<string>;
  timeStart: StoreValue<string>;
  percent: StoreValue<number>;
  name: StoreValue<string>;
}

export type KeyOfTimer = keyof Timer;

export interface WindowObject {
  name: string;
  shutter: boolean;
  id: string;
  id2?: string;
  door?: boolean;
}

export interface Shutter {
  wohnzimmer: {
    mittig: StoreValue<number>;
    ecke: StoreValue<number>;
    links: StoreValue<number>;
    rechts: StoreValue<number>;
  };
  kueche: {
    tuer: StoreValue<number>;
    fenster: StoreValue<number>;
  };
  esszimmer: {
    fenster: StoreValue<number>;
  };
  kinderzimmer: {
    fenster: StoreValue<number>;
  };
  schlafen: {
    tuer: StoreValue<number>;
  };
}

export interface WindowType {
  wohnzimmer: {
    mittig: StoreValue<boolean>;
    ecke: StoreValue<boolean>;
    links: StoreValue<boolean>;
    rechts: StoreValue<boolean>;
  };
  kueche: {
    tuer: StoreValue<boolean>;
    fenster: StoreValue<boolean>;
  };
  esszimmer: {
    links: StoreValue<boolean>;
    rechts: StoreValue<boolean>;
  };
  kinderzimmer: {
    fenster: StoreValue<boolean>;
  };
  schlafen: {
    tuer: StoreValue<boolean>;
  };
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

export interface IdToSubscribe<TData> {
  value: Ids<TData>[];
  objectNameInStore?: IoBrokerStates;

}

export interface Ids<TData> {
  id: string;
  firstKey?: keyof TData;
  room?: Rooms;
  secondKey?: string;
  subKeyAdditive?: SubKeyAdditive;
  saveId?: boolean;
  timestamp?: boolean;
  revertValue?: boolean; // if true, the value(boolean) will be inverted
}

export type SubKeyAdditive = "Auto" | "AutoUp" | "AutoUpTime" | "Delay";

export interface IdsToControl {
  tempSetId: string;
}

export type Rooms =
  | "wohnzimmer"
  | "kueche"
  | "esszimmer"
  | "kinderzimmer"
  | "schlafen"
  | "bad"
  | "flur"
  | "gaesteWC"
  | "buero"
  | "abstellraum"
  | "abstellraumog"
  | "keller"
  | "gaestezimmer"
  | "dachboden"
  | "gaesteWc";

export type Esszimmer = "links" | "rechts";
export type Wohnzimmer = "mittig" | "ecke" | "links" | "rechts";
export type Kinderzimmer = "fenster";
export type Kueche = "tuer" | "fenster";
export type Schlafen = "tuer" | "fenster";
export type Bad = "fenster";
export type Flur = "links" | "rechts";
export type GaesteWC = "links" | "rechts";
export type Buero = "fenster";
export type Abstellraum = "fenster";
export type Abstellraumog = "links" | "rechts";
export type Keller = "fenster" | "tuer";
export type Gaestezimmer = "fenster";
export type Dachboden = "links" | "rechts";

export type NotSubscribedIds = {
  wohnzimmer: { [key in Wohnzimmer]: ShutterPosition };
  kueche: { [key in Kueche]: ShutterPosition };
  esszimmer: { [key in Esszimmer]?: ShutterPosition };
  kinderzimmer: { [key in Kinderzimmer]: ShutterPosition };
  gaestezimmer: { [key in Gaestezimmer]: ShutterPosition };
  schlafen: { [key in Schlafen]: ShutterPosition };
  bad: { [key in Bad]: ShutterPosition };
  abstellraumog: { [key in Abstellraumog]: ShutterPosition };
};

export interface ShutterPosition {
  shutterPosition: string;
}

export interface IobrokerState {
  val: IobrokerStateValue;
  ack: boolean;
  ts: number;
  lc: number;
  from: string;
  q: number;
}

export type IobrokerStateValue = string | number | boolean;
export type NullableState = null | IobrokerStateValue

export interface CalendarDay {
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
  type: string,
  params: [],
  created: string,
  description: string,
  end: string,
  dtstamp: string,
  start: string,
  datetype: string,
  lastmodified: string,
  sequence: number,
  summary: string,
  uid: string,
  "APPLE-CREATOR-IDENTITY": string,
  "APPLE-CREATOR-TEAM-IDENTITY": string
}


export interface Entries {
  title: string;
  value: boolean | number | string | undefined;
  type: "string" | "number" | "boolean";
  unit?: string;
}

export type IobrokerLanguages = "en" | "de" | "ru" | "pt" | "nl" | "fr" | "it" | "es" | "pl" | "uk" | "zh-cn";