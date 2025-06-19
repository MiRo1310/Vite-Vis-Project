import {
  IdToSubscribe,
  Timer1,
  Timer2,
  Timer3,
  Timer4,
  TimerObject,
} from "@/types/types.ts";

export const timer: IdToSubscribe<TimerObject> = {
  // Timer
  storeFolder: "showTimerCard",
  value: [{ id: "alexa-timer-vis.0.all_Timer.alive" }],
};

export const timer1: IdToSubscribe<Timer1> = {
  // Timer 1
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer1.string_2",
      key: "timer1",
      secondKey: "string",
    },
    {
      id: "alexa-timer-vis.0.timer1.TimeEnd",
      key: "timer1",
      secondKey: "timeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer1.TimeStart",
      key: "timer1",
      secondKey: "timeStart",
    },
    {
      id: "alexa-timer-vis.0.timer1.InputDeviceName",
      key: "timer1",
      secondKey: "device",
    },
    {
      id: "alexa-timer-vis.0.timer1.name",
      key: "timer1",
      secondKey: "name",
    },
  ],
};

export const timer2: IdToSubscribe<Timer2> = {
  // Timer 2
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer2.string_2",
      key: "timer2",
      secondKey: "string",
    },
    {
      id: "alexa-timer-vis.0.timer2.TimeEnd",
      key: "timer2",
      secondKey: "timeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer2.TimeStart",
      key: "timer2",
      secondKey: "timeStart",
    },
    {
      id: "alexa-timer-vis.0.timer2.InputDeviceName",
      key: "timer2",
      secondKey: "device",
    },
    {
      id: "alexa-timer-vis.0.timer2.name",
      key: "timer2",
      secondKey: "name",
    },
  ],
};
export const timer3: IdToSubscribe<Timer3> = {
  // Timer 3
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer3.string_2",
      key: "timer3",
      secondKey: "string",
    },
    {
      id: "alexa-timer-vis.0.timer3.TimeEnd",
      key: "timer3",
      secondKey: "timeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer3.TimeStart",
      key: "timer3",
      secondKey: "timeStart",
    },
    {
      id: "alexa-timer-vis.0.timer3.InputDeviceName",
      key: "timer3",
      secondKey: "device",
    },
    {
      id: "alexa-timer-vis.0.timer3.name",
      key: "timer3",
      secondKey: "name",
    },
  ],
};
export const timer4: IdToSubscribe<Timer4> = {
  // Timer 4
  storeFolder: "timer",
  value: [
    {
      id: "alexa-timer-vis.0.timer4.string_2",
      key: "timer4",
      secondKey: "string",
    },
    {
      id: "alexa-timer-vis.0.timer4.TimeEnd",
      key: "timer4",
      secondKey: "timeEnd",
    },
    {
      id: "alexa-timer-vis.0.timer4.TimeStart",
      key: "timer4",
      secondKey: "timeStart",
    },
    {
      id: "alexa-timer-vis.0.timer4.InputDeviceName",
      key: "timer4",
      secondKey: "device",
    },
    {
      id: "alexa-timer-vis.0.timer4.name",
      key: "timer4",
      secondKey: "name",
    },
  ],
};
