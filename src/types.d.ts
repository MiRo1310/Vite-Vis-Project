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
