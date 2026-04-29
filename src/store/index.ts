import { Store, StoreDefinition } from "pinia";
import { AirConditionersIobroker } from "@/subscribeIds/air-conditioners.iobroker.ts";
import { BatteriesTypeIobroker } from "@/subscribeIds/batteriesType.iobroker.ts";
import { CalendarIobroker } from "@/subscribeIds/calendar.iobroker.ts";
import { IdsToControl, IobrokerState, Log, LogReset, Pv, Shutter, TimerObject, Timers, WindowType } from "@/types/types.ts";
import { HeatingControlType, HeatingIobroker } from "@/subscribeIds/heating.iobroker.ts";
import { AlexaListStates, HolidayStates, TimeStates, TrashStates, WindowGlobalStates } from "@/subscribeIds/diverse.iobroker.ts";
import { Infos } from "@/subscribeIds/info.iobroker.ts";
import { LandroidIobroker } from "@/subscribeIds/landroid.iobroker.ts";
import { LightTypes, LightTypesAdditive } from "@/subscribeIds/light.iobroker.ts";
import { LogStates } from "@/subscribeIds/logs.iobroker.ts";
import { PhoneStates } from "@/subscribeIds/phone.iobroker.ts";
import { PoolIobroker } from "@/subscribeIds/pool.iobroker.ts";
import { PresenceType } from "@/subscribeIds/presence.iobroker.ts";
import { StylesType } from "@/subscribeIds/styles.iobroker.ts";
import { WetterIobroker } from "@/subscribeIds/wetter.iobroker.ts";
import { HmipIobroker } from "@/subscribeIds/hmip.iobroker.ts";
import { ComputedRef } from "vue";
import { AlexaAction } from "@/pages/vis/alexa.vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";

export interface AppStore {
  showTimer: boolean;
}

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  wetter: WetterIobroker;
  hmip: HmipIobroker;
  idsToControl: IdsToControl;
  shutterAutoUp: Shutter;
  shutterAutoDownTime: Shutter;
  timers: Timers;
  rolladen: Shutter;
  fenster: WindowType;
  pv: Pv;
  trash: TrashStates;
  alexaLists: AlexaListStates;
  pool: PoolIobroker;
  landroid: LandroidIobroker;
  calendar: CalendarIobroker;
  heating: HeatingIobroker;
  logs: LogStates;
  logReset: LogReset;
  heatingTimeSlot: HeatingTimeSlot;
  infos: Infos;
  phone: PhoneStates;
  batteries: BatteriesTypeIobroker;
  alexaAction: AlexaAction;
  lights: LightTypes;
  lightsAdditive: LightTypesAdditive;
  styles: StylesType;
  presence: PresenceType;
  holiday: HolidayStates;
  windowGlobal: WindowGlobalStates;
  time: TimeStates;
  showTimerCard: TimerObject;
  heatingControl: HeatingControlType;
  airConditioners: AirConditionersIobroker;
}

export type StoreValue<T> = StoreValueType<T> | undefined;
export type StoreValueWithTimestamp<T> = (StoreValueType<T> & Timestamp) | undefined;

export interface Timestamp {
  ts: number;
}

export interface StoreValueType<T> {
  val: T | undefined;
  id: string;
  ack: boolean;
  ts?: number;
  lc?: number;
  from?: string;
  q?: number;
}

export interface ParsedLogs {
  error: Log[];
  warn: Log[];
  info: Log[];
}

export interface SetValues {
  storeFolder: keyof IoBrokerStoreState;
  val: string | number | boolean | object | null;
  id: string;
  key: string;
  subKey?: string;
  timestamp?: boolean;
  state: IobrokerState;
}

export type IoBrokerStates = keyof IoBrokerStoreState;

interface IoBrokerStoreActions {
  setAdminConnection(val: boolean): void;
  resetIdsToSubscribe(): void;
  addIdToSubscribedIds(id: string): void;
  removeIdFromSubscribedIds(id: string): void;
  setValues(params: SetValues): void;
}

interface IoBrokerStoreGetters {
  isAdminConnected(state: IoBrokerStoreState): boolean;
  getTrash(state: IoBrokerStoreState): TrashStates;
  getShoppinglist(state: IoBrokerStoreState): AlexaListStates;
  getState(state: IoBrokerStoreState): IoBrokerStoreState;
  getIdsToControl(state: IoBrokerStoreState): IdsToControl;
  getParsedLogs(state: IoBrokerStoreState): ComputedRef<ParsedLogs>;
}

export type StoreType = StoreDefinition<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;
export type IoBrokerStore = Store<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;

export interface IRecipeGroupToDelete {
  groupPosition: number;
  recipeId: string;
}

export interface IRecipeStore {
  recipeInProgress: (TFormValues & { recipeId?: string }) | null;
  recipeGroupIdsToDelete: IRecipeGroupToDelete[];
  recipeProductIdsToDelete: string[];
  recipeDescriptionIdsToDelete: string[];
  productGroupsCount: number;
  shouldValidate: boolean;
  directlyOpenNewProductModal: boolean;
  lastRecipes: TRecipe[];
}

export type TRecipe = TGroupedRecipesByCategory[number][number];
