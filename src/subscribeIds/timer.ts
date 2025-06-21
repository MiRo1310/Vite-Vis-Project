import { IdToSubscribe, Timer1, Timer2, Timer3, Timer4, TimerObject } from "@/types/types.ts";

export const timer: IdToSubscribe<TimerObject> = {
  // Timer
  storeFolder: "showTimerCard",
  value: [{ id: "alexa-timer-vis.0.all_Timer.alive", key: "timerAlive" }],
};

export const timer1: IdToSubscribe<Timer1> = {
  // Timer 1
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer1.string_2",
      key: "timer1String",
    },
    {
      id: "alexa-timer-vis.0.timer1.TimeEnd",
      key: "timer1TimeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer1.TimeStart",
      key: "timer1TimeStart",
    },
    {
      id: "alexa-timer-vis.0.timer1.InputDeviceName",
      key: "timer1Device",
    },
    {
      id: "alexa-timer-vis.0.timer1.name",
      key: "timer1Name",
    },
  ],
};

export const timer2: IdToSubscribe<Timer2> = {
  // Timer 2
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer2.string_2",
      key: "timer2String",
    },
    {
      id: "alexa-timer-vis.0.timer2.TimeEnd",
      key: "timer2TimeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer2.TimeStart",
      key: "timer2TimeStart",
    },
    {
      id: "alexa-timer-vis.0.timer2.InputDeviceName",
      key: "timer2Device",
    },
    {
      id: "alexa-timer-vis.0.timer2.name",
      key: "timer2Name",
    },
  ],
};
export const timer3: IdToSubscribe<Timer3> = {
  // Timer 3
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer3.string_2",
      key: "timer3String",
    },
    {
      id: "alexa-timer-vis.0.timer3.TimeEnd",
      key: "timer3TimeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer3.TimeStart",
      key: "timer3TimeStart",
    },
    {
      id: "alexa-timer-vis.0.timer3.InputDeviceName",
      key: "timer3Device",
    },
    {
      id: "alexa-timer-vis.0.timer3.name",
      key: "timer3Name",
    },
  ],
};
export const timer4: IdToSubscribe<Timer4> = {
  // Timer 4
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer4.string_2",
      key: "timer4String",
    },
    {
      id: "alexa-timer-vis.0.timer4.TimeEnd",
      key: "timer4TimeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer4.TimeStart",
      key: "timer4TimeStart",
    },
    {
      id: "alexa-timer-vis.0.timer4.InputDeviceName",
      key: "timer4Device",
    },
    {
      id: "alexa-timer-vis.0.timer4.name",
      key: "timer4Name",
    },
  ],
};
