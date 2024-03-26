type IobrokerValues = Record<string, string | number | boolean | object>;
interface ShoppingList {
  name: string;
  time: string;
  id: string;
  pos: number;
  buttonmove: string;
  buttondelete: string;
}
interface RowShoppinglist {
  user: string;
  amount: number;
  getValue: (key: string) => any;
}
interface GlobalObject {
  [key: string]: any;
}
interface TimerObject {
  timer1: Timer;
  timer2: Timer;
  timer3: Timer;
  timer4: Timer;
}
type KeyOfTimerObject = keyof TimerObject;
interface Timer {
  string: string;
  device: string;
  timeEnd: string;
  timeStart: string;
  percent: number;
  name: string;
}
type KeyOfTimer = keyof Timer;

interface WindowsObject {
  name: string;
  shutter: boolean;
  id: string;
  id2?: string;
}
interface Rolladen {
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
interface Fenster {
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

interface IdToSubscribe {
  id: string;
  name?: string;
  key?: string;
  subKey?: string;
  saveId?: boolean;
}

type WindowEntryId = "Delay" | "Auto" | "";
interface IdsToControl {
  value: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface PositionChildrensRoom {
  fenster: number;
}
type Rooms =
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
  | "dachboden";

type NotSubscribedIds = {
  // wohnzimmer: { [key in TypeWohnzimmer]: Shutterpoition };
  // kueche: Kueche;
  esszimmer: { [key in Esszimmer]?: Shutterpoition };
  kinderzimmer: { [key in Kinderzimmer]?: Shutterpoition };
  // schlafen: Schlafen;
  // bad: BaseAudioContext;
  // flur: Flur;
  // gaesteWC: GaesteWC;
  // buero: Buero;
  // abstellraum: Abstellraum;
  // abstellraumog: Abstellraumog;
  // keller: Keller;
  // gaestezimmer: Gaestezimmer;
  // dachboden: Dachboden;
};

interface Shutterpoition {
  shutterPosition: string;
}
type Esszimmer = "links" | "rechts";
type Wohnzimmer = "mittig" | "ecke" | "links" | "rechts";
type Kinderzimmer = "fenster";
type Kueche = "tuer" | "fenster";
type Schlafen = "tuer" | "fenster";
type Bad = "fenster";
type Flur = "links" | "rechts";
type GaesteWC = "links" | "rechts";
type Buero = "fenster";
type Abstellraum = "fenster";
type Abstellraumog = "links" | "rechts";
type Keller = "fenster" | "tuer";
type Gaestezimmer = "fenster";
type Dachboden = "links" | "rechts";
