import { IdToSubscribe, Timer1, Timer2, Timer3, Timer4, TimerObject } from "@/types";

export const timer: IdToSubscribe<TimerObject> = {
  // Timer
  objectNameInStore: "showTimerCard",
  value: [{ id: "alexa-timer-vis.0.all_Timer.alive" }],
};

export const timer1: IdToSubscribe<Timer1> = {
  // Timer 1
  objectNameInStore: "timer",
  value: [
    { id: "alexa-timer-vis.0.timer1.string_2", firstKey: "timer1", subKey: "string" },
    { id: "alexa-timer-vis.0.timer1.TimeEnd", firstKey: "timer1", subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer1.TimeStart", firstKey: "timer1", subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer1.InputDeviceName", firstKey: "timer1", subKey: "device" },
    { id: "alexa-timer-vis.0.timer1.name", firstKey: "timer1", subKey: "name" },
  ],
};

export const timer2: IdToSubscribe<Timer2> = {
  // Timer 2
  objectNameInStore: "timer",
  value: [
    { id: "alexa-timer-vis.0.timer2.string_2", firstKey: "timer2", subKey: "string" },
    { id: "alexa-timer-vis.0.timer2.TimeEnd", firstKey: "timer2", subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer2.TimeStart", firstKey: "timer2", subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer2.InputDeviceName", firstKey: "timer2", subKey: "device" },
    { id: "alexa-timer-vis.0.timer2.name", firstKey: "timer2", subKey: "name" },
  ],
};
export const timer3: IdToSubscribe<Timer3> = {
  // Timer 3
  objectNameInStore: "timer",
  value: [
    { id: "alexa-timer-vis.0.timer3.string_2", firstKey: "timer3", subKey: "string" },
    { id: "alexa-timer-vis.0.timer3.TimeEnd", firstKey: "timer3", subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer3.TimeStart", firstKey: "timer3", subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer3.InputDeviceName", firstKey: "timer3", subKey: "device" },
    { id: "alexa-timer-vis.0.timer3.name", firstKey: "timer3", subKey: "name" },
  ],
};
export const timer4: IdToSubscribe<Timer4> = {
  // Timer 4
  objectNameInStore: "timer",
  value: [
    { id: "alexa-timer-vis.0.timer4.string_2", firstKey: "timer4", subKey: "string" },
    { id: "alexa-timer-vis.0.timer4.TimeEnd", firstKey: "timer4", subKey: "timeEnd" },
    { id: "alexa-timer-vis.0.timer4.TimeStart", firstKey: "timer4", subKey: "timeStart" },
    { id: "alexa-timer-vis.0.timer4.InputDeviceName", firstKey: "timer4", subKey: "device" },
    { id: "alexa-timer-vis.0.timer4.name", firstKey: "timer4", subKey: "name" },
  ],
};
