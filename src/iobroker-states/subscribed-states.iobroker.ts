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

type Leaf = BaseValue<unknown> | undefined;
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
  // Klasse, die beim Eintreffen einer Nachricht instanziiert wird (NumberValue, BooleanValue, StringValue, JsonValue<T>, ...).
  valueClass: ValueClassCtor;
};

type GroupedId<T> = {
  [G in GroupKeys<T>]: {
    id: string;
    group: G;
    key: keyof T[G];
    invertValue?: boolean;
    valueClass: ValueClassCtor;
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
  percent: NumberValue | undefined;
  available: BooleanValue | undefined;
  voltage: NumberValue | undefined;
  ts: NumberValue | undefined;
}

export interface HMIPDevice {
  lowBat?: BooleanValue | undefined;
  available: BooleanValue | undefined;
  ts: number;
}

export interface IobrokerChannels {
  trash: {
    json: JsonValue<TrashType[]> | undefined;
  };
  alexaLists: {
    shoppingListActive: StringValue | undefined;
    michaelsTodoList: StringValue | undefined;
  };
  time: {
    sonnenuntergang: BooleanValue | undefined;
  };
  holiday: {
    urlaubAktiv: BooleanValue | undefined;
  };
  windowGlobal: {
    fensterOffen: BooleanValue | undefined;
  };
  landroid: {
    battery: NumberValue | undefined;
    totalDistance: NumberValue | undefined;
    totalBladeTime: NumberValue | undefined;
    status: NumberValue | undefined;
    online: BooleanValue | undefined;
    firmware: StringValue | undefined;
    error: NumberValue | undefined;
    edgecut: BooleanValue | undefined;
    batteryCharging: BooleanValue | undefined;
  };
  airConditioners: {
    schlafenOnline: BooleanValue | undefined;
    schlafenPower: NumberValue | undefined;
    schlafenPowerStatus: BooleanValue | undefined;
    schlafenIsTemp: NumberValue | undefined;
    schlafenSetTemp: NumberValue | undefined;

    childOnline: BooleanValue | undefined;
    childPowerStatus: BooleanValue | undefined;
    childPower: NumberValue | undefined;
    childIsTemp: NumberValue | undefined;
    childSetTemp: NumberValue | undefined;
  };
  calendar: {
    table: JsonValue<CalendarDayType[]> | undefined;
  };
  energy: {
    Waschmaschine: NumberValue | undefined;
    Kuehltruhe: NumberValue | undefined;
    Rack: NumberValue | undefined;
    energyReceived: NumberValue | undefined;
    energyReturned: NumberValue | undefined;
  };
  heating: {
    automatic: BooleanValue | undefined;
    level: BooleanValue | undefined;
    active: BooleanValue | undefined;
    autoSolar: BooleanValue | undefined;
    heatingTemperature: NumberValue | undefined;
    heatingBuffer: NumberValue | undefined;
    heatingBufferMiddle: NumberValue | undefined;
    heatingBufferTop: NumberValue | undefined;
    heatingSolar: NumberValue | undefined;
    solarMaxToday: NumberValue | undefined;
    solarMax: NumberValue | undefined;
    pelletExist: BooleanValue | undefined;
    watcherAdmitter: BooleanValue | undefined;
    tempPelletBuffer: BooleanValue | undefined;
    confirmMessage: BooleanValue | undefined;
    snail: BooleanValue | undefined;
    spiral: BooleanValue | undefined;
    maxTimeToFill: NumberValue | undefined;
    offsetFilling: NumberValue | undefined;
    tempPumpOn: NumberValue | undefined;
    tempPumpOff: NumberValue | undefined;
    diffSolarBuffer: NumberValue | undefined;
    minFillTemp: NumberValue | undefined;
    maxFillTemp: NumberValue | undefined;
    solarPump: BooleanValue | undefined;
    heatingPump: BooleanValue | undefined;
  };
  heatingControl: {
    "Mon.0.Temp": NumberValue | undefined;
    "Mon.1.Temp": NumberValue | undefined;
    "Mon.2.Temp": NumberValue | undefined;
    "Mon.3.Temp": NumberValue | undefined;
    "Mon.4.Temp": NumberValue | undefined;
    "Mon.5.Temp": NumberValue | undefined;
    "Tue.0.Temp": NumberValue | undefined;
    "Tue.1.Temp": NumberValue | undefined;
    "Tue.2.Temp": NumberValue | undefined;
    "Tue.3.Temp": NumberValue | undefined;
    "Tue.4.Temp": NumberValue | undefined;
    "Tue.5.Temp": NumberValue | undefined;
    "Wed.0.Temp": NumberValue | undefined;
    "Wed.1.Temp": NumberValue | undefined;
    "Wed.2.Temp": NumberValue | undefined;
    "Wed.3.Temp": NumberValue | undefined;
    "Wed.4.Temp": NumberValue | undefined;
    "Wed.5.Temp": NumberValue | undefined;
    "Thu.0.Temp": NumberValue | undefined;
    "Thu.1.Temp": NumberValue | undefined;
    "Thu.2.Temp": NumberValue | undefined;
    "Thu.3.Temp": NumberValue | undefined;
    "Thu.4.Temp": NumberValue | undefined;
    "Thu.5.Temp": NumberValue | undefined;
    "Fri.0.Temp": NumberValue | undefined;
    "Fri.1.Temp": NumberValue | undefined;
    "Fri.2.Temp": NumberValue | undefined;
    "Fri.3.Temp": NumberValue | undefined;
    "Fri.4.Temp": NumberValue | undefined;
    "Fri.5.Temp": NumberValue | undefined;
    "Sat.0.Temp": NumberValue | undefined;
    "Sat.1.Temp": NumberValue | undefined;
    "Sat.2.Temp": NumberValue | undefined;
    "Sat.3.Temp": NumberValue | undefined;
    "Sat.4.Temp": NumberValue | undefined;
    "Sat.5.Temp": NumberValue | undefined;
    "Sun.0.Temp": NumberValue | undefined;
    "Sun.1.Temp": NumberValue | undefined;
    "Sun.2.Temp": NumberValue | undefined;
    "Sun.3.Temp": NumberValue | undefined;
    "Sun.4.Temp": NumberValue | undefined;
    "Sun.5.Temp": NumberValue | undefined;

    "Mon.0.Time": StringValue | undefined;
    "Mon.1.Time": StringValue | undefined;
    "Mon.2.Time": StringValue | undefined;
    "Mon.3.Time": StringValue | undefined;
    "Mon.4.Time": StringValue | undefined;
    "Mon.5.Time": StringValue | undefined;
    "Tue.0.Time": StringValue | undefined;
    "Tue.1.Time": StringValue | undefined;
    "Tue.2.Time": StringValue | undefined;
    "Tue.3.Time": StringValue | undefined;
    "Tue.4.Time": StringValue | undefined;
    "Tue.5.Time": StringValue | undefined;
    "Wed.0.Time": StringValue | undefined;
    "Wed.1.Time": StringValue | undefined;
    "Wed.2.Time": StringValue | undefined;
    "Wed.3.Time": StringValue | undefined;
    "Wed.4.Time": StringValue | undefined;
    "Wed.5.Time": StringValue | undefined;
    "Thu.0.Time": StringValue | undefined;
    "Thu.1.Time": StringValue | undefined;
    "Thu.2.Time": StringValue | undefined;
    "Thu.3.Time": StringValue | undefined;
    "Thu.4.Time": StringValue | undefined;
    "Thu.5.Time": StringValue | undefined;
    "Fri.0.Time": StringValue | undefined;
    "Fri.1.Time": StringValue | undefined;
    "Fri.2.Time": StringValue | undefined;
    "Fri.3.Time": StringValue | undefined;
    "Fri.4.Time": StringValue | undefined;
    "Fri.5.Time": StringValue | undefined;
    "Sat.0.Time": StringValue | undefined;
    "Sat.1.Time": StringValue | undefined;
    "Sat.2.Time": StringValue | undefined;
    "Sat.3.Time": StringValue | undefined;
    "Sat.4.Time": StringValue | undefined;
    "Sat.5.Time": StringValue | undefined;
    "Sun.0.Time": StringValue | undefined;
    "Sun.1.Time": StringValue | undefined;
    "Sun.2.Time": StringValue | undefined;
    "Sun.3.Time": StringValue | undefined;
    "Sun.4.Time": StringValue | undefined;
    "Sun.5.Time": StringValue | undefined;

    profile: NumberValue | undefined;
    room: NumberValue | undefined;
    profileText: StringValue | undefined;
    profileValue: StringValue | undefined;
    usedRoom: StringValue | undefined;
    //HeatingControlConfig
    periodActive: BooleanValue | undefined;
    publicHoliday: BooleanValue | undefined;
    present: BooleanValue | undefined;
    partyNow: BooleanValue | undefined;
    guestsPresent: BooleanValue | undefined;
    holidayPresent: BooleanValue | undefined;
    vacationAbsent: BooleanValue | undefined;

    guestIncrease: NumberValue | undefined;
    partyDecrease: NumberValue | undefined;
    absentDecrease: NumberValue | undefined;
    vacationAbsentDecrease: NumberValue | undefined;
    windowOpenDecrease: NumberValue | undefined;
    temperatureOverrideTemp: NumberValue | undefined;
    temperatureOverrideTime: NumberValue | undefined;
    minimumTemperature: NumberValue | undefined;
    //Window Status
    openWindowCount: NumberValue | undefined;
    windowOpenHtmlTable: StringValue | undefined;

    statusRoom: StringValue | undefined;
    sollTemp1: NumberValue | undefined;
    sollTemp2: NumberValue | undefined;
    tempRegler1: NumberValue | undefined;
    tempRegler2: NumberValue | undefined;
    ventil1: NumberValue | undefined;
    ventil2: NumberValue | undefined;
    tempSensor: NumberValue | undefined;
    roomState: StringValue | undefined;
    visRoomStates: StringValue | undefined;

    timeSlotBad: NumberValue | undefined;
  };
  hmip: {
    children_valvePosition: NumberValue | undefined;
    children_valveActualTemp: NumberValue | undefined;

    floor_valvePosition: NumberValue | undefined;
    floor_valveActualTemp: NumberValue | undefined;

    living_right_valvePosition: NumberValue | undefined;
    living_right_valveActualTemp: NumberValue | undefined;

    living_left_valvePosition: NumberValue | undefined;
    living_left_valveActualTemp: NumberValue | undefined;

    kitchen_valvePosition: NumberValue | undefined;
    kitchen_valveActualTemp: NumberValue | undefined;

    guest_wc_valvePosition: NumberValue | undefined;
    guest_wc_valveActualTemp: NumberValue | undefined;

    bath_valvePosition: NumberValue | undefined;
    bath_valveActualTemp: NumberValue | undefined;

    sleeping_valvePosition: NumberValue | undefined;
    sleeping_valveActualTemp: NumberValue | undefined;

    dining_valvePosition: NumberValue | undefined;
    dining_valveActualTemp: NumberValue | undefined;

    washing_valvePosition: NumberValue | undefined;
    washing_valveActualTemp: NumberValue | undefined;

    guest_valvePosition: NumberValue | undefined;
    guest_valveActualTemp: NumberValue | undefined;

    office_valvePosition: NumberValue | undefined;
    office_valveActualTemp: NumberValue | undefined;
  };
  infos: {
    updatesJson: JsonValue<UpdatesAsJSON> | undefined;
    updatesNumber: NumberValue | undefined;
    newsFeeds: StringValue | undefined;
    lastUpdateCheck: StringValue | undefined;
  };
  logs: {
    error: JsonValue<Log[]> | undefined;
    warning: JsonValue<Log[]> | undefined;
    info: JsonValue<Log[]> | undefined;
    heatPump: JsonValue<Log[]> | undefined;
  };
  lights: {
    Wohnzimmer: BooleanValue | undefined;
    Weihnachtsbaum: BooleanValue | undefined;
    Buero_Schreibtisch: BooleanValue | undefined;
    Buero: BooleanValue | undefined;
    Dachboden: BooleanValue | undefined;
    Abstellraum_OG: BooleanValue | undefined;
    Wohnzimmer_Ecklampe: BooleanValue | undefined;
  };

  lightsAdditive: {
    Wohnzimmer_Ecklampe: BooleanValue | undefined;
  };

  phone: {
    ringing: BooleanValue | undefined;
    lastCallTimestamp: StringValue | undefined;
    lastCallerName: StringValue | undefined;
    lastCaller: StringValue | undefined;
    lastDuration: StringValue | undefined;
    caller: StringValue | undefined;
    callerName: StringValue | undefined;
    callerTimestamp: StringValue | undefined;
  };
  pool: {
    heaterState: BooleanValue | undefined;
    heaterOnline: BooleanValue | undefined;
    tempSet: NumberValue | undefined;
    consumption: NumberValue | undefined;
    tempIn: NumberValue | undefined;
    tempOut: NumberValue | undefined;
    rotor: NumberValue | undefined;
    mode: NumberValue | undefined;
    status: BooleanValue | undefined;
    poolPumpPower: NumberValue | undefined;
    poolPumpSwitch: BooleanValue | undefined;
    silent: BooleanValue | undefined;
    heaterScriptActivateJSON: JsonValue<HeatingPumpScriptJson> | undefined;
    heaterSilentScriptJSON: JsonValue<HeatingPumpSilentJSON> | undefined;
  };
  position: {
    michaelCoordinates: StringValue | undefined;
  };
  wattPilot: {
    jsonScriptChargeLevel: JsonValue<WattPilotJson> | undefined;
    autoCharging: BooleanValue | undefined;
    totalCharging: NumberValue | undefined;
  };
  pv: {
    feedIn: NumberValue | undefined;
    batteryCharging: NumberValue | undefined;
    shellyFeedOut: NumberValue | undefined;
    smallPv: NumberValue | undefined;
    activeCharging: NumberValue | undefined;
    profit: NumberValue | undefined;
    pvGross: NumberValue | undefined;
    savedMoney: NumberValue | undefined;
    energyDayGross: NumberValue | undefined;
    energyDaySmall: NumberValue | undefined;
  };
  styles: {
    calendarStyle: JsonValue<JSONStyle[]> | undefined;
  };
  fenster: {
    haustuer: BooleanValue | undefined;
    wohnzimmerEcke: BooleanValue | undefined;
    wohnzimmerMitte: BooleanValue | undefined;
    wohnzimmerLinks: BooleanValue | undefined;
    wohnzimmerRechts: BooleanValue | undefined;
    kuecheTuer: BooleanValue | undefined;
    kuecheFenster: BooleanValue | undefined;
    esszimmerLinks: BooleanValue | undefined;
    esszimmerRechts: BooleanValue | undefined;
    kinderzimmerFenster: BooleanValue | undefined;
    gaestezimmerFenster: BooleanValue | undefined;
    schlafenFenster: BooleanValue | undefined;
    schlafenTuer: BooleanValue | undefined;
    badFenster: BooleanValue | undefined;
    flurLinks: BooleanValue | undefined;
    flurRechts: BooleanValue | undefined;
    gaesteWcLinks: BooleanValue | undefined;
    gaesteWcRechts: BooleanValue | undefined;
    bueroFenster: BooleanValue | undefined;
    abstellraumFenster: BooleanValue | undefined;
    abstellraumOgLinks: BooleanValue | undefined;
    abstellraumOgRechts: BooleanValue | undefined;
    kellerFlurFenster: BooleanValue | undefined;
    kellerTuer: BooleanValue | undefined;
    dachbodenLinks: BooleanValue | undefined;
    dachbodenRechts: BooleanValue | undefined;
  };
  tankerKoenig: {
    cheapestName: StringValue | undefined;
    cheapestFullStreet: StringValue | undefined;
    cheapestPrice: NumberValue | undefined;
    jsonTable: JsonValue<TankerkoenigStation[]> | undefined;
  };
  logReset: {
    error: BooleanValue | undefined;
    warn: BooleanValue | undefined;
    info: BooleanValue | undefined;
  };
  heatingTimeSlot: {
    currentTimePeriod: NumberValue | undefined;
  };
  alexaAction: {
    alexaSpeak: StringValue | undefined;
  };
  timers: {
    timerAlive: BooleanValue | undefined;
    "1": {
      timeString: StringValue | undefined;
      device: StringValue | undefined;
      timeEnd: StringValue | undefined;
      timeStart: StringValue | undefined;
      percent: NumberValue | undefined;
      name: StringValue | undefined;
      initialTimer: StringValue | undefined;
    };
    "2": {
      timeString: StringValue | undefined;
      device: StringValue | undefined;
      timeEnd: StringValue | undefined;
      timeStart: StringValue | undefined;
      percent: NumberValue | undefined;
      name: StringValue | undefined;
      initialTimer: StringValue | undefined;
    };
    "3": {
      timeString: StringValue | undefined;
      device: StringValue | undefined;
      timeEnd: StringValue | undefined;
      timeStart: StringValue | undefined;
      percent: NumberValue | undefined;
      name: StringValue | undefined;
      initialTimer: StringValue | undefined;
    };
    "4": {
      timeString: StringValue | undefined;
      device: StringValue | undefined;
      timeEnd: StringValue | undefined;
      timeStart: StringValue | undefined;
      percent: NumberValue | undefined;
      name: StringValue | undefined;
      initialTimer: StringValue | undefined;
    };
  };
  rolladen: {
    wohnzimmerMittePosition: NumberValue | undefined;
    wohnzimmerEckePosition: NumberValue | undefined;
    wohnzimmerLinksPosition: NumberValue | undefined;
    wohnzimmerRechtsPosition: NumberValue | undefined;
    kuecheTuerPosition: NumberValue | undefined;
    kuecheFensterPosition: NumberValue | undefined;
    kinderzimmerFensterPosition: NumberValue | undefined;
    gaestezimmerFensterPosition: NumberValue | undefined;
    schlafenTuerPosition: NumberValue | undefined;
    schlafenFensterPosition: NumberValue | undefined;
    badFensterPosition: NumberValue | undefined;
    abstellraumOgLinksPosition: NumberValue | undefined;
    abstellraumOgRechtsPosition: NumberValue | undefined;
    esszimmerLinksPosition: NumberValue | undefined;
  };
  shutterAutoUp: {
    abstellraumOgLinksAutoUp: BooleanValue | undefined;
    abstellraumOgRechtsAutoUp: BooleanValue | undefined;
    abstellraumOgLinksAutoUpTime: NumberValue | undefined;
    abstellraumOgRechtsAutoUpTime: NumberValue | undefined;

    badFensterAutoUp: BooleanValue | undefined;
    badFensterAutoUpTime: NumberValue | undefined;
    schlafenTuerAutoUp: BooleanValue | undefined;
    schlafenFensterAutoUp: BooleanValue | undefined;
    schlafenTuerAutoUpTime: NumberValue | undefined;
    schlafenFensterAutoUpTime: NumberValue | undefined;
    gaestezimmerFensterAutoUp: BooleanValue | undefined;
    gaestezimmerFensterAutoUpTime: NumberValue | undefined;
    esszimmerLinksAutoUp: BooleanValue | undefined;
    esszimmerLinksAutoUpTime: NumberValue | undefined;
    kuecheTuerAutoUp: BooleanValue | undefined;
    kuecheFensterAutoUp: BooleanValue | undefined;
    kuecheTuerAutoUpTime: NumberValue | undefined;
    kuecheFensterAutoUpTime: NumberValue | undefined;
    kinderzimmerFensterAutoUp: BooleanValue | undefined;
    kinderzimmerFensterAutoUpTime: NumberValue | undefined;
    wohnzimmerMitteAutoUp: BooleanValue | undefined;
    wohnzimmerEckeAutoUp: BooleanValue | undefined;
    wohnzimmerLinksAutoUp: BooleanValue | undefined;
    wohnzimmerRechtsAutoUp: BooleanValue | undefined;
    wohnzimmerMitteAutoUpTime: NumberValue | undefined;
    wohnzimmerEckeAutoUpTime: NumberValue | undefined;
    wohnzimmerLinksAutoUpTime: NumberValue | undefined;
    wohnzimmerRechtsAutoUpTime: NumberValue | undefined;
  };
  shutterAutoDownTime: {
    wohnzimmerMitteDelay: NumberValue | undefined;
    wohnzimmerEckeDelay: NumberValue | undefined;
    wohnzimmerLinksDelay: NumberValue | undefined;
    wohnzimmerRechtsDelay: NumberValue | undefined;
    kuecheFensterDelay: NumberValue | undefined;
    kuecheTuerDelay: NumberValue | undefined;
    esszimmerLinksDelay: NumberValue | undefined;
    kinderzimmerFensterDelay: NumberValue | undefined;
    gaestezimmerFensterDelay: NumberValue | undefined;
    schlafenTuerDelay: NumberValue | undefined;
    schlafenFensterDelay: NumberValue | undefined;
    badFensterDelay: NumberValue | undefined;
    abstellraumOgLinksDelay: NumberValue | undefined;
    abstellraumOgRechtsDelay: NumberValue | undefined;
    wohnzimmerMitteAuto: BooleanValue | undefined;
    wohnzimmerEckeAuto: BooleanValue | undefined;
    wohnzimmerLinksAuto: BooleanValue | undefined;
    wohnzimmerRechtsAuto: BooleanValue | undefined;
    kuecheTuerAuto: BooleanValue | undefined;
    kuecheFensterAuto: BooleanValue | undefined;
    esszimmerLinksAuto: BooleanValue | undefined;
    kinderzimmerFensterAuto: BooleanValue | undefined;
    gaestezimmerFensterAuto: BooleanValue | undefined;
    schlafenTuerAuto: BooleanValue | undefined;
    schlafenFensterAuto: BooleanValue | undefined;
    badFensterAuto: BooleanValue | undefined;
    abstellraumOgLinksAuto: BooleanValue | undefined;
    abstellraumOgRechtsAuto: BooleanValue | undefined;
  };
  batteries: {
    "Shelly Plus Smoke Flur OG": {
      percent: NumberValue | undefined;
      firmware: BooleanValue | undefined;
      voltage: NumberValue | undefined;
      ts: NumberValue | undefined;
    };
    "HMIP Flur": {
      lowBat?: BooleanValue | undefined;
      available: BooleanValue | undefined;
      ts: NumberValue | undefined;
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
    ramIobrokerUsed: NumberValue | undefined;
    ramIobrokerLevel: NumberValue | undefined;
    ramIobrokerMax: NumberValue | undefined;
    cpuIobroker: NumberValue | undefined;
    cpusIobroker: NumberValue | undefined;
    diskIobrokerUsage: NumberValue | undefined;
    iobrokerUptime: NumberValue | undefined;
  };
  car: {
    battery: NumberValue | undefined;
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
