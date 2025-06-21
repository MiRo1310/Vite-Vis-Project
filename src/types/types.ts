import { IoBrokerStates, StoreValue } from "@/store/iobrokerStore.ts";

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
  timerAlive: StoreValue<boolean>;
}

export interface Timer1 {
  timer1String: StoreValue<string>;
  timer1Device: StoreValue<string>;
  timer1TimeEnd: StoreValue<string>;
  timer1TimeStart: StoreValue<string>;
  timer1Percent: StoreValue<number>;
  timer1Name: StoreValue<string>;
}

export interface Timer2 {
  timer2String: StoreValue<string>;
  timer2Device: StoreValue<string>;
  timer2TimeEnd: StoreValue<string>;
  timer2TimeStart: StoreValue<string>;
  timer2Percent: StoreValue<number>;
  timer2Name: StoreValue<string>;
}

export interface Timer3 {
  timer3String: StoreValue<string>;
  timer3Device: StoreValue<string>;
  timer3TimeEnd: StoreValue<string>;
  timer3TimeStart: StoreValue<string>;
  timer3Percent: StoreValue<number>;
  timer3Name: StoreValue<string>;
}

export interface Timer4 {
  timer4String: StoreValue<string>;
  timer4Device: StoreValue<string>;
  timer4TimeEnd: StoreValue<string>;
  timer4TimeStart: StoreValue<string>;
  timer4Percent: StoreValue<number>;
  timer4Name: StoreValue<string>;
}

export interface WindowObject {
  name: string;
  shutter: boolean;
  id: keyof WindowType;
  id2?: keyof WindowType;
  door?: boolean;
}

export interface Shutter {
  wohnzimmerMittigAuto: StoreValue<number>;
  wohnzimmerEckeAuto: StoreValue<number>;
  wohnzimmerLinksAuto: StoreValue<number>;
  wohnzimmerRechtsAuto: StoreValue<number>;

  wohnzimmerMittigPosition: StoreValue<number>;
  wohnzimmerEckePosition: StoreValue<number>;
  wohnzimmerLinksPosition: StoreValue<number>;
  wohnzimmerRechtsPosition: StoreValue<number>;

  wohnzimmerMittigAutoUp: StoreValue<number>;
  wohnzimmerEckeAutoUp: StoreValue<number>;
  wohnzimmerLinksAutoUp: StoreValue<number>;
  wohnzimmerRechtsAutoUp: StoreValue<number>;

  wohnzimmerMittigAutoUpTime: StoreValue<number>;
  wohnzimmerEckeAutoUpTime: StoreValue<number>;
  wohnzimmerLinksAutoUpTime: StoreValue<number>;
  wohnzimmerRechtsAutoUpTime: StoreValue<number>;

  wohnzimmerMittigDelay: StoreValue<number>;
  wohnzimmerEckeDelay: StoreValue<number>;
  wohnzimmerLinksDelay: StoreValue<number>;
  wohnzimmerRechtsDelay: StoreValue<number>;

  kuecheTuerAuto: StoreValue<number>;
  kuecheFensterAuto: StoreValue<number>;
  kuecheTuerAutoUp: StoreValue<number>;
  kuecheFensterAutoUp: StoreValue<number>;
  kuecheTuerAutoUpTime: StoreValue<number>;
  kuecheFensterAutoUpTime: StoreValue<number>;
  kuecheTuerDelay: StoreValue<number>;
  kuecheFensterDelay: StoreValue<number>;
  kuecheTuerPosition: StoreValue<number>;
  kuecheFensterPosition: StoreValue<number>;

  esszimmerLinksAuto: StoreValue<number>;
  esszimmerLinksAutoUp: StoreValue<number>;
  esszimmerLinksAutoUpTime: StoreValue<number>;
  esszimmerLinksDelay: StoreValue<number>;
  esszimmerLinksPosition: StoreValue<number>;

  kinderzimmerFensterAuto: StoreValue<number>;
  kinderzimmerFensterAutoUp: StoreValue<number>;
  kinderzimmerFensterAutoUpTime: StoreValue<number>;
  kinderzimmerFensterDelay: StoreValue<number>;
  kinderzimmerFensterPosition: StoreValue<number>;

  gaestezimmerFensterAuto: StoreValue<number>;
  gaestezimmerFensterAutoUp: StoreValue<number>;
  gaestezimmerFensterAutoUpTime: StoreValue<number>;
  gaestezimmerFensterDelay: StoreValue<number>;
  gaestezimmerFensterPosition: StoreValue<number>;

  schlafenTuerAuto: StoreValue<number>;
  schlafenFensterAuto: StoreValue<number>;
  schlafenTuerAutoUp: StoreValue<number>;
  schlafenFensterAutoUp: StoreValue<number>;
  schlafenTuerAutoUpTime: StoreValue<number>;
  schlafenFensterAutoUpTime: StoreValue<number>;
  schlafenTuerDelay: StoreValue<number>;
  schlafenFensterDelay: StoreValue<number>;
  schlafenTuerPosition: StoreValue<number>;
  schlafenFensterPosition: StoreValue<number>;

  badFensterAuto: StoreValue<number>;
  badFensterAutoUp: StoreValue<number>;
  badFensterAutoUpTime: StoreValue<number>;
  badFensterDelay: StoreValue<number>;
  badFensterPosition: StoreValue<number>;

  abstellraumOgLinksAuto: StoreValue<number>;
  abstellraumOgRechtsAuto: StoreValue<number>;
  abstellraumOgLinksAutoUp: StoreValue<number>;
  abstellraumOgRechtsAutoUp: StoreValue<number>;
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
  wohnzimmerMittig: StoreValue<boolean>;
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

export interface IdToSubscribe<TData> {
  value: Ids<TData>[];
  storeFolder?: IoBrokerStates;
}

export interface Ids<TData> {
  id: string;
  key: keyof TData;
  subFolder?: string;

  subKeyAdditive?: SubKeyAdditive;
  saveId?: boolean;
  timestamp?: boolean;
  invertValue?: boolean; // if true, the value(boolean) will be inverted
}

export type SubKeyAdditive = "Auto" | "AutoUp" | "AutoUpTime" | "Delay";

export interface IdsToControl {
  tempSetId: string;
}

export type Esszimmer = "links" | "rechts";
export type Wohnzimmer = "mittig" | "ecke" | "links" | "rechts";
export type Kinderzimmer = "fenster";
export type Kueche = "tuer" | "fenster";
export type Schlafen = "tuer" | "fenster";
export type Bad = "fenster";
export type Abstellraum = "fenster";
export type Abstellraumog = "links" | "rechts";
export type Gaestezimmer = "fenster";

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
export type NullableState = null | IobrokerStateValue;

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
