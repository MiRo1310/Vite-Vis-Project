import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface Heating {
  automatic: StoreValue<boolean>;
  level: StoreValue<boolean>;
  active: StoreValue<boolean>;
  autoSolar: StoreValue<boolean>;
  heatingTemperature: StoreValue<number>;
  heatingBuffer: StoreValue<number>;
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
}

export const heating: IdToSubscribe<Heating> = {
  storeFolder: "heating",
  value: [
    { id: "s7.0.DBs.DB1.I6_-_NQ5", key: "automatic" },
    { id: "s7.0.DBs.DB1.I5_-_NQ2", key: "level" },
    { id: "s7.0.DBs.DB1.NQ13", key: "active" },
    { id: "s7.0.DBs.DB1.NQ15", key: "autoSolar" },
    { id: "s7.0.DBs.DB1.B059", key: "heatingTemperature" },
    { id: "s7.0.DBs.DB1.B054", key: "heatingSolar" },
    { id: "s7.0.DBs.DB1.B068", key: "heatingBuffer" },
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
};

export interface HeatingControlType {
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
}

export const heatingControl: IdToSubscribe<HeatingControlType> = {
  storeFolder: "heatingControl",
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
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

addItems();

function addItems() {
  for (const day of days) {
    for (let period = 1; period < 6; period++) {
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.Temperature`,
        key: `${day}.${period}.temp` as keyof HeatingControlType,
      });
      heatingControl.value.push({
        id: `heatingcontrol.0.vis.ProfileTypes.${day}.Periods.${period}.time`,
        key: `${day}.${period}.time` as keyof HeatingControlType,
      });
    }
  }
}
