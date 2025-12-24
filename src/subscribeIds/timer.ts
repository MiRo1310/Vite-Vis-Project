import { IdToSubscribe, Timer, TimerObject, Timers } from "@/types/types.ts";

export const timer: IdToSubscribe<TimerObject> = {
  storeFolder: "showTimerCard",
  value: [{ id: "alexa-timer-vis.0.all_Timer.alive", key: "timerAlive" }],
};

export const timers: IdToSubscribe<Timers, keyof Timer> = {
  storeFolder: "timer",
  value: [
    { id: "alexa-timer-vis.0.timer1.string_2", key: 1, subKey: "timeString" },
    { id: "alexa-timer-vis.0.timer1.TimeEnd", key: 1, subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer1.TimeStart", key: 1, subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer1.InputDeviceName", key: 1, subKey: "device" },
    { id: "alexa-timer-vis.0.timer1.name", key: 1, subKey: "name" },
    { id: "alexa-timer-vis.0.timer1.initialTimer", key: 1, subKey: "initialTimer" },
    { id: "alexa-timer-vis.0.timer2.string_2", key: 2, subKey: "timeString" },
    { id: "alexa-timer-vis.0.timer2.TimeEnd", key: 2, subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer2.TimeStart", key: 2, subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer2.InputDeviceName", key: 2, subKey: "device" },
    { id: "alexa-timer-vis.0.timer2.name", key: 2, subKey: "name" },
    { id: "alexa-timer-vis.0.timer2.initialTimer", key: 2, subKey: "initialTimer" },
    { id: "alexa-timer-vis.0.timer3.string_2", key: 3, subKey: "timeString" },
    { id: "alexa-timer-vis.0.timer3.TimeEnd", key: 3, subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer3.TimeStart", key: 3, subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer3.InputDeviceName", key: 3, subKey: "device" },
    { id: "alexa-timer-vis.0.timer3.name", key: 3, subKey: "name" },
    { id: "alexa-timer-vis.0.timer3.initialTimer", key: 3, subKey: "initialTimer" },
    { id: "alexa-timer-vis.0.timer4.string_2", key: 4, subKey: "timeString" },
    { id: "alexa-timer-vis.0.timer4.TimeEnd", key: 4, subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer4.TimeStart", key: 4, subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer4.InputDeviceName", key: 4, subKey: "device" },
    { id: "alexa-timer-vis.0.timer4.name", key: 4, subKey: "name" },
    { id: "alexa-timer-vis.0.timer4.initialTimer", key: 4, subKey: "initialTimer" },
  ],
};
