import { IobrokerStates } from '@/store/iobrokerStore';
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
} export interface Timer3 {
  timer3: Timer;
} export interface Timer4 {
  timer4: Timer;
}
export type KeyOfTimerObject = keyof TimerObject;
export interface Timer {
  string: string;
  device: string;
  timeEnd: string;
  timeStart: string;
  percent: number;
  name: string;
}
export type KeyOfTimer = keyof Timer;

export interface WindowObject {
  name: string;
  shutter: boolean;
  id: string;
  id2?: string;
}
export interface Shutter {
  wohnzimmer: {
    mittig: number;
    ecke: number;
    links: number;
    rechts: number;
  };
  kueche: {
    tuer: number;
    fenster: number;
  };
  esszimmer: {
    fenster: number;
  };
  kinderzimmer: {
    fenster: number;
  };
  schlafen: {
    tuer: number;
  };
}
export interface Window {
  wohnzimmer: {
    mittig: boolean;
    ecke: boolean;
    links: boolean;
    rechts: boolean;
  };
  kueche: {
    tuer: boolean;
    fenster: boolean;
  };
  esszimmer: {
    links: boolean;
    rechts: boolean;
  };
  kinderzimmer: {
    fenster: boolean;
  };
  schlafen: {
    tuer: boolean;
  };
}
export interface Pv {
  feedIn: number;
  batteryCharging: number;
  shellyFeedOut: number;
  smallPv: number;
  activeCharging: number;
  profit: number;
  pvGross: number;
}

export interface IdToSubscribe<TData> {
  value: Ids<TData>[];
  objectNameInStore?: IobrokerStates;
}

export interface Ids<TData> {
  id: string;
  firstKeyInObject?: keyof TData;
  room?: Rooms;
  subKey?: string;
  subKeyAdditive?: SubKeyAdditive;
  saveId?: boolean;
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
type IobrokerStateValue = string | number | boolean;
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
  _object: CalendarObject
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
  value: boolean | number | string;
  type: "string" | "number" | "boolean";
  unit?: string;
}