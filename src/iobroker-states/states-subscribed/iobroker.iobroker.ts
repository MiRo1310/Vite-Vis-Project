import { StoreValueClass } from "@/store/ioBrokerStore.ts";

export type StoreValue<T> = StoreValueClass<T> | undefined;

type Leaf = StoreValue<unknown>;
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
};

type GroupedId<T> = {
  [G in GroupKeys<T>]: {
    id: string;
    group: G;
    key: keyof T[G];
    invertValue?: boolean;
  };
}[GroupKeys<T>];

type IdForChannel<T> = FlatId<T> | GroupedId<T>;

export type IobrokerSubscription = {
  [C in keyof IobrokerChannels]: {
    channel: C;
    value: IdForChannel<NonNullable<IobrokerChannels[C]>>[];
  };
}[keyof IobrokerChannels];

export type Optional<T> = T | undefined;

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
  trash: Optional<{
    json: StoreValue<string>;
  }>;
  alexaLists: Optional<{
    shoppingListActive: StoreValue<string>;
    michaelsTodoList: StoreValue<string>;
  }>;
  time: Optional<{
    sonnenuntergang: StoreValue<boolean>;
  }>;
  holiday: Optional<{
    urlaubAktiv: StoreValue<boolean>;
  }>;
  windowGlobal: Optional<{
    fensterOffen: StoreValue<boolean>;
  }>;
  landroid: Optional<{
    battery: StoreValue<number>;
    totalDistance: StoreValue<number>;
    totalBladeTime: StoreValue<number>;
    status: StoreValue<number>;
    online: StoreValue<boolean>;
    firmware: StoreValue<string>;
    error: StoreValue<number>;
    edgecut: StoreValue<boolean>;
    batteryCharging: StoreValue<boolean>;
  }>;
  airConditioners: Optional<{
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
  }>;
  calendar: Optional<{
    table: StoreValue<string>;
  }>;
  energy: Optional<{
    Waschmaschine: StoreValue<number>;
    Kuehltruhe: StoreValue<number>;
    Rack: StoreValue<number>;
    energyReceived: StoreValue<number>;
    energyReturned: StoreValue<number>;
  }>;
  heating: Optional<{
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
  }>;
  heatingControl: Optional<{
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
  }>;
  hmip: Optional<{
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
  }>;
  infos: Optional<{
    updatesJson: StoreValue<string>;
    updatesNumber: StoreValue<number>;
    newsFeeds: StoreValue<string>;
    lastUpdateCheck: StoreValue<string>;
  }>;
  logs: Optional<{
    error: StoreValue<string>;
    warning: StoreValue<string>;
    info: StoreValue<string>;
    heatPump: StoreValue<string>;
  }>;
  lights: Optional<{
    Wohnzimmer: StoreValue<boolean>;
    Weihnachtsbaum: StoreValue<boolean>;
    Buero_Schreibtisch: StoreValue<boolean>;
    Buero: StoreValue<boolean>;
    Dachboden: StoreValue<boolean>;
    Abstellraum_OG: StoreValue<boolean>;
    Wohnzimmer_Ecklampe: StoreValue<boolean>;
  }>;

  lightsAdditive: Optional<{
    Wohnzimmer_Ecklampe: StoreValue<boolean>;
  }>;

  phone: Optional<{
    ringing: StoreValue<boolean>;
    lastCallTimestamp: StoreValue<string>;
    lastCallerName: StoreValue<string>;
    lastCaller: StoreValue<string>;
    lastDuration: StoreValue<string>;
    caller: StoreValue<string>;
    callerName: StoreValue<string>;
    callerTimestamp: StoreValue<string>;
  }>;
  pool: Optional<{
    heaterState: StoreValue<boolean>;
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
    heaterScriptActivateJSON: StoreValue<string>;
    heaterSilentScriptJSON: StoreValue<string>;
  }>;
  position: Optional<{
    michaelCoordinates: StoreValue<string>;
  }>;
  pv: Optional<{
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
  }>;
  styles: Optional<{
    calendarStyle: StoreValue<string>;
  }>;
  fenster: Optional<{
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
  }>;
  tankerKoenig: Optional<{
    cheapestName: StoreValue<string>;
    cheapestFullStreet: StoreValue<string>;
    cheapestPrice: StoreValue<number>;
    jsonTable: StoreValue<string>;
  }>;
  logReset: Optional<{
    error: StoreValue<boolean>;
    warn: StoreValue<boolean>;
    info: StoreValue<boolean>;
  }>;
  heatingTimeSlot: Optional<{
    currentTimePeriod: StoreValue<number>;
  }>;
  alexaAction: Optional<{
    alexaSpeak: StoreValue<string>;
  }>;
  timers: Optional<{
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
  }>;
  rolladen: Optional<{
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
  }>;
  shutterAutoUp: Optional<{
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
  }>;
  shutterAutoDownTime: Optional<{
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
  }>;
  batteries: Optional<{
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
  }>;
  system: Optional<{
    ramIobrokerUsed: StoreValue<number>;
    ramIobrokerLevel: StoreValue<number>;
    ramIobrokerMax: StoreValue<number>;
    cpuIobroker: StoreValue<number>;
    cpusIobroker: StoreValue<number>;
    diskIobrokerUsage: StoreValue<number>;
    iobrokerUptime: StoreValue<number>;
  }>;
}

const heatingControl = {
  channel: "heatingControl",
  value: [
    { id: "heatingcontrol.0.CurrentProfile", key: "profile" },
    { id: "heatingcontrol.0.vis.ChoosenRoom", key: "room" },
    { id: "heatingcontrol.0.vis.ProfileValueListText", key: "profileText" },
    { id: "heatingcontrol.0.vis.ProfileValueListValue", key: "profileValue" },
    { id: "heatingcontrol.0.info.UsedRooms", key: "usedRoom" },
    { id: "heatingcontrol.0.HeatingPeriodActive", key: "periodActive" },
    { id: "heatingcontrol.0.PublicHolidyToday", key: "publicHoliday" },
    { id: "heatingcontrol.0.Present", key: "present" },
    { id: "heatingcontrol.0.PartyNow", key: "partyNow" },
    { id: "heatingcontrol.0.GuestsPresent", key: "guestsPresent" },
    { id: "heatingcontrol.0.HolidayPresent", key: "holidayPresent" },
    { id: "heatingcontrol.0.VacationAbsent", key: "vacationAbsent" },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.GuestIncrease", key: "guestIncrease" },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.PartyDecrease", key: "partyDecrease" },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.AbsentDecrease", key: "absentDecrease" },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.VacationAbsentDecrease", key: "vacationAbsentDecrease" },
    { id: "heatingcontrol.0.vis.TempDecreaseValues.WindowOpenDecrease", key: "windowOpenDecrease" },
    { id: "heatingcontrol.0.vis.RoomValues.TemperaturOverride", key: "temperatureOverrideTemp" },
    { id: "heatingcontrol.0.vis.RoomValues.TemperaturOverrideTime", key: "temperatureOverrideTime" },
    { id: "heatingcontrol.0.vis.RoomValues.MinimumTemperature", key: "minimumTemperature" },
    { id: "heatingcontrol.0.vis.OpenWindowRoomCount", key: "openWindowCount" },
    { id: "heatingcontrol.0.vis.WindowStatesHtmlTable", key: "windowOpenHtmlTable" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Status_Zimmer_state", key: "statusRoom" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Soll_Temp", key: "sollTemp1" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Soll_Temp_2", key: "sollTemp2" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Regler", key: "tempRegler1" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Regler_2", key: "tempRegler2" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Ventilstellung", key: "ventil1" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Ventilstellung_2", key: "ventil2" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Temperatur_am_Raumsensor", key: "tempSensor" },
    { id: "0_userdata.0.Heizung.heatingcontrol.Room_State", key: "roomState" },
    { id: "heatingcontrol.0.vis.RoomStatesHtmlTable", key: "visRoomStates" },
    { id: "heatingcontrol.0.Rooms.Bad.ActiveTimeSlot", key: "timeSlotBad" },
  ],
} satisfies IobrokerSubscription;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

addItems();

function addItems() {
  for (const day of days) {
    for (let period = 1; period < 6; period++) {
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.Temperature`,
        key: `${day}.${period}.temp` as keyof IobrokerChannels["heatingControl"],
      });
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.time`,
        key: `${day}.${period}.time` as keyof IobrokerChannels["heatingControl"],
      });
    }
  }
}

export const iobrokerData = [
  {
    channel: "system",
    value: [
      { key: "ramIobrokerUsed", id: "proxmox.0.lxc.iobroker.mem" },
      { key: "ramIobrokerLevel", id: "proxmox.0.lxc.iobroker.mem_lev" },
      { key: "ramIobrokerMax", id: "proxmox.0.lxc.iobroker.maxmem" },
      { key: "cpuIobroker", id: "proxmox.0.lxc.iobroker.cpu" },
      { key: "cpusIobroker", id: "proxmox.0.lxc.iobroker.cpus" },
      { key: "diskIobrokerUsage", id: "proxmox.0.lxc.iobroker.disk_lev" },
      { key: "iobrokerUptime", id: "proxmox.0.lxc.iobroker.uptime" },
    ],
  },
  {
    channel: "batteries",
    value: [
      { id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryVoltage", group: "Shelly Plus Smoke Flur OG", key: "voltage" },
      { id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent", group: "Shelly Plus Smoke Flur OG", key: "percent" },
      { id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware", group: "Shelly Plus Smoke Flur OG", key: "firmware" },
      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.0.lowBat", group: "HMIP Buero", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.0.unreach", group: "HMIP Buero", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.0.lowBat", group: "HMIP Keller Waschen", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.0.unreach", group: "HMIP Keller Waschen", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.lowBat", group: "HMIP Flur", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.unreach", group: "HMIP Flur", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.lowBat", group: "HMIP Gaeste WC", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.unreach", group: "HMIP Gaeste WC", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.0.lowBat", group: "HMIP Kueche", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.0.unreach", group: "HMIP Kueche", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.0.lowBat", group: "HMIP Esszimmer", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.0.unreach", group: "HMIP Esszimmer", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.0.lowBat", group: "HMIP Wohnzimmer links", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.0.unreach", group: "HMIP Wohnzimmer links", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.0.lowBat", group: "HMIP Wohnzimmer rechts", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.0.unreach", group: "HMIP Wohnzimmer rechts", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.lowBat", group: "HMIP Bad", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.unreach", group: "HMIP Bad", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.0.lowBat", group: "HMIP Schlafzimmer", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.0.unreach", group: "HMIP Schlafzimmer", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.0.lowBat", group: "HMIP Kinderzimmer", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.0.unreach", group: "HMIP Kinderzimmer", invertValue: true, key: "available" },
      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.0.lowBat", group: "HMIP Gaestezimmer", key: "lowBat" },
      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.0.unreach", group: "HMIP Gaestezimmer", invertValue: true, key: "available" },
      { id: "zigbee.0.00158d00045efc35.battery", group: "xioami_cellar_door", key: "percent" },
      { id: "zigbee.0.00158d00045efc35.voltage", group: "xioami_cellar_door", key: "voltage" },
      { id: "zigbee.0.00158d00045efc35.available", group: "xioami_cellar_door", key: "available" },
      { id: "zigbee.0.00158d0002e3425d.battery", group: "xioami_cellar_stair_window", key: "percent" },
      { id: "zigbee.0.00158d0002e3425d.voltage", group: "xioami_cellar_stair_window", key: "voltage" },
      { id: "zigbee.0.00158d0002e3425d.available", group: "xioami_cellar_stair_window", key: "available" },
      { id: "zigbee.0.00158d0003cb431e.battery", group: "xioami_office_window", key: "percent" },
      { id: "zigbee.0.00158d0003cb431e.voltage", group: "xioami_office_window", key: "voltage" },
      { id: "zigbee.0.00158d0003cb431e.available", group: "xioami_office_window", key: "available" },
      { id: "zigbee.0.00158d00049fd9ee.battery", group: "xioami_housedoor_right", key: "percent" },
      { id: "zigbee.0.00158d00049fd9ee.voltage", group: "xioami_housedoor_right", key: "voltage" },
      { id: "zigbee.0.00158d00049fd9ee.available", group: "xioami_housedoor_right", key: "available" },
      { id: "zigbee.0.00158d000477309a.battery", group: "xioami_floor_right", key: "percent" },
      { id: "zigbee.0.00158d000477309a.voltage", group: "xioami_floor_right", key: "voltage" },
      { id: "zigbee.0.00158d000477309a.available", group: "xioami_floor_right", key: "available" },
      { id: "zigbee.0.00158d00047e796c.battery", group: "xioami_floor_left", key: "percent" },
      { id: "zigbee.0.00158d00047e796c.voltage", group: "xioami_floor_left", key: "voltage" },
      { id: "zigbee.0.00158d00047e796c.available", group: "xioami_floor_left", key: "available" },
      { id: "zigbee.0.00158d00047e7a16.battery", group: "xioami_guest_toilet_left", key: "percent" },
      { id: "zigbee.0.00158d00047e7a16.voltage", group: "xioami_guest_toilet_left", key: "voltage" },
      { id: "zigbee.0.00158d00047e7a16.available", group: "xioami_guest_toilet_left", key: "available" },
      { id: "zigbee.0.00158d0004a03d10.battery", group: "xioami_guest_toilet_right", key: "percent" },
      { id: "zigbee.0.00158d0004a03d10.voltage", group: "xioami_guest_toilet_right", key: "voltage" },
      { id: "zigbee.0.00158d0004a03d10.available", group: "xioami_guest_toilet_right", key: "available" },
      { id: "zigbee.0.00158d0002ec5554.battery", group: "xioami_fensterkontakt_kueche_klingel", key: "percent" },
      { id: "zigbee.0.00158d0002ec5554.voltage", group: "xioami_fensterkontakt_kueche_klingel", key: "voltage" },
      { id: "zigbee.0.00158d0002ec5554.available", group: "xioami_fensterkontakt_kueche_klingel", key: "available" },
      { id: "zigbee.0.00158d000431445a.battery", group: "xioami_kitchen_window", key: "percent" },
      { id: "zigbee.0.00158d000431445a.voltage", group: "xioami_kitchen_window", key: "voltage" },
      { id: "zigbee.0.00158d000431445a.available", group: "xioami_kitchen_window", key: "available" },
      { id: "zigbee.0.00158d00047d0bcc.battery", group: "xioami_kitchen_door", key: "percent" },
      { id: "zigbee.0.00158d00047d0bcc.voltage", group: "xioami_kitchen_door", key: "voltage" },
      { id: "zigbee.0.00158d00047d0bcc.available", group: "xioami_kitchen_door", key: "available" },
      { id: "zigbee.0.00158d0004773713.battery", group: "xioami_store_window", key: "percent" },
      { id: "zigbee.0.00158d0004773713.voltage", group: "xioami_store_window", key: "voltage" },
      { id: "zigbee.0.00158d0004773713.available", group: "xioami_store_window", key: "available" },
      { id: "zigbee.0.00158d0002e3376c.battery", group: "xioami_diner_window_right", key: "percent" },
      { id: "zigbee.0.00158d0002e3376c.voltage", group: "xioami_diner_window_right", key: "voltage" },
      { id: "zigbee.0.00158d0002e3376c.available", group: "xioami_diner_window_right", key: "available" },
      { id: "zigbee.0.00158d000477238b.battery", group: "xioami_diner_window_left", key: "percent" },
      { id: "zigbee.0.00158d000477238b.voltage", group: "xioami_diner_window_left", key: "voltage" },
      { id: "zigbee.0.00158d000477238b.available", group: "xioami_diner_window_left", key: "available" },
      { id: "zigbee.0.00158d00047c617c.battery", group: "xioami_living_right", key: "percent" },
      { id: "zigbee.0.00158d00047c617c.voltage", group: "xioami_living_right", key: "voltage" },
      { id: "zigbee.0.00158d00047c617c.available", group: "xioami_living_right", key: "available" },
      { id: "zigbee.0.00158d00047ebffb.battery", group: "xioami_living_center", key: "percent" },
      { id: "zigbee.0.00158d00047ebffb.voltage", group: "xioami_living_center", key: "voltage" },
      { id: "zigbee.0.00158d00047ebffb.available", group: "xioami_living_center", key: "available" },
      { id: "zigbee.0.00158d00047d480e.battery", group: "xioami_living_left", key: "percent" },
      { id: "zigbee.0.00158d00047d480e.voltage", group: "xioami_living_left", key: "voltage" },
      { id: "zigbee.0.00158d00047d480e.available", group: "xioami_living_left", key: "available" },
      { id: "zigbee.0.00158d0004a02290.battery", group: "xioami_living_small", key: "percent" },
      { id: "zigbee.0.00158d0004a02290.voltage", group: "xioami_living_small", key: "voltage" },
      { id: "zigbee.0.00158d0004a02290.available", group: "xioami_living_small", key: "available" },
      { id: "zigbee.0.00158d00047d0d78.battery", group: "xioami_bath_window", key: "percent" },
      { id: "zigbee.0.00158d00047d0d78.voltage", group: "xioami_bath_window", key: "voltage" },
      { id: "zigbee.0.00158d00047d0d78.available", group: "xioami_bath_window", key: "available" },
      { id: "zigbee.0.00158d0004772546.battery", group: "xioami_guest_window", key: "percent" },
      { id: "zigbee.0.00158d0004772546.voltage", group: "xioami_guest_window", key: "voltage" },
      { id: "zigbee.0.00158d0004772546.available", group: "xioami_guest_window", key: "available" },
      { id: "zigbee.0.00158d0004522184.battery", group: "xioami_sleeping_door", key: "percent" },
      { id: "zigbee.0.00158d0004522184.voltage", group: "xioami_sleeping_door", key: "voltage" },
      { id: "zigbee.0.00158d0004522184.available", group: "xioami_sleeping_door", key: "available" },
      { id: "zigbee.0.00158d0004a027ee.battery", group: "xioami_sleeping_window", key: "percent" },
      { id: "zigbee.0.00158d0004a027ee.voltage", group: "xioami_sleeping_window", key: "voltage" },
      { id: "zigbee.0.00158d0004a027ee.available", group: "xioami_sleeping_window", key: "available" },
      { id: "zigbee.0.00158d0004a0224b.battery", group: "xioami_children_window", key: "percent" },
      { id: "zigbee.0.00158d0004a0224b.voltage", group: "xioami_children_window", key: "voltage" },
      { id: "zigbee.0.00158d0004a0224b.available", group: "xioami_children_window", key: "available" },
      { id: "zigbee.0.00158d0004a0234e.battery", group: "xioami_store_og_right", key: "percent" },
      { id: "zigbee.0.00158d0004a0234e.voltage", group: "xioami_store_og_right", key: "voltage" },
      { id: "zigbee.0.00158d0004a0234e.available", group: "xioami_store_og_right", key: "available" },
      { id: "zigbee.0.00158d0004772531.battery", group: "xioami_store_og_left", key: "percent" },
      { id: "zigbee.0.00158d0004772531.voltage", group: "xioami_store_og_left", key: "voltage" },
      { id: "zigbee.0.00158d0004772531.available", group: "xioami_store_og_left", key: "available" },
      { id: "zigbee.0.00158d0004314104.battery", group: "xioami_attic_right", key: "percent" },
      { id: "zigbee.0.00158d0004314104.voltage", group: "xioami_attic_right", key: "voltage" },
      { id: "zigbee.0.00158d0004314104.available", group: "xioami_attic_right", key: "available" },
      { id: "zigbee.0.00158d00047d0db9.battery", group: "xioami_attic_left", key: "percent" },
      { id: "zigbee.0.00158d00047d0db9.voltage", group: "xioami_attic_left", key: "voltage" },
      { id: "zigbee.0.00158d00047d0db9.available", group: "xioami_attic_left", key: "available" },
    ],
  },
  {
    // Zeitversatz Rolladen Auto herunter fahren
    channel: "shutterAutoDownTime",
    value: [
      { id: "0_userdata.0.Rolladen.Esszimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "esszimmerLinksDelay" },
      { id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "kuecheFensterDelay" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang_Tür", key: "schlafenTuerDelay" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "schlafenFensterDelay" },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "kinderzimmerFensterDelay" },
      { id: "0_userdata.0.Rolladen.Bad.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "badFensterDelay" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerEckeDelay" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerLinksDelay" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerMitteDelay" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "wohnzimmerRechtsDelay" },
      { id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(Tür)", key: "kuecheTuerDelay" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(links)", key: "abstellraumOgLinksDelay" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(rechts)", key: "abstellraumOgRechtsDelay" },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang", key: "gaestezimmerFensterDelay" },
      { id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung", key: "esszimmerLinksAuto" },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_runter", key: "gaestezimmerFensterAuto" },
      { id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung", key: "kuecheFensterAuto" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung", key: "schlafenTuerAuto" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rollade_Fenster_Zeitsteuerung", key: "schlafenFensterAuto" },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter", key: "kinderzimmerFensterAuto" },
      { id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung", key: "badFensterAuto" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerEckeAuto" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerLinksAuto" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerMitteAuto" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung", key: "wohnzimmerRechtsAuto" },
      { id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung", key: "kuecheTuerAuto" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv", key: "abstellraumOgLinksAuto" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv", key: "abstellraumOgRechtsAuto" },
    ],
  },
  {
    // Zeit Auto hochfahren Rolladen
    channel: "shutterAutoUp",
    value: [
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerEckeAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerLinksAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerMitteAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch", key: "wohnzimmerRechtsAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch_Tür", key: "schlafenTuerAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch", key: "schlafenFensterAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Fenster", key: "kuecheFensterAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Tür", key: "kuecheTuerAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Zeit_Rollade_hoch", key: "kinderzimmerFensterAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Esszimmer.Zeit_Rollade_hoch", key: "esszimmerLinksAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Bad.Zeit_Rollade_hoch", key: "badFensterAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_rechts", key: "abstellraumOgRechtsAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_links", key: "abstellraumOgLinksAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Zeit_Rollade_hoch", key: "gaestezimmerFensterAutoUpTime" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_links", key: "abstellraumOgLinksAutoUp" },
      { id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_rechts", key: "abstellraumOgRechtsAutoUp" },
      { id: "0_userdata.0.Rolladen.Bad.Rollade_Auto_hoch", key: "badFensterAutoUp" },
      { id: "0_userdata.0.Rolladen.Esszimmer.Rollade_Auto_hoch", key: "esszimmerLinksAutoUp" },
      { id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_hoch", key: "gaestezimmerFensterAutoUp" },
      { id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_auto_hoch", key: "kinderzimmerFensterAutoUp" },
      { id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_Tür", key: "kuecheTuerAutoUp" },
      { id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_fenster", key: "kuecheFensterAutoUp" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_fenster", key: "schlafenFensterAutoUp" },
      { id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_tuer", key: "schlafenTuerAutoUp" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerEckeAutoUp" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerLinksAutoUp" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerMitteAutoUp" },
      { id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch", key: "wohnzimmerRechtsAutoUp" },
    ],
  },
  {
    channel: "rolladen",
    value: [
      { id: "s7.1.DBs.DB1.B150", key: "wohnzimmerMittePosition" },
      { id: "s7.1.DBs.DB1.B152", key: "wohnzimmerEckePosition" },
      { id: "s7.1.DBs.DB1.B159", key: "wohnzimmerLinksPosition" },
      { id: "s7.1.DBs.DB1.B157", key: "wohnzimmerRechtsPosition" },
      { id: "s7.1.DBs.DB1.B129", key: "kuecheTuerPosition" },
      { id: "s7.1.DBs.DB1.B145", key: "kuecheFensterPosition" },
      { id: "s7.1.DBs.DB1.B136", key: "esszimmerLinksPosition" /*Einfach links für angenommen als Rollade*/ },
      { id: "s7.1.DBs.DB1.B164", key: "kinderzimmerFensterPosition" },
      { id: "s7.1.DBs.DB1.B169", key: "schlafenTuerPosition" },
      { id: "s7.2.DBs.DB1.B065", key: "schlafenFensterPosition" },
      { id: "s7.2.DBs.DB1.B073", key: "abstellraumOgLinksPosition" },
      { id: "s7.2.DBs.DB1.B057", key: "abstellraumOgRechtsPosition" },
      { id: "s7.2.DBs.DB1.B078", key: "badFensterPosition" },
      { id: "s7.2.DBs.DB1.B150", key: "gaestezimmerFensterPosition" },
    ],
  },
  {
    channel: "timers",
    value: [
      { id: "alexa-timer-vis.0.all_Timer.alive", key: "timerAlive" },
      { id: "alexa-timer-vis.0.timer1.string_2", group: "1", key: "timeString" },
      { id: "alexa-timer-vis.0.timer1.TimeEnd", group: "1", key: "timeEnd" },
      { id: "alexa-timer-vis.0.timer1.TimeStart", group: "1", key: "timeStart" },
      { id: "alexa-timer-vis.0.timer1.InputDeviceName", group: "1", key: "device" },
      { id: "alexa-timer-vis.0.timer1.name", group: "1", key: "name" },
      { id: "alexa-timer-vis.0.timer1.initialTimer", group: "1", key: "initialTimer" },
      { id: "alexa-timer-vis.0.timer2.string_2", group: "2", key: "timeString" },
      { id: "alexa-timer-vis.0.timer2.TimeEnd", group: "2", key: "timeEnd" },
      { id: "alexa-timer-vis.0.timer2.TimeStart", group: "2", key: "timeStart" },
      { id: "alexa-timer-vis.0.timer2.InputDeviceName", group: "2", key: "device" },
      { id: "alexa-timer-vis.0.timer2.name", group: "2", key: "name" },
      { id: "alexa-timer-vis.0.timer2.initialTimer", group: "2", key: "initialTimer" },
      { id: "alexa-timer-vis.0.timer3.string_2", group: "3", key: "timeString" },
      { id: "alexa-timer-vis.0.timer3.TimeEnd", group: "3", key: "timeEnd" },
      { id: "alexa-timer-vis.0.timer3.TimeStart", group: "3", key: "timeStart" },
      { id: "alexa-timer-vis.0.timer3.InputDeviceName", group: "3", key: "device" },
      { id: "alexa-timer-vis.0.timer3.name", group: "3", key: "name" },
      { id: "alexa-timer-vis.0.timer3.initialTimer", group: "3", key: "initialTimer" },
      { id: "alexa-timer-vis.0.timer4.string_2", group: "4", key: "timeString" },
      { id: "alexa-timer-vis.0.timer4.TimeEnd", group: "4", key: "timeEnd" },
      { id: "alexa-timer-vis.0.timer4.TimeStart", group: "4", key: "timeStart" },
      { id: "alexa-timer-vis.0.timer4.InputDeviceName", group: "4", key: "device" },
      { id: "alexa-timer-vis.0.timer4.name", group: "4", key: "name" },
      { id: "alexa-timer-vis.0.timer4.initialTimer", group: "4", key: "initialTimer" },
    ],
  },
  {
    channel: "tankerKoenig",
    value: [
      { id: "tankerkoenig.0.stations.cheapest.e5.name", key: "cheapestName" },
      { id: "tankerkoenig.0.stations.cheapest.e5.fullStreet", key: "cheapestFullStreet" },
      { id: "tankerkoenig.0.stations.cheapest.e5.feed", key: "cheapestPrice" },
      { id: "tankerkoenig.0.stations.jsonTable", key: "jsonTable" },
    ],
  },
  {
    channel: "fenster",
    value: [
      { id: "zigbee.0.00158d00049fd9ee.opened", key: "haustuer" },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL", key: "wohnzimmerEcke" },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "wohnzimmerLinks" },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "wohnzimmerRechts" },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster mitte open.ACTUAL", key: "wohnzimmerMitte" },
      { id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL", key: "wohnzimmerEcke" },
      { id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "gaesteWcRechts" },
      { id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "gaesteWcLinks" },
      { id: "zigbee.0.00158d0003cb431e.opened", key: "bueroFenster" },
      { id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "schlafenFenster" },
      { id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Tür open.ACTUAL", key: "schlafenTuer" },
      { id: "alias.0.Keller.Xiaomi AqaraSensoren.Tür open.Kellertür open", key: "kellerTuer" },
      { id: "alias.0.Kinderzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "kinderzimmerFenster" },
      { id: "alias.0.Bad.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "badFenster" },
      { id: "alias.0.Gästezimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "gaestezimmerFenster" },
      { id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Links open.ACTUAL", key: "esszimmerLinks" },
      { id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Rechts open.ACTUAL", key: "esszimmerRechts" },
      { id: "alias.0.Küche.Xiaomi AqaraSensoren.Tür open.ACTUAL", key: "kuecheTuer" },
      { id: "alias.0.Küche.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "kuecheFenster" },
      { id: "alias.0.Abstellraum.Xiaomi AqaraSensoren.Fenster open.ACTUAL", key: "abstellraumFenster" },
      { id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "abstellraumOgLinks" },
      { id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "abstellraumOgRechts" },
      { id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "dachbodenLinks" },
      { id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "dachbodenRechts" },
      { id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster links open.ACTUAL", key: "flurLinks" },
      { id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL", key: "flurRechts" },
      { id: "alias.0.Keller.Xiaomi AqaraSensoren.Keller Treppe.Fenster.KellerTreppe Fenster", key: "kellerFlurFenster" },
    ],
  },
  {
    channel: "styles",
    value: [{ id: "0_userdata.0.vis.calendar_styles", key: "calendarStyle" }],
  },
  {
    channel: "pv",
    value: [
      { id: "modbus.0.holdingRegisters.41069_soc", key: "batteryCharging" },
      { id: "modbus.0.holdingRegisters.41067_Active_Power", key: "activeCharging" },
      { id: "modbus.0.holdingRegisters.41079_grid_Power", key: "feedIn" },
      { id: "shelly.0.shellypro3em#ec6260976f14#1.EM0.TotalActivePower", key: "shellyFeedOut" },
      { id: "sonoff.0.Photovoltaik.ENERGY_Power", key: "smallPv" },
      { id: "0_userdata.0.Photovoltaik.Einnahme_Einspeisung", key: "profit" },
      { id: "fronius.0.inverter.1.P", key: "pvGross" },
      { id: "0_userdata.0.Photovoltaik.Einsparung_durch_PV", key: "savedMoney" },
      { id: "sonoff.0.Photovoltaik.ENERGY_Today", key: "energyDaySmall" },
      { id: "fronius.0.inverter.1.DAY_ENERGY", key: "energyDayGross" },
    ],
  },
  {
    channel: "position",
    value: [
      {
        id: "life360ng.0.people.afa1605e-1339-4bbc-921e-37b7774a75ce.gps-coordinates",
        key: "michaelCoordinates",
      },
    ],
  },
  {
    channel: "pool",
    value: [
      { id: "midas-aquatemp.0.state", key: "heaterState" },
      { id: "midas-aquatemp.0.tempSet", key: "tempSet" },
      { id: "midas-aquatemp.0.consumption", key: "consumption" },
      { id: "midas-aquatemp.0.tempIn", key: "tempIn" },
      { id: "midas-aquatemp.0.tempOut", key: "tempOut" },
      { id: "midas-aquatemp.0.rotor", key: "rotor" },
      { id: "midas-aquatemp.0.mode", key: "mode" },
      { id: "midas-aquatemp.0.info.connection", key: "status" },
      { id: "midas-aquatemp.0.silent", key: "silent" },
      { id: "shelly.0.SHPLG-S#4022D889A587#1.Relay0.Power", key: "poolPumpPower" },
      { id: "shelly.0.SHPLG-S#4022D889A587#1.Relay0.Switch", key: "poolPumpSwitch" },
      { id: "0_userdata.0.Wärmepumpe.Wärmepumpe_schalten_script", key: "heaterScriptActivateJSON" },
      { id: "0_userdata.0.Wärmepumpe.SilentModeScriptJson", key: "heaterSilentScriptJSON" },
    ],
  },
  {
    channel: "phone",
    value: [
      { id: "tr-064.0.callmonitor.ringing", key: "ringing" },
      { id: "tr-064.0.callmonitor.lastCall.timestamp", key: "lastCallTimestamp" },
      { id: "tr-064.0.callmonitor.lastCall.callerName", key: "lastCallerName" },
      { id: "tr-064.0.callmonitor.lastCall.caller", key: "lastCaller" },
      { id: "tr-064.0.callmonitor.lastCall.duration", key: "lastDuration" },
      { id: "tr-064.0.callmonitor.inbound.caller", key: "caller" },
      { id: "tr-064.0.callmonitor.inbound.callerName", key: "callerName" },
      { id: "tr-064.0.callmonitor.inbound.timestamp", key: "callerTimestamp" },
    ],
  },
  {
    channel: "lights",
    value: [
      { id: "sonoff.0.Sonoff_Wohnzimmer.POWER", key: "Wohnzimmer" },
      { id: "s7.2.DBs.DB1.M6", key: "Wohnzimmer_Ecklampe" },
      { id: "zigbee.0.a4c138d35583a3d7.state", key: "Weihnachtsbaum" },
      { id: "sonoff.0.Sonoff_Dachboden.POWER", key: "Dachboden" },
      { id: "sonoff.0.Sonoff_OG_Abstellraum.POWER", key: "Abstellraum_OG" },
      { id: "sonoff.0.Sonoff_Keller_Michi.POWER", key: "Buero" },
      { id: "tuya.0.bfec013e9034a47a12o5so.20", key: "Buero_Schreibtisch" },
    ],
  },
  {
    channel: "lightsAdditive",
    value: [{ id: "s7.2.DBs.DB1.Q11", key: "Wohnzimmer_Ecklampe" }],
  },
  {
    channel: "logs",
    value: [
      { id: "logparser.0.filters.Error.json", key: "error" },
      { id: "logparser.0.filters.Info.json", key: "info" },
      { id: "logparser.0.filters.Warn.json", key: "warning" },
      { id: "logparser.0.filters.Wärmepumpe.json", key: "heatPump" },
    ],
  },
  {
    channel: "infos",
    value: [
      { id: "admin.0.info.updatesJson", key: "updatesJson" },
      { id: "admin.0.info.updatesNumber", key: "updatesNumber" },
      { id: "admin.0.info.lastUpdateCheck", key: "lastUpdateCheck" },
      { id: "admin.0.info.newsFeed", key: "newsFeeds" },
    ],
  },
  {
    channel: "hmip",
    value: [
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valveActualTemperature", key: "children_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valvePosition", key: "children_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valveActualTemperature", key: "floor_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valvePosition", key: "floor_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valveActualTemperature", key: "living_right_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valvePosition", key: "living_right_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valveActualTemperature", key: "living_left_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valvePosition", key: "living_left_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valveActualTemperature", key: "kitchen_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valvePosition", key: "kitchen_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valveActualTemperature", key: "guest_wc_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valvePosition", key: "guest_wc_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valveActualTemperature", key: "bath_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valvePosition", key: "bath_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valveActualTemperature", key: "sleeping_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valvePosition", key: "sleeping_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valveActualTemperature", key: "dining_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valvePosition", key: "dining_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valveActualTemperature", key: "washing_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valvePosition", key: "washing_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valveActualTemperature", key: "guest_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valvePosition", key: "guest_valvePosition" },

      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valveActualTemperature", key: "office_valveActualTemp" },
      { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valvePosition", key: "office_valvePosition" },
    ],
  },
  {
    channel: "heating",
    value: [
      { id: "s7.0.DBs.DB1.I6_-_NQ5", key: "automatic" },
      { id: "s7.0.DBs.DB1.I5_-_NQ2", key: "level" },
      { id: "s7.0.DBs.DB1.NQ13", key: "active" },
      { id: "s7.0.DBs.DB1.NQ15", key: "autoSolar" },
      { id: "s7.0.DBs.DB1.B059", key: "heatingTemperature" },
      { id: "s7.0.DBs.DB1.B054", key: "heatingSolar" },
      { id: "s7.0.DBs.DB1.B068", key: "heatingBuffer" },
      { id: "mqtt.0.oeg.43_T6_Puffer_Mitte_Ist-Wert", key: "heatingBufferMiddle" },
      { id: "mqtt.0.oeg.42_T5_Puffer_Brauchwasser_Ist-Wert", key: "heatingBufferTop" },
      { id: "s7.0.DBs.DB1.B076", key: "solarMaxToday" },
      { id: "s7.0.DBs.DB1.B085", key: "solarMax" },
      { id: "s7.0.DBs.DB1.NQ12", key: "pelletExist" },
      { id: "s7.0.DBs.DB1.I3_-_NQ3", key: "watcherAdmitter" },
      { id: "s7.0.DBs.DB1.I4_-_NQ4", key: "tempPelletBuffer" },
      { id: "s7.0.DBs.DB1.NQ14", key: "confirmMessage" },
      { id: "s7.0.DBs.DB1.I1_-_NQ1", key: "snail" },
      { id: "s7.0.DBs.DB1.NQ8", key: "spiral" },
      { id: "s7.0.DBs.DB1.B004", key: "maxTimeToFill" },
      { id: "s7.0.DBs.DB1.B008", key: "offsetFilling" },
      { id: "s7.0.DBs.DB1.B061", key: "tempPumpOn" },
      { id: "s7.0.DBs.DB1.B061_2", key: "tempPumpOff" },
      { id: "s7.0.DBs.DB1.B067", key: "diffSolarBuffer" },
      { id: "s7.0.DBs.DB1.B069", key: "minFillTemp" },
      { id: "s7.0.DBs.DB1.B056", key: "maxFillTemp" },
      { id: "s7.0.DBs.DB1.Q3_-_NQ10", key: "solarPump" },
      { id: "s7.0.DBs.DB1.Q4_-_NQ11", key: "heatingPump" },
    ],
  },
  {
    channel: "energy",
    value: [
      { id: "sonoff.0.Steckdose_Waschmaschine .ENERGY_Power", key: "Waschmaschine" },
      { id: "sonoff.0.Tasmota Kühltruhe.ENERGY_Power", key: "Kuehltruhe" },
      { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack" },
      { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack" },
      { id: "0_userdata.0.Photovoltaik.Bezug_Tag", key: "energyReceived" },
      { id: "0_userdata.0.Photovoltaik.Einspeisung_Tag", key: "energyReturned" },
    ],
  },
  {
    channel: "calendar",
    value: [{ id: "ical.1.data.table", key: "table" }],
  },
  {
    channel: "airConditioners",
    value: [
      { id: "tuya.0.bf371cfe643bf102afauv6.online", key: "schlafenOnline" },
      { id: "tuya.0.bf371cfe643bf102afauv6.1", key: "schlafenPowerStatus" },
      { id: "shelly.0.SHPLG-S#4022D8894549#1.Relay0.Power", key: "schlafenPower" },
      { id: "tuya.0.bf371cfe643bf102afauv6.8", key: "schlafenIsTemp" },
      { id: "tuya.0.bf371cfe643bf102afauv6.5", key: "schlafenSetTemp" },

      { id: "tuya.0.bf57f6b83543b4f45dwh13.online", key: "childOnline" },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.1", key: "childPowerStatus" },
      { id: "shelly.0.SHPLG-S#4022D8895174#1.Relay0.Power", key: "childPower" },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.8", key: "childIsTemp" },
      { id: "tuya.0.bf57f6b83543b4f45dwh13.5", key: "childSetTemp" },
    ],
  },
  {
    channel: "landroid",
    value: [
      { id: "worx.0.202330294701005409AD.mower.batteryState", key: "battery" },
      { id: "worx.0.202330294701005409AD.mower.totalDistance", key: "totalDistance" },
      { id: "worx.0.202330294701005409AD.mower.totalBladeTime", key: "totalBladeTime" },
      { id: "worx.0.202330294701005409AD.mower.status", key: "status" },
      { id: "worx.0.202330294701005409AD.mower.online", key: "online" },
      { id: "worx.0.202330294701005409AD.mower.firmware", key: "firmware" },
      { id: "worx.0.202330294701005409AD.mower.error", key: "error" },
      { id: "worx.0.202330294701005409AD.mower.edgecut", key: "edgecut" },
      { id: "worx.0.202330294701005409AD.mower.batteryCharging", key: "batteryCharging" },
    ],
  },
  {
    channel: "trash",
    value: [{ id: "trashschedule.0.type.json", key: "json" }],
  },
  {
    channel: "alexaLists",
    value: [
      { id: "alexa-shoppinglist.0.list_activ", key: "shoppingListActive" },
      { id: "alexa-shoppinglist.1.list_activ", key: "michaelsTodoList" },
    ],
  },
  {
    channel: "time",
    value: [
      {
        id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter",
        key: "sonnenuntergang",
      },
    ],
  },
  {
    channel: "holiday",
    value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv", key: "urlaubAktiv" }],
  },
  {
    channel: "windowGlobal",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen", key: "fensterOffen" }],
  },
] as const satisfies readonly IobrokerSubscription[];
