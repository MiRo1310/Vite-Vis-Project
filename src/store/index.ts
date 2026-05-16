import { Store, StoreDefinition } from "pinia";
import { AirConditionersIobroker } from "../iobroker-states/states-subscribed/air-conditioners.iobroker.ts";
import { BatteriesTypeIobroker } from "../iobroker-states/states-subscribed/batteriesType.iobroker.ts";
import { CalendarIobroker } from "../iobroker-states/states-subscribed/calendar.iobroker.ts";
import { IdsToControl, IobrokerState, Log, LogReset, TimerObject, Timers } from "@/types/types.ts";
import { HeatingControlType, HeatingIobroker } from "../iobroker-states/states-subscribed/heating.iobroker.ts";
import {
  AlexaListStates,
  HolidayStates,
  TimeStates,
  TrashStates,
  WindowGlobalStates,
} from "../iobroker-states/states-subscribed/diverse.iobroker.ts";
import { Infos } from "../iobroker-states/states-subscribed/info.iobroker.ts";
import { LandroidIobroker } from "../iobroker-states/states-subscribed/landroid.iobroker.ts";
import { LightTypes, LightTypesAdditive } from "../iobroker-states/states-subscribed/light.iobroker.ts";
import { LogStates } from "../iobroker-states/states-subscribed/logs.iobroker.ts";
import { PhoneStates } from "../iobroker-states/states-subscribed/phone.iobroker.ts";
import { PoolIobroker } from "../iobroker-states/states-subscribed/pool.iobroker.ts";
import { StylesType } from "../iobroker-states/states-subscribed/styles.iobroker.ts";
import { WetterIobroker } from "../iobroker-states/states-subscribed/wetter.iobroker.ts";
import { HmipIobroker } from "../iobroker-states/states-subscribed/hmip.iobroker.ts";
import { ComputedRef } from "vue";
import { AlexaAction } from "@/pages/vis/alexa.vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";
import { TankerKoenig } from "../iobroker-states/states-subscribed/tankerkoenig.iobroker.ts";
import { EnergyStates } from "../iobroker-states/states-subscribed/energy.iobroker.ts";
import { IPvStates } from "../iobroker-states/states-subscribed/pv-ids.iobroker.ts";
import { WindowType } from "@/iobroker-states/states-subscribed/window.iobroker.ts";
import { IShutter } from "@/iobroker-states/states-subscribed/shutter-auto-up-time.iobroker.ts";
import { PositionIobroker } from "@/iobroker-states/states-subscribed/position.iobroker.ts";

export interface AppStore {
  showTimer: boolean;
}

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  wetter: WetterIobroker;
  hmip: HmipIobroker;
  idsToControl: IdsToControl;
  shutterAutoUp: IShutter;
  shutterAutoDownTime: IShutter;
  timers: Timers;
  rolladen: IShutter;
  fenster: WindowType;
  pv: IPvStates;
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
  holiday: HolidayStates;
  windowGlobal: WindowGlobalStates;
  time: TimeStates;
  showTimerCard: TimerObject;
  heatingControl: HeatingControlType;
  airConditioners: AirConditionersIobroker;
  energy: EnergyStates;
  tankerKoenig: TankerKoenig;
  position: PositionIobroker;
}

export type StoreValue<T> = StoreValueType<T> | undefined;

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
