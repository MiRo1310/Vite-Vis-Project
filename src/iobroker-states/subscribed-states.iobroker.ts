import { StoreValueClass } from "@/store/ioBrokerStore.ts";
import { BaseValue, NumberValue, BooleanValue, StringValue, JsonValue, ValueClassCtor } from "@/store/valueClasses.ts";
import {
  Log,
  WattPilotJson,
  HeatingPumpScriptJson,
  HeatingPumpSilentJSON,
  TrashType,
  UpdatesAsJSON,
  TankerkoenigStation,
  CalendarDayType,
  JSONStyle,
} from "@/types/types.ts";

export type StoreValue<T> = StoreValueClass<T> | undefined;

type Leaf = StoreValue<unknown> | BaseValue<unknown>;
type FlatKeys<T> = {
  [K in keyof T]: T[K] extends Leaf ? K : never;
}[keyof T];

type GroupKeys<T> = {
  [K in keyof T]: T[K] extends Leaf ? never : K;
}[keyof T] &
  string;

type FlatId<T> = {
  id: string;
  group?: undefined;
  key: FlatKeys<T>;
  invertValue?: boolean;
  // Klasse, die beim Eintreffen einer Nachricht statt der generischen StoreValueClass instanziiert wird.
  valueClass?: ValueClassCtor;
};

type GroupedId<T> = {
  [G in GroupKeys<T>]: {
    id: string;
    group: G;
    key: keyof T[G];
    invertValue?: boolean;
    valueClass?: ValueClassCtor;
  };
}[GroupKeys<T>];

type IdForChannel<T> = FlatId<T> | GroupedId<T>;

export type IobrokerSubscription = {
  [C in keyof IobrokerChannels]: {
    channel: C;
    value: IdForChannel<NonNullable<IobrokerChannels[C]>>[];
  };
}[keyof IobrokerChannels];

export interface XiaomiWindowSensor {
  percent: StoreValue<number>;
  available: StoreValue<boolean>;
  voltage: StoreValue<number>;
  ts: StoreValue<number>;
}

export interface HMIPDevice {
  lowBat?: StoreValue<boolean>;
  available: StoreValue<boolean>;
  ts: number;
}

export interface IobrokerChannels {
  trash: {
    json: JsonValue<TrashType[]> | undefined;
  };
  alexaLists: {
    shoppingListActive: StoreValue<string>;
    michaelsTodoList: StoreValue<string>;
  };
  time: {
    sonnenuntergang: StoreValue<boolean>;
  };
  holiday: {
    urlaubAktiv: StoreValue<boolean>;
  };
  windowGlobal: {
    fensterOffen: StoreValue<boolean>;
  };
  landroid: {
    battery: StoreValue<number>;
    totalDistance: StoreValue<number>;
    totalBladeTime: StoreValue<number>;
    status: StoreValue<number>;
    online: StoreValue<boolean>;
    firmware: StoreValue<string>;
    error: StoreValue<number>;
    edgecut: StoreValue<boolean>;
    batteryCharging: StoreValue<boolean>;
  };
  airConditioners: {
    schlafenOnline: StoreValue<boolean>;
    schlafenPower: StoreValue<number>;
    schlafenPowerStatus: StoreValue<boolean>;
    schlafenIsTemp: StoreValue<number>;
    schlafenSetTemp: StoreValue<number>;

    childOnline: StoreValue<boolean>;
    childPowerStatus: StoreValue<boolean>;
    childPower: StoreValue<number>;
    childIsTemp: StoreValue<number>;
    childSetTemp: StoreValue<number>;
  };
  calendar: {
    table: JsonValue<CalendarDayType[]> | undefined;
  };
  energy: {
    Waschmaschine: StoreValue<number>;
    Kuehltruhe: StoreValue<number>;
    Rack: StoreValue<number>;
    energyReceived: StoreValue<number>;
    energyReturned: StoreValue<number>;
  };
  heating: {
    automatic: StoreValue<boolean>;
    level: StoreValue<boolean>;
    active: StoreValue<boolean>;
    autoSolar: StoreValue<boolean>;
    heatingTemperature: StoreValue<number>;
    heatingBuffer: StoreValue<number>;
    heatingBufferMiddle: StoreValue<number>;
    heatingBufferTop: StoreValue<number>;
    heatingSolar: StoreValue<number>;
    solarMaxToday: StoreValue<number>;
    solarMax: StoreValue<number>;
    pelletExist: StoreValue<boolean>;
    watcherAdmitter: StoreValue<boolean>;
    tempPelletBuffer: StoreValue<boolean>;
    confirmMessage: StoreValue<boolean>;
    snail: StoreValue<boolean>;
    spiral: StoreValue<boolean>;
    maxTimeToFill: StoreValue<number>;
    offsetFilling: StoreValue<number>;
    tempPumpOn: StoreValue<number>;
    tempPumpOff: StoreValue<number>;
    diffSolarBuffer: StoreValue<number>;
    minFillTemp: StoreValue<number>;
    maxFillTemp: StoreValue<number>;
    solarPump: StoreValue<boolean>;
    heatingPump: StoreValue<boolean>;
  };
  heatingControl: {
    "Mon.0.Temp": StoreValue<number>;
    "Mon.1.Temp": StoreValue<number>;
    "Mon.2.Temp": StoreValue<number>;
    "Mon.3.Temp": StoreValue<number>;
    "Mon.4.Temp": StoreValue<number>;
    "Mon.5.Temp": StoreValue<number>;
    "Tue.0.Temp": StoreValue<number>;
    "Tue.1.Temp": StoreValue<number>;
    "Tue.2.Temp": StoreValue<number>;
    "Tue.3.Temp": StoreValue<number>;
    "Tue.4.Temp": StoreValue<number>;
    "Tue.5.Temp": StoreValue<number>;
    "Wed.0.Temp": StoreValue<number>;
    "Wed.1.Temp": StoreValue<number>;
    "Wed.2.Temp": StoreValue<number>;
    "Wed.3.Temp": StoreValue<number>;
    "Wed.4.Temp": StoreValue<number>;
    "Wed.5.Temp": StoreValue<number>;
    "Thu.0.Temp": StoreValue<number>;
    "Thu.1.Temp": StoreValue<number>;
    "Thu.2.Temp": StoreValue<number>;
    "Thu.3.Temp": StoreValue<number>;
    "Thu.4.Temp": StoreValue<number>;
    "Thu.5.Temp": StoreValue<number>;
    "Fri.0.Temp": StoreValue<number>;
    "Fri.1.Temp": StoreValue<number>;
    "Fri.2.Temp": StoreValue<number>;
    "Fri.3.Temp": StoreValue<number>;
    "Fri.4.Temp": StoreValue<number>;
    "Fri.5.Temp": StoreValue<number>;
    "Sat.0.Temp": StoreValue<number>;
    "Sat.1.Temp": StoreValue<number>;
    "Sat.2.Temp": StoreValue<number>;
    "Sat.3.Temp": StoreValue<number>;
    "Sat.4.Temp": StoreValue<number>;
    "Sat.5.Temp": StoreValue<number>;
    "Sun.0.Temp": StoreValue<number>;
    "Sun.1.Temp": StoreValue<number>;
    "Sun.2.Temp": StoreValue<number>;
    "Sun.3.Temp": StoreValue<number>;
    "Sun.4.Temp": StoreValue<number>;
    "Sun.5.Temp": StoreValue<number>;

    "Mon.0.Time": StoreValue<string>;
    "Mon.1.Time": StoreValue<string>;
    "Mon.2.Time": StoreValue<string>;
    "Mon.3.Time": StoreValue<string>;
    "Mon.4.Time": StoreValue<string>;
    "Mon.5.Time": StoreValue<string>;
    "Tue.0.Time": StoreValue<string>;
    "Tue.1.Time": StoreValue<string>;
    "Tue.2.Time": StoreValue<string>;
    "Tue.3.Time": StoreValue<string>;
    "Tue.4.Time": StoreValue<string>;
    "Tue.5.Time": StoreValue<string>;
    "Wed.0.Time": StoreValue<string>;
    "Wed.1.Time": StoreValue<string>;
    "Wed.2.Time": StoreValue<string>;
    "Wed.3.Time": StoreValue<string>;
    "Wed.4.Time": StoreValue<string>;
    "Wed.5.Time": StoreValue<string>;
    "Thu.0.Time": StoreValue<string>;
    "Thu.1.Time": StoreValue<string>;
    "Thu.2.Time": StoreValue<string>;
    "Thu.3.Time": StoreValue<string>;
    "Thu.4.Time": StoreValue<string>;
    "Thu.5.Time": StoreValue<string>;
    "Fri.0.Time": StoreValue<string>;
    "Fri.1.Time": StoreValue<string>;
    "Fri.2.Time": StoreValue<string>;
    "Fri.3.Time": StoreValue<string>;
    "Fri.4.Time": StoreValue<string>;
    "Fri.5.Time": StoreValue<string>;
    "Sat.0.Time": StoreValue<string>;
    "Sat.1.Time": StoreValue<string>;
    "Sat.2.Time": StoreValue<string>;
    "Sat.3.Time": StoreValue<string>;
    "Sat.4.Time": StoreValue<string>;
    "Sat.5.Time": StoreValue<string>;
    "Sun.0.Time": StoreValue<string>;
    "Sun.1.Time": StoreValue<string>;
    "Sun.2.Time": StoreValue<string>;
    "Sun.3.Time": StoreValue<string>;
    "Sun.4.Time": StoreValue<string>;
    "Sun.5.Time": StoreValue<string>;

    profile: StoreValue<number>;
    room: StoreValue<number>;
    profileText: StoreValue<string>;
    profileValue: StoreValue<string>;
    usedRoom: StoreValue<string>;
    //HeatingControlConfig
    periodActive: StoreValue<boolean>;
    publicHoliday: StoreValue<boolean>;
    present: StoreValue<boolean>;
    partyNow: StoreValue<boolean>;
    guestsPresent: StoreValue<boolean>;
    holidayPresent: StoreValue<boolean>;
    vacationAbsent: StoreValue<boolean>;

    guestIncrease: StoreValue<number>;
    partyDecrease: StoreValue<number>;
    absentDecrease: StoreValue<number>;
    vacationAbsentDecrease: StoreValue<number>;
    windowOpenDecrease: StoreValue<number>;
    temperatureOverrideTemp: StoreValue<number>;
    temperatureOverrideTime: StoreValue<number>;
    minimumTemperature: StoreValue<number>;
    //Window Status
    openWindowCount: StoreValue<number>;
    windowOpenHtmlTable: StoreValue<string>;

    statusRoom: StoreValue<string>;
    sollTemp1: StoreValue<number>;
    sollTemp2: StoreValue<number>;
    tempRegler1: StoreValue<number>;
    tempRegler2: StoreValue<number>;
    ventil1: StoreValue<number>;
    ventil2: StoreValue<number>;
    tempSensor: StoreValue<number>;
    roomState: StoreValue<string>;
    visRoomStates: StoreValue<string>;

    timeSlotBad: StoreValue<number>;
  };
  hmip: {
    children_valvePosition: StoreValue<number>;
    children_valveActualTemp: StoreValue<number>;

    floor_valvePosition: StoreValue<number>;
    floor_valveActualTemp: StoreValue<number>;

    living_right_valvePosition: StoreValue<number>;
    living_right_valveActualTemp: StoreValue<number>;

    living_left_valvePosition: StoreValue<number>;
    living_left_valveActualTemp: StoreValue<number>;

    kitchen_valvePosition: StoreValue<number>;
    kitchen_valveActualTemp: StoreValue<number>;

    guest_wc_valvePosition: StoreValue<number>;
    guest_wc_valveActualTemp: StoreValue<number>;

    bath_valvePosition: StoreValue<number>;
    bath_valveActualTemp: StoreValue<number>;

    sleeping_valvePosition: StoreValue<number>;
    sleeping_valveActualTemp: StoreValue<number>;

    dining_valvePosition: StoreValue<number>;
    dining_valveActualTemp: StoreValue<number>;

    washing_valvePosition: StoreValue<number>;
    washing_valveActualTemp: StoreValue<number>;

    guest_valvePosition: StoreValue<number>;
    guest_valveActualTemp: StoreValue<number>;

    office_valvePosition: StoreValue<number>;
    office_valveActualTemp: StoreValue<number>;
  };
  infos: {
    updatesJson: JsonValue<UpdatesAsJSON> | undefined;
    updatesNumber: StoreValue<number>;
    newsFeeds: StoreValue<string>;
    lastUpdateCheck: StoreValue<string>;
  };
  logs: {
    error: JsonValue<Log[]> | undefined;
    warning: JsonValue<Log[]> | undefined;
    info: JsonValue<Log[]> | undefined;
    heatPump: JsonValue<Log[]> | undefined;
  };
  lights: {
    Wohnzimmer: StoreValue<boolean>;
    Weihnachtsbaum: StoreValue<boolean>;
    Buero_Schreibtisch: StoreValue<boolean>;
    Buero: StoreValue<boolean>;
    Dachboden: StoreValue<boolean>;
    Abstellraum_OG: StoreValue<boolean>;
    Wohnzimmer_Ecklampe: StoreValue<boolean>;
  };

  lightsAdditive: {
    Wohnzimmer_Ecklampe: StoreValue<boolean>;
  };

  phone: {
    ringing: StoreValue<boolean>;
    lastCallTimestamp: StoreValue<string>;
    lastCallerName: StoreValue<string>;
    lastCaller: StoreValue<string>;
    lastDuration: StoreValue<string>;
    caller: StoreValue<string>;
    callerName: StoreValue<string>;
    callerTimestamp: StoreValue<string>;
  };
  pool: {
    heaterState: StoreValue<boolean>;
    heaterOnline: StoreValue<boolean>;
    tempSet: StoreValue<number>;
    consumption: StoreValue<number>;
    tempIn: StoreValue<number>;
    tempOut: StoreValue<number>;
    rotor: StoreValue<number>;
    mode: StoreValue<number>;
    status: StoreValue<boolean>;
    poolPumpPower: StoreValue<number>;
    poolPumpSwitch: StoreValue<boolean>;
    silent: StoreValue<boolean>;
    heaterScriptActivateJSON: JsonValue<HeatingPumpScriptJson> | undefined;
    heaterSilentScriptJSON: JsonValue<HeatingPumpSilentJSON> | undefined;
  };
  position: {
    michaelCoordinates: StoreValue<string>;
  };
  wattPilot: {
    jsonScriptChargeLevel: JsonValue<WattPilotJson> | undefined;
    autoCharging: StoreValue<boolean>;
    totalCharging: StoreValue<number>;
  };
  pv: {
    feedIn: StoreValue<number>;
    batteryCharging: StoreValue<number>;
    shellyFeedOut: StoreValue<number>;
    smallPv: StoreValue<number>;
    activeCharging: StoreValue<number>;
    profit: StoreValue<number>;
    pvGross: StoreValue<number>;
    savedMoney: StoreValue<number>;
    energyDayGross: StoreValue<number>;
    energyDaySmall: StoreValue<number>;
  };
  styles: {
    calendarStyle: JsonValue<JSONStyle[]> | undefined;
  };
  fenster: {
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
  };
  tankerKoenig: {
    cheapestName: StoreValue<string>;
    cheapestFullStreet: StoreValue<string>;
    cheapestPrice: StoreValue<number>;
    jsonTable: JsonValue<TankerkoenigStation[]> | undefined;
  };
  logReset: {
    error: StoreValue<boolean>;
    warn: StoreValue<boolean>;
    info: StoreValue<boolean>;
  };
  heatingTimeSlot: {
    currentTimePeriod: StoreValue<number>;
  };
  alexaAction: {
    alexaSpeak: StoreValue<string>;
  };
  timers: {
    timerAlive: StoreValue<boolean>;
    "1": {
      timeString: StoreValue<string>;
      device: StoreValue<string>;
      timeEnd: StoreValue<string>;
      timeStart: StoreValue<string>;
      percent: StoreValue<number>;
      name: StoreValue<string>;
      initialTimer: StoreValue<string>;
    };
    "2": {
      timeString: StoreValue<string>;
      device: StoreValue<string>;
      timeEnd: StoreValue<string>;
      timeStart: StoreValue<string>;
      percent: StoreValue<number>;
      name: StoreValue<string>;
      initialTimer: StoreValue<string>;
    };
    "3": {
      timeString: StoreValue<string>;
      device: StoreValue<string>;
      timeEnd: StoreValue<string>;
      timeStart: StoreValue<string>;
      percent: StoreValue<number>;
      name: StoreValue<string>;
      initialTimer: StoreValue<string>;
    };
    "4": {
      timeString: StoreValue<string>;
      device: StoreValue<string>;
      timeEnd: StoreValue<string>;
      timeStart: StoreValue<string>;
      percent: StoreValue<number>;
      name: StoreValue<string>;
      initialTimer: StoreValue<string>;
    };
  };
  rolladen: {
    wohnzimmerMittePosition: StoreValue<number>;
    wohnzimmerEckePosition: StoreValue<number>;
    wohnzimmerLinksPosition: StoreValue<number>;
    wohnzimmerRechtsPosition: StoreValue<number>;
    kuecheTuerPosition: StoreValue<number>;
    kuecheFensterPosition: StoreValue<number>;
    kinderzimmerFensterPosition: StoreValue<number>;
    gaestezimmerFensterPosition: StoreValue<number>;
    schlafenTuerPosition: StoreValue<number>;
    schlafenFensterPosition: StoreValue<number>;
    badFensterPosition: StoreValue<number>;
    abstellraumOgLinksPosition: StoreValue<number>;
    abstellraumOgRechtsPosition: StoreValue<number>;
    esszimmerLinksPosition: StoreValue<number>;
  };
  shutterAutoUp: {
    abstellraumOgLinksAutoUp: StoreValue<boolean>;
    abstellraumOgRechtsAutoUp: StoreValue<boolean>;
    abstellraumOgLinksAutoUpTime: StoreValue<number>;
    abstellraumOgRechtsAutoUpTime: StoreValue<number>;

    badFensterAutoUp: StoreValue<boolean>;
    badFensterAutoUpTime: StoreValue<number>;
    schlafenTuerAutoUp: StoreValue<boolean>;
    schlafenFensterAutoUp: StoreValue<boolean>;
    schlafenTuerAutoUpTime: StoreValue<number>;
    schlafenFensterAutoUpTime: StoreValue<number>;
    gaestezimmerFensterAutoUp: StoreValue<boolean>;
    gaestezimmerFensterAutoUpTime: StoreValue<number>;
    esszimmerLinksAutoUp: StoreValue<boolean>;
    esszimmerLinksAutoUpTime: StoreValue<number>;
    kuecheTuerAutoUp: StoreValue<boolean>;
    kuecheFensterAutoUp: StoreValue<boolean>;
    kuecheTuerAutoUpTime: StoreValue<number>;
    kuecheFensterAutoUpTime: StoreValue<number>;
    kinderzimmerFensterAutoUp: StoreValue<boolean>;
    kinderzimmerFensterAutoUpTime: StoreValue<number>;
    wohnzimmerMitteAutoUp: StoreValue<boolean>;
    wohnzimmerEckeAutoUp: StoreValue<boolean>;
    wohnzimmerLinksAutoUp: StoreValue<boolean>;
    wohnzimmerRechtsAutoUp: StoreValue<boolean>;
    wohnzimmerMitteAutoUpTime: StoreValue<number>;
    wohnzimmerEckeAutoUpTime: StoreValue<number>;
    wohnzimmerLinksAutoUpTime: StoreValue<number>;
    wohnzimmerRechtsAutoUpTime: StoreValue<number>;
  };
  shutterAutoDownTime: {
    wohnzimmerMitteDelay: StoreValue<number>;
    wohnzimmerEckeDelay: StoreValue<number>;
    wohnzimmerLinksDelay: StoreValue<number>;
    wohnzimmerRechtsDelay: StoreValue<number>;
    kuecheFensterDelay: StoreValue<number>;
    kuecheTuerDelay: StoreValue<number>;
    esszimmerLinksDelay: StoreValue<number>;
    kinderzimmerFensterDelay: StoreValue<number>;
    gaestezimmerFensterDelay: StoreValue<number>;
    schlafenTuerDelay: StoreValue<number>;
    schlafenFensterDelay: StoreValue<number>;
    badFensterDelay: StoreValue<number>;
    abstellraumOgLinksDelay: StoreValue<number>;
    abstellraumOgRechtsDelay: StoreValue<number>;
    wohnzimmerMitteAuto: StoreValue<boolean>;
    wohnzimmerEckeAuto: StoreValue<boolean>;
    wohnzimmerLinksAuto: StoreValue<boolean>;
    wohnzimmerRechtsAuto: StoreValue<boolean>;
    kuecheTuerAuto: StoreValue<boolean>;
    kuecheFensterAuto: StoreValue<boolean>;
    esszimmerLinksAuto: StoreValue<boolean>;
    kinderzimmerFensterAuto: StoreValue<boolean>;
    gaestezimmerFensterAuto: StoreValue<boolean>;
    schlafenTuerAuto: StoreValue<boolean>;
    schlafenFensterAuto: StoreValue<boolean>;
    badFensterAuto: StoreValue<boolean>;
    abstellraumOgLinksAuto: StoreValue<boolean>;
    abstellraumOgRechtsAuto: StoreValue<boolean>;
  };
  batteries: {
    "Shelly Plus Smoke Flur OG": {
      percent: StoreValue<number>;
      firmware: StoreValue<boolean>;
      voltage: StoreValue<number>;
      ts: StoreValue<number>;
    };
    "HMIP Flur": {
      lowBat?: StoreValue<boolean>;
      available: StoreValue<boolean>;
      ts: StoreValue<number>;
    };
    "HMIP Wohnzimmer links": HMIPDevice;
    "HMIP Wohnzimmer rechts": HMIPDevice;
    "HMIP Kueche": HMIPDevice;
    "HMIP Esszimmer": HMIPDevice;
    "HMIP Bad": HMIPDevice;
    "HMIP Gaeste WC": HMIPDevice;
    "HMIP Keller Waschen": HMIPDevice;
    "HMIP Buero": HMIPDevice;
    "HMIP Schlafzimmer": HMIPDevice;
    "HMIP Kinderzimmer": HMIPDevice;
    "HMIP Gaestezimmer": HMIPDevice;
    xioami_cellar_door: XiaomiWindowSensor;
    xioami_cellar_stair_window: XiaomiWindowSensor;
    xioami_office_window: XiaomiWindowSensor;
    xioami_housedoor_right: XiaomiWindowSensor;
    xioami_floor_right: XiaomiWindowSensor;
    xioami_floor_left: XiaomiWindowSensor;
    xioami_guest_toilet_left: XiaomiWindowSensor;
    xioami_guest_toilet_right: XiaomiWindowSensor;
    xioami_fensterkontakt_kueche_klingel: XiaomiWindowSensor;
    xioami_kitchen_window: XiaomiWindowSensor;
    xioami_kitchen_door: XiaomiWindowSensor;
    xioami_store_window: XiaomiWindowSensor;
    xioami_diner_window_right: XiaomiWindowSensor;
    xioami_diner_window_left: XiaomiWindowSensor;
    xioami_living_right: XiaomiWindowSensor;
    xioami_living_center: XiaomiWindowSensor;
    xioami_living_left: XiaomiWindowSensor;
    xioami_living_small: XiaomiWindowSensor;
    xioami_bath_window: XiaomiWindowSensor;
    xioami_guest_window: XiaomiWindowSensor;
    xioami_sleeping_door: XiaomiWindowSensor;
    xioami_sleeping_window: XiaomiWindowSensor;
    xioami_children_window: XiaomiWindowSensor;
    xioami_store_og_right: XiaomiWindowSensor;
    xioami_store_og_left: XiaomiWindowSensor;
    xioami_attic_right: XiaomiWindowSensor;
    xioami_attic_left: XiaomiWindowSensor;
  };
  system: {
    ramIobrokerUsed: StoreValue<number>;
    ramIobrokerLevel: StoreValue<number>;
    ramIobrokerMax: StoreValue<number>;
    cpuIobroker: StoreValue<number>;
    cpusIobroker: StoreValue<number>;
    diskIobrokerUsage: StoreValue<number>;
    iobrokerUptime: StoreValue<number>;
  };
  car: {
    battery: StoreValue<number>;
  };
}

const heatingControl: Extract<IobrokerSubscription, { channel: "heatingControl" }> = {
  channel: "heatingControl",
  value: [
    { id: "heatingcontrol.0.CurrentProfile", key: "profile", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.ChoosenRoom", key: "room", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.ProfileValueListText", key: "profileText", valueClass: StringValue },
    { id: "heatingcontrol.0.vis.ProfileValueListValue", key: "profileValue", valueClass: StringValue },
    { id: "heatingcontrol.0.info.UsedRooms", key: "usedRoom", valueClass: StringValue },
    { id: "heatingcontrol.0.HeatingPeriodActive", key: "periodActive", valueClass: BooleanValue },
    { id: "heatingcontrol.0.PublicHolidyToday", key: "publicHoliday", valueClass: BooleanValue },
    { id: "heatingcontrol.0.Present", key: "present", valueClass: BooleanValue },
    { id: "heatingcontrol.0.PartyNow", key: "partyNow", valueClass: BooleanValue },
    { id: "heatingcontrol.0.GuestsPresent", key: "guestsPresent", valueClass: BooleanValue },
    { id: "heatingcontrol.0.HolidayPresent", key: "holidayPresent", valueClass: BooleanValue },
    { id: "heatingcontrol.0.VacationAbsent", key: "vacationAbsent", valueClass: BooleanValue },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.GuestIncrease", key: "guestIncrease", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.PartyDecrease", key: "partyDecrease", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.AbsentDecrease", key: "absentDecrease", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.VacationAbsentDecrease", key: "vacationAbsentDecrease", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.WindowOpenDecrease", key: "windowOpenDecrease", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.RoomValues.TemperaturOverride", key: "temperatureOverrideTemp", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.RoomValues.TemperaturOverrideTime", key: "temperatureOverrideTime", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.RoomValues.MinimumTemperature", key: "minimumTemperature", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.OpenWindowRoomCount", key: "openWindowCount", valueClass: NumberValue },
    { id: "heatingcontrol.0.vis.WindowStatesHtmlTable", key: "windowOpenHtmlTable", valueClass: StringValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Status_Zimmer_state", key: "statusRoom", valueClass: StringValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Soll_Temp", key: "sollTemp1", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Soll_Temp_2", key: "sollTemp2", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Regler", key: "tempRegler1", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Regler_2", key: "tempRegler2", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Ventilstellung", key: "ventil1", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Ventilstellung_2", key: "ventil2", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Raumsensor", key: "tempSensor", valueClass: NumberValue },
    { id: "0_userdata.0.Heizung.heatingcontrol.Room_State", key: "roomState", valueClass: StringValue },
    { id: "heatingcontrol.0.vis.RoomStatesHtmlTable", key: "visRoomStates", valueClass: StringValue },
    { id: "heatingcontrol.0.Rooms.Bad.ActiveTimeSlot", key: "timeSlotBad", valueClass: NumberValue },
  ],
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

addItems();

function addItems() {
  for (const day of days) {
    for (let period = 1; period < 6; period++) {
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.Temperature`,
        key: `${day}.${period}.temp` as keyof IobrokerChannels["heatingControl"],
        valueClass: NumberValue,
      });
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.time`,
        key: `${day}.${period}.time` as keyof IobrokerChannels["heatingControl"],
        valueClass: StringValue,
      });
    }
  }
}

export function createEmptyIobrokerSkeleton(data: readonly IobrokerSubscription[]): IobrokerChannels {
  const result: Record<string, Record<string, unknown>> = {};

  for (const entry of data) {
    const channel = (result[entry.channel] ??= {});

    for (const item of entry.value) {
      if (item.group) {
        channel[item.group] ??= {};
      }
      // Leaf-Werte bleiben absichtlich undefined, bis die erste ioBroker-Nachricht ankommt.
    }
  }

  return result as unknown as IobrokerChannels;
}

export const iobrokerData = [
  { ...heatingControl },
  {
    channel: "wattPilot",
    value: [
      { key: "jsonScriptChargeLevel", id: "0_userdata.0.Wattpilot.WattpilotScriptJson", valueClass: JsonValue },
      { key: "autoCharging", id: "0_userdata.0.Wattpilot.autoCharging", valueClass: BooleanValue },
      { key: "totalCharging", id: "fronius-wattpilot.0.energyCounterTotal", valueClass: NumberValue },
    ],
  },
  {
    channel: "car",
    value: [
      { key: "battery", id: "bluelink.0.KNAFD81A7T6159455.vehicleStatusRaw.Green.BatteryManagement.BatteryRemain.Ratio", valueClass: NumberValue },
    ],
  },
  {
    channel: "system",
    value: [
      { key: "ramIobrokerUsed", id: "proxmox.0.lxc.iobroker.mem", valueClass: NumberValue },
      { key: "ramIobrokerLevel", id: "proxmox.0.lxc.iobroker.mem_lev", valueClass: NumberValue },
      { key: "ramIobrokerMax", id: "proxmox.0.lxc.iobroker.maxmem", valueClass: NumberValue },
      { key: "cpuIobroker", id: "proxmox.0.lxc.iobroker.cpu", valueClass: NumberValue },
      { key: "cpusIobroker", id: "proxmox.0.lxc.iobroker.cpus", valueClass: NumberValue },
      { key: "diskIobrokerUsage", id: "proxmox.0.lxc.iobroker.disk_lev", valueClass: NumberValue },
      { key: "iobrokerUptime", id: "proxmox.0.lxc.iobroker.uptime", valueClass: NumberValue },
    ],
  },
  {
    channel: "batteries",
    value: [
      {
        id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryVoltage",
        group: "Shelly Plus Smoke Flur OG",
        key: "voltage",
        valueClass: NumberValue,
      },
      {
        id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent",
        group: "Shelly Plus Smoke Flur OG",
        key: "percent",
        valueClass: NumberValue,
      },
      { id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware", group: "Shelly Plus Smoke Flur OG", key: "firmware", valueClass: BooleanValue },
      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.0.lowBat", group: "HMIP Buero", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55C45.channels.0.unreach",
        group: "HMIP Buero",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.0.lowBat", group: "HMIP Keller Waschen", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.0.unreach",
        group: "HMIP Keller Waschen",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.lowBat", group: "HMIP Flur", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.unreach",
        group: "HMIP Flur",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.lowBat", group: "HMIP Gaeste WC", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.unreach",
        group: "HMIP Gaeste WC",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.0.lowBat", group: "HMIP Kueche", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A499E49C4.channels.0.unreach",
        group: "HMIP Kueche",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.0.lowBat", group: "HMIP Esszimmer", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.0.unreach",
        group: "HMIP Esszimmer",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.0.lowBat", group: "HMIP Wohnzimmer links", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A499E3491.channels.0.unreach",
        group: "HMIP Wohnzimmer links",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.0.lowBat", group: "HMIP Wohnzimmer rechts", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55C21.channels.0.unreach",
        group: "HMIP Wohnzimmer rechts",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.lowBat", group: "HMIP Bad", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.unreach",
        group: "HMIP Bad",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.0.lowBat", group: "HMIP Schlafzimmer", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.0.unreach",
        group: "HMIP Schlafzimmer",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.0.lowBat", group: "HMIP Kinderzimmer", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.0.unreach",
        group: "HMIP Kinderzimmer",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.0.lowBat", group: "HMIP Gaestezimmer", key: "lowBat", valueClass: BooleanValue },
      {
        id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.0.unreach",
        group: "HMIP Gaestezimmer",
        invertValue: true,
        key: "available",
        valueClass: BooleanValue,
      },
      { id: "zigbee.0.00158d00045efc35.battery", group: "xioami_cellar_door", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00045efc35.voltage", group: "xioami_cellar_door", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00045efc35.available", group: "xioami_cellar_door", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0002e3425d.battery", group: "xioami_cellar_stair_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002e3425d.voltage", group: "xioami_cellar_stair_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002e3425d.available", group: "xioami_cellar_stair_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0003cb431e.battery", group: "xioami_office_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0003cb431e.voltage", group: "xioami_office_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0003cb431e.available", group: "xioami_office_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00049fd9ee.battery", group: "xioami_housedoor_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00049fd9ee.voltage", group: "xioami_housedoor_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00049fd9ee.available", group: "xioami_housedoor_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d000477309a.battery", group: "xioami_floor_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d000477309a.voltage", group: "xioami_floor_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d000477309a.available", group: "xioami_floor_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047e796c.battery", group: "xioami_floor_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047e796c.voltage", group: "xioami_floor_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047e796c.available", group: "xioami_floor_left", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047e7a16.battery", group: "xioami_guest_toilet_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047e7a16.voltage", group: "xioami_guest_toilet_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047e7a16.available", group: "xioami_guest_toilet_left", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004a03d10.battery", group: "xioami_guest_toilet_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a03d10.voltage", group: "xioami_guest_toilet_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a03d10.available", group: "xioami_guest_toilet_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0002ec5554.battery", group: "xioami_fensterkontakt_kueche_klingel", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002ec5554.voltage", group: "xioami_fensterkontakt_kueche_klingel", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002ec5554.available", group: "xioami_fensterkontakt_kueche_klingel", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d000431445a.battery", group: "xioami_kitchen_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d000431445a.voltage", group: "xioami_kitchen_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d000431445a.available", group: "xioami_kitchen_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047d0bcc.battery", group: "xioami_kitchen_door", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0bcc.voltage", group: "xioami_kitchen_door", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0bcc.available", group: "xioami_kitchen_door", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004773713.battery", group: "xioami_store_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004773713.voltage", group: "xioami_store_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004773713.available", group: "xioami_store_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0002e3376c.battery", group: "xioami_diner_window_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002e3376c.voltage", group: "xioami_diner_window_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0002e3376c.available", group: "xioami_diner_window_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d000477238b.battery", group: "xioami_diner_window_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d000477238b.voltage", group: "xioami_diner_window_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d000477238b.available", group: "xioami_diner_window_left", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047c617c.battery", group: "xioami_living_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047c617c.voltage", group: "xioami_living_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047c617c.available", group: "xioami_living_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047ebffb.battery", group: "xioami_living_center", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047ebffb.voltage", group: "xioami_living_center", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047ebffb.available", group: "xioami_living_center", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047d480e.battery", group: "xioami_living_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d480e.voltage", group: "xioami_living_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d480e.available", group: "xioami_living_left", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004a02290.battery", group: "xioami_living_small", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a02290.voltage", group: "xioami_living_small", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a02290.available", group: "xioami_living_small", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047d0d78.battery", group: "xioami_bath_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0d78.voltage", group: "xioami_bath_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0d78.available", group: "xioami_bath_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004772546.battery", group: "xioami_guest_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004772546.voltage", group: "xioami_guest_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004772546.available", group: "xioami_guest_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004522184.battery", group: "xioami_sleeping_door", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004522184.voltage", group: "xioami_sleeping_door", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004522184.available", group: "xioami_sleeping_door", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004a027ee.battery", group: "xioami_sleeping_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a027ee.voltage", group: "xioami_sleeping_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a027ee.available", group: "xioami_sleeping_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004a0224b.battery", group: "xioami_children_window", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a0224b.voltage", group: "xioami_children_window", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a0224b.available", group: "xioami_children_window", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004a0234e.battery", group: "xioami_store_og_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a0234e.voltage", group: "xioami_store_og_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004a0234e.available", group: "xioami_store_og_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004772531.battery", group: "xioami_store_og_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004772531.voltage", group: "xioami_store_og_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004772531.available", group: "xioami_store_og_left", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0004314104.battery", group: "xioami_attic_right", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004314104.voltage", group: "xioami_attic_right", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d0004314104.available", group: "xioami_attic_right", key: "available", valueClass: BooleanValue },
      { id: "zigbee.0.00158d00047d0db9.battery", group: "xioami_attic_left", key: "percent", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0db9.voltage", group: "xioami_attic_left", key: "voltage", valueClass: NumberValue },
      { id: "zigbee.0.00158d00047d0db9.available", group: "xioami_attic_left", key: "available", valueClass: BooleanValue },
    ],
  },
  {
    // Zeitversatz Rolladen Auto herunter fahren
    channel: "shutterAutoDownTime",
    value: [
      { id: "0_userdata.0.Rolladen.Esszimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "esszimmerLinksDelay", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "kuecheFensterDelay", valueClass: NumberValue },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang_Tür",
        key: "schlafenTuerDelay",
        valueClass: NumberValue,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        key: "schlafenFensterDelay",
        valueClass: NumberValue,
      },
      {
        id: "0_userdata.0.Rolladen.Kinderzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        key: "kinderzimmerFensterDelay",
        valueClass: NumberValue,
      },
      { id: "0_userdata.0.Rolladen.Bad.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "badFensterDelay", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerEckeDelay", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerLinksDelay", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerMitteDelay", valueClass: NumberValue },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        key: "wohnzimmerRechtsDelay",
        valueClass: NumberValue,
      },
      { id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(Tür)", key: "kuecheTuerDelay", valueClass: NumberValue },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(links)",
        key: "abstellraumOgLinksDelay",
        valueClass: NumberValue,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(rechts)",
        key: "abstellraumOgRechtsDelay",
        valueClass: NumberValue,
      },
      {
        id: "0_userdata.0.Rolladen.Gästezimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        key: "gaestezimmerFensterDelay",
        valueClass: NumberValue,
      },
      { id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung", key: "esszimmerLinksAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_runter", key: "gaestezimmerFensterAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung", key: "kuecheFensterAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung", key: "schlafenTuerAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rollade_Fenster_Zeitsteuerung", key: "schlafenFensterAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter", key: "kinderzimmerFensterAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung", key: "badFensterAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerEckeAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerLinksAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerMitteAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerRechtsAuto", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung", key: "kuecheTuerAuto", valueClass: BooleanValue },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv",
        key: "abstellraumOgLinksAuto",
        valueClass: BooleanValue,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv",
        key: "abstellraumOgRechtsAuto",
        valueClass: BooleanValue,
      },
    ],
  },
  {
    // Zeit Auto hochfahren Rolladen
    channel: "shutterAutoUp",
    value: [
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerEckeAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerLinksAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerMitteAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerRechtsAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch_Tür", key: "schlafenTuerAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch", key: "schlafenFensterAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Fenster", key: "kuecheFensterAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Tür", key: "kuecheTuerAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Zeit_Rollade_hoch", key: "kinderzimmerFensterAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Esszimmer.Zeit_Rollade_hoch", key: "esszimmerLinksAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Bad.Zeit_Rollade_hoch", key: "badFensterAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_rechts", key: "abstellraumOgRechtsAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_links", key: "abstellraumOgLinksAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Zeit_Rollade_hoch", key: "gaestezimmerFensterAutoUpTime", valueClass: NumberValue },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_links", key: "abstellraumOgLinksAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_rechts", key: "abstellraumOgRechtsAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Bad.Rollade_Auto_hoch", key: "badFensterAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Esszimmer.Rollade_Auto_hoch", key: "esszimmerLinksAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_hoch", key: "gaestezimmerFensterAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_auto_hoch", key: "kinderzimmerFensterAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_Tür", key: "kuecheTuerAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_fenster", key: "kuecheFensterAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_fenster", key: "schlafenFensterAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_tuer", key: "schlafenTuerAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerEckeAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerLinksAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerMitteAutoUp", valueClass: BooleanValue },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerRechtsAutoUp", valueClass: BooleanValue },
    ],
  },
  {
    channel: "rolladen",
    value: [
      { id: "s7.1.DBs.DB1.B150", key: "wohnzimmerMittePosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B152", key: "wohnzimmerEckePosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B159", key: "wohnzimmerLinksPosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B157", key: "wohnzimmerRechtsPosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B129", key: "kuecheTuerPosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B145", key: "kuecheFensterPosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B136", key: "esszimmerLinksPosition" /*Einfach links für angenommen als Rollade*/, valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B164", key: "kinderzimmerFensterPosition", valueClass: NumberValue },
      { id: "s7.1.DBs.DB1.B169", key: "schlafenTuerPosition", valueClass: NumberValue },
      { id: "s7.2.DBs.DB1.B065", key: "schlafenFensterPosition", valueClass: NumberValue },
      { id: "s7.2.DBs.DB1.B073", key: "abstellraumOgLinksPosition", valueClass: NumberValue },
      { id: "s7.2.DBs.DB1.B057", key: "abstellraumOgRechtsPosition", valueClass: NumberValue },
      { id: "s7.2.DBs.DB1.B078", key: "badFensterPosition", valueClass: NumberValue },
      { id: "s7.2.DBs.DB1.B150", key: "gaestezimmerFensterPosition", valueClass: NumberValue },
    ],
  },
  {
    channel: "timers",
    value: [
      { id: "alexa-timer-vis.0.all_Timer.alive", key: "timerAlive", valueClass: BooleanValue },
      { id: "alexa-timer-vis.0.timer1.string_2", group: "1", key: "timeString", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer1.TimeEnd", group: "1", key: "timeEnd", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer1.TimeStart", group: "1", key: "timeStart", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer1.InputDeviceName", group: "1", key: "device", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer1.name", group: "1", key: "name", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer1.initialTimer", group: "1", key: "initialTimer", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.string_2", group: "2", key: "timeString", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.TimeEnd", group: "2", key: "timeEnd", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.TimeStart", group: "2", key: "timeStart", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.InputDeviceName", group: "2", key: "device", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.name", group: "2", key: "name", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer2.initialTimer", group: "2", key: "initialTimer", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.string_2", group: "3", key: "timeString", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.TimeEnd", group: "3", key: "timeEnd", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.TimeStart", group: "3", key: "timeStart", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.InputDeviceName", group: "3", key: "device", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.name", group: "3", key: "name", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer3.initialTimer", group: "3", key: "initialTimer", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.string_2", group: "4", key: "timeString", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.TimeEnd", group: "4", key: "timeEnd", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.TimeStart", group: "4", key: "timeStart", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.InputDeviceName", group: "4", key: "device", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.name", group: "4", key: "name", valueClass: StringValue },
      { id: "alexa-timer-vis.0.timer4.initialTimer", group: "4", key: "initialTimer", valueClass: StringValue },
    ],
  },
  {
    channel: "tankerKoenig",
    value: [
      { id: "tankerkoenig.0.stations.cheapest.e5.name", key: "cheapestName", valueClass: StringValue },
      { id: "tankerkoenig.0.stations.cheapest.e5.fullStreet", key: "cheapestFullStreet", valueClass: StringValue },
      { id: "tankerkoenig.0.stations.cheapest.e5.feed", key: "cheapestPrice", valueClass: NumberValue },
      { id: "tankerkoenig.0.stations.jsonTable", key: "jsonTable", valueClass: JsonValue },
    ],
  },
  {
    channel: "fenster",
    value: [
      { id: "zigbee.0.00158d00049fd9ee.opened", key: "haustuer", valueClass: BooleanValue },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL", key: "wohnzimmerEcke", valueClass: BooleanValue },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "wohnzimmerLinks", valueClass: BooleanValue },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "wohnzimmerRechts", valueClass: BooleanValue },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster mitte open.ACTUAL", key: "wohnzimmerMitte", valueClass: BooleanValue },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL", key: "wohnzimmerEcke", valueClass: BooleanValue },
      { id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "gaesteWcRechts", valueClass: BooleanValue },
      { id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "gaesteWcLinks", valueClass: BooleanValue },
      { id: "zigbee.0.00158d0003cb431e.opened", key: "bueroFenster", valueClass: BooleanValue },
      { id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "schlafenFenster", valueClass: BooleanValue },
      { id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Tür open.ACTUAL", key: "schlafenTuer", valueClass: BooleanValue },
      { id: "alias.0.Keller.Xiaomi AqaraSensoren.Tür open.Kellertür open", key: "kellerTuer", valueClass: BooleanValue },
      { id: "alias.0.Kinderzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "kinderzimmerFenster", valueClass: BooleanValue },
      { id: "alias.0.Bad.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "badFenster", valueClass: BooleanValue },
      { id: "alias.0.Gästezimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "gaestezimmerFenster", valueClass: BooleanValue },
      { id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Links open.ACTUAL", key: "esszimmerLinks", valueClass: BooleanValue },
      { id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Rechts open.ACTUAL", key: "esszimmerRechts", valueClass: BooleanValue },
      { id: "alias.0.Küche.Xiaomi AqaraSensoren.Tür open.ACTUAL", key: "kuecheTuer", valueClass: BooleanValue },
      { id: "alias.0.Küche.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "kuecheFenster", valueClass: BooleanValue },
      { id: "alias.0.Abstellraum.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "abstellraumFenster", valueClass: BooleanValue },
      { id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "abstellraumOgLinks", valueClass: BooleanValue },
      { id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "abstellraumOgRechts", valueClass: BooleanValue },
      { id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "dachbodenLinks", valueClass: BooleanValue },
      { id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "dachbodenRechts", valueClass: BooleanValue },
      { id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "flurLinks", valueClass: BooleanValue },
      { id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "flurRechts", valueClass: BooleanValue },
      { id: "alias.0.Keller.Xiaomi AqaraSensoren.Keller Treppe.Fenster.KellerTreppe Fenster", key: "kellerFlurFenster", valueClass: BooleanValue },
    ],
  },
  {
    channel: "styles",
    value: [{ id: "0_userdata.0.vis.calendar_styles", key: "calendarStyle", valueClass: JsonValue }],
  },
  {
    channel: "pv",
    value: [
      { id: "modbus.0.holdingRegisters.41069_soc", key: "batteryCharging", valueClass: NumberValue },
      { id: "modbus.0.holdingRegisters.41067_Active_Power", key: "activeCharging", valueClass: NumberValue },
      { id: "modbus.0.holdingRegisters.41079_grid_Power", key: "feedIn", valueClass: NumberValue },
      { id: "shelly.0.shellypro3em#ec6260976f14#1.EM0.TotalActivePower", key: "shellyFeedOut", valueClass: NumberValue },
      { id: "sonoff.0.Photovoltaik.ENERGY_Power", key: "smallPv", valueClass: NumberValue },
      { id: "0_userdata.0.Photovoltaik.Einnahme_Einspeisung", key: "profit", valueClass: NumberValue },
      { id: "fronius.0.inverter.1.P", key: "pvGross", valueClass: NumberValue },
      { id: "0_userdata.0.Photovoltaik.Einsparung_durch_PV", key: "savedMoney", valueClass: NumberValue },
      { id: "sonoff.0.Photovoltaik.ENERGY_Today", key: "energyDaySmall", valueClass: NumberValue },
      { id: "fronius.0.inverter.1.DAY_ENERGY", key: "energyDayGross", valueClass: NumberValue },
    ],
  },
  {
    channel: "position",
    value: [
      {
        id: "life360ng.0.people.afa1605e-1339-4bbc-921e-37b7774a75ce.gps-coordinates",
        key: "michaelCoordinates",
        valueClass: StringValue,
      },
    ],
  },
  {
    channel: "pool",
    value: [
      { id: "midas-aquatemp.0.state", key: "heaterState", valueClass: BooleanValue },
      { id: "midas-aquatemp.0.online", key: "heaterOnline", valueClass: BooleanValue },
      { id: "midas-aquatemp.0.tempSet", key: "tempSet", valueClass: NumberValue },
      { id: "midas-aquatemp.0.consumption", key: "consumption", valueClass: NumberValue },
      { id: "midas-aquatemp.0.tempIn", key: "tempIn", valueClass: NumberValue },
      { id: "midas-aquatemp.0.tempOut", key: "tempOut", valueClass: NumberValue },
      { id: "midas-aquatemp.0.rotor", key: "rotor", valueClass: NumberValue },
      { id: "midas-aquatemp.0.mode", key: "mode", valueClass: NumberValue },
      { id: "midas-aquatemp.0.info.connection", key: "status", valueClass: BooleanValue },
      { id: "midas-aquatemp.0.silent", key: "silent", valueClass: BooleanValue },
      { id: "shelly.0.SHPLG-S#4022D889A587#1.Relay0.Power", key: "poolPumpPower", valueClass: NumberValue },
      { id: "shelly.0.SHPLG-S#4022D889A587#1.Relay0.Switch", key: "poolPumpSwitch", valueClass: BooleanValue },
      { id: "0_userdata.0.Wärmepumpe.Wärmepumpe_schalten_script", key: "heaterScriptActivateJSON", valueClass: JsonValue },
      { id: "0_userdata.0.Wärmepumpe.SilentModeScriptJson", key: "heaterSilentScriptJSON", valueClass: JsonValue },
    ],
  },
  {
    channel: "phone",
    value: [
      { id: "tr-064.0.callmonitor.ringing", key: "ringing", valueClass: BooleanValue },
      { id: "tr-064.0.callmonitor.lastCall.timestamp", key: "lastCallTimestamp", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.lastCall.callerName", key: "lastCallerName", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.lastCall.caller", key: "lastCaller", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.lastCall.duration", key: "lastDuration", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.inbound.caller", key: "caller", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.inbound.callerName", key: "callerName", valueClass: StringValue },
      { id: "tr-064.0.callmonitor.inbound.timestamp", key: "callerTimestamp", valueClass: StringValue },
    ],
  },
  {
    channel: "lights",
    value: [
      { id: "sonoff.0.Sonoff_Wohnzimmer.POWER", key: "Wohnzimmer", valueClass: BooleanValue },
      { id: "s7.2.DBs.DB1.M6", key: "Wohnzimmer_Ecklampe", valueClass: BooleanValue },
      { id: "zigbee.0.a4c138d35583a3d7.state", key: "Weihnachtsbaum", valueClass: BooleanValue },
      { id: "sonoff.0.Sonoff_Dachboden.POWER", key: "Dachboden", valueClass: BooleanValue },
      { id: "sonoff.0.Sonoff_OG_Abstellraum.POWER", key: "Abstellraum_OG", valueClass: BooleanValue },
      { id: "sonoff.0.Sonoff_Keller_Michi.POWER", key: "Buero", valueClass: BooleanValue },
      { id: "tuya.0.bfec013e9034a47a12o5so.20", key: "Buero_Schreibtisch", valueClass: BooleanValue },
    ],
  },
  {
    channel: "lightsAdditive",
    value: [{ id: "s7.2.DBs.DB1.Q11", key: "Wohnzimmer_Ecklampe", valueClass: BooleanValue }],
  },
  {
    channel: "logs",
    value: [
      { id: "logparser.0.filters.Error.json", key: "error", valueClass: JsonValue },
      { id: "logparser.0.filters.Info.json", key: "info", valueClass: JsonValue },
      { id: "logparser.0.filters.Warn.json", key: "warning", valueClass: JsonValue },
      { id: "logparser.0.filters.Wärmepumpe.json", key: "heatPump", valueClass: JsonValue },
    ],
  },
  {
    channel: "infos",
    value: [
      { id: "admin.0.info.updatesJson", key: "updatesJson", valueClass: JsonValue },
      { id: "admin.0.info.updatesNumber", key: "updatesNumber", valueClass: NumberValue },
      { id: "admin.0.info.lastUpdateCheck", key: "lastUpdateCheck", valueClass: StringValue },
      { id: "admin.0.info.newsFeed", key: "newsFeeds", valueClass: StringValue },
    ],
  },
  {
    channel: "hmip",
    value: [
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valveActualTemperature", key: "children_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valvePosition", key: "children_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valveActualTemperature", key: "floor_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valvePosition", key: "floor_valvePosition", valueClass: NumberValue },

      {
        id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valveActualTemperature",
        key: "living_right_valveActualTemp",
        valueClass: NumberValue,
      },
      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valvePosition", key: "living_right_valvePosition", valueClass: NumberValue },

      {
        id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valveActualTemperature",
        key: "living_left_valveActualTemp",
        valueClass: NumberValue,
      },
      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valvePosition", key: "living_left_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valveActualTemperature", key: "kitchen_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valvePosition", key: "kitchen_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valveActualTemperature", key: "guest_wc_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valvePosition", key: "guest_wc_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valveActualTemperature", key: "bath_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valvePosition", key: "bath_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valveActualTemperature", key: "sleeping_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valvePosition", key: "sleeping_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valveActualTemperature", key: "dining_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valvePosition", key: "dining_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valveActualTemperature", key: "washing_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valvePosition", key: "washing_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valveActualTemperature", key: "guest_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valvePosition", key: "guest_valvePosition", valueClass: NumberValue },

      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valveActualTemperature", key: "office_valveActualTemp", valueClass: NumberValue },
      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valvePosition", key: "office_valvePosition", valueClass: NumberValue },
    ],
  },
  {
    channel: "heating",
    value: [
      { id: "s7.0.DBs.DB1.I6_-_NQ5", key: "automatic", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.I5_-_NQ2", key: "level", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.NQ13", key: "active", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.NQ15", key: "autoSolar", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.B059", key: "heatingTemperature", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B054", key: "heatingSolar", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B068", key: "heatingBuffer", valueClass: NumberValue },
      { id: "mqtt.0.oeg.43_T6_Puffer_Mitte_Ist-Wert", key: "heatingBufferMiddle", valueClass: NumberValue },
      { id: "mqtt.0.oeg.42_T5_Puffer_Brauchwasser_Ist-Wert", key: "heatingBufferTop", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B076", key: "solarMaxToday", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B085", key: "solarMax", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.NQ12", key: "pelletExist", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.I3_-_NQ3", key: "watcherAdmitter", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.I4_-_NQ4", key: "tempPelletBuffer", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.NQ14", key: "confirmMessage", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.I1_-_NQ1", key: "snail", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.NQ8", key: "spiral", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.B004", key: "maxTimeToFill", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B008", key: "offsetFilling", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B061", key: "tempPumpOn", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B061_2", key: "tempPumpOff", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B067", key: "diffSolarBuffer", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B069", key: "minFillTemp", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.B056", key: "maxFillTemp", valueClass: NumberValue },
      { id: "s7.0.DBs.DB1.Q3_-_NQ10", key: "solarPump", valueClass: BooleanValue },
      { id: "s7.0.DBs.DB1.Q4_-_NQ11", key: "heatingPump", valueClass: BooleanValue },
    ],
  },
  {
    channel: "energy",
    value: [
      { id: "sonoff.0.Steckdose_Waschmaschine .ENERGY_Power", key: "Waschmaschine", valueClass: NumberValue },
      { id: "sonoff.0.Tasmota Kühltruhe.ENERGY_Power", key: "Kuehltruhe", valueClass: NumberValue },
      { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack", valueClass: NumberValue },
      { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack", valueClass: NumberValue },
      { id: "0_userdata.0.Photovoltaik.Bezug_Tag", key: "energyReceived", valueClass: NumberValue },
      { id: "0_userdata.0.Photovoltaik.Einspeisung_Tag", key: "energyReturned", valueClass: NumberValue },
    ],
  },
  {
    channel: "calendar",
    value: [{ id: "ical.1.data.table", key: "table", valueClass: JsonValue }],
  },
  {
    channel: "airConditioners",
    value: [
      { id: "tuya.0.bf371cfe643bf102afauv6.online", key: "schlafenOnline", valueClass: BooleanValue },
      { id: "tuya.0.bf371cfe643bf102afauv6.1", key: "schlafenPowerStatus", valueClass: BooleanValue },
      { id: "shelly.0.SHPLG-S#4022D8894549#1.Relay0.Power", key: "schlafenPower", valueClass: NumberValue },
      { id: "tuya.0.bf371cfe643bf102afauv6.8", key: "schlafenIsTemp", valueClass: NumberValue },
      { id: "tuya.0.bf371cfe643bf102afauv6.5", key: "schlafenSetTemp", valueClass: NumberValue },

      { id: "tuya.0.bf57f6b83543b4f45dwh13.online", key: "childOnline", valueClass: BooleanValue },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.1", key: "childPowerStatus", valueClass: BooleanValue },
      { id: "shelly.0.SHPLG-S#4022D8895174#1.Relay0.Power", key: "childPower", valueClass: NumberValue },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.8", key: "childIsTemp", valueClass: NumberValue },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.5", key: "childSetTemp", valueClass: NumberValue },
    ],
  },
  {
    channel: "landroid",
    value: [
      { id: "worx.0.202330294701005409AD.mower.batteryState", key: "battery", valueClass: NumberValue },
      { id: "worx.0.202330294701005409AD.mower.totalDistance", key: "totalDistance", valueClass: NumberValue },
      { id: "worx.0.202330294701005409AD.mower.totalBladeTime", key: "totalBladeTime", valueClass: NumberValue },
      { id: "worx.0.202330294701005409AD.mower.status", key: "status", valueClass: NumberValue },
      { id: "worx.0.202330294701005409AD.mower.online", key: "online", valueClass: BooleanValue },
      { id: "worx.0.202330294701005409AD.mower.firmware", key: "firmware", valueClass: StringValue },
      { id: "worx.0.202330294701005409AD.mower.error", key: "error", valueClass: NumberValue },
      { id: "worx.0.202330294701005409AD.mower.edgecut", key: "edgecut", valueClass: BooleanValue },
      { id: "worx.0.202330294701005409AD.mower.batteryCharging", key: "batteryCharging", valueClass: BooleanValue },
    ],
  },
  {
    channel: "trash",
    value: [{ id: "trashschedule.0.type.json", key: "json", valueClass: JsonValue }],
  },
  {
    channel: "alexaLists",
    value: [
      { id: "alexa-shoppinglist.0.list_activ", key: "shoppingListActive", valueClass: StringValue },
      { id: "alexa-shoppinglist.1.list_activ", key: "michaelsTodoList", valueClass: StringValue },
    ],
  },
  {
    channel: "time",
    value: [
      {
        id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter",
        key: "sonnenuntergang",
        valueClass: BooleanValue,
      },
    ],
  },
  {
    channel: "holiday",
    value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv", key: "urlaubAktiv", valueClass: BooleanValue }],
  },
  {
    channel: "windowGlobal",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen", key: "fensterOffen", valueClass: BooleanValue }],
  },
] as const satisfies readonly IobrokerSubscription[];
