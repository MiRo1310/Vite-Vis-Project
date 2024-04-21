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

interface FensterObject {
  name: string;
  shutter: boolean;
  id: string;
  id2?: string;
}
interface Shutter {
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
interface Window {
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
interface Pv {
  feedIn: number;
  batteryCharging: number;
  shellyFeedOut: number;
  smallPv: number;
  activeCharging: number;
  profit: number;
}

interface IdToSubscribe {
  value: Ids[];
  objectNameInStore?: string;
}

interface Ids {
  id: string;
  firstKeyInObject?: boolean | string;
  room?: Rooms;
  subKey?: string;
  subKeyAdditive?: SubKeyAdditive;
  saveId?: boolean;
}
type SubKeyAdditive = "Auto" | "AutoUp" | "AutoUpTime" | "Delay";

interface IdsToControl {
  value: {
    [key: string]: {
      [key: string]: string;
    };
  };
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
  | "dachboden"
  | "gaesteWc";

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

type NotSubscribedIds = {
  wohnzimmer: { [key in Wohnzimmer]: ShutterPosition };
  kueche: { [key in Kueche]: ShutterPosition };
  esszimmer: { [key in Esszimmer]?: ShutterPosition };
  kinderzimmer: { [key in Kinderzimmer]: ShutterPosition };
  gaestezimmer: { [key in Gaestezimmer]: ShutterPosition };
  schlafen: { [key in Schlafen]: ShutterPosition };
  bad: { [key in Bad]: ShutterPosition };
  abstellraumog: { [key in Abstellraumog]: ShutterPosition };
};

interface ShutterPosition {
  shutterPosition: string;
}
