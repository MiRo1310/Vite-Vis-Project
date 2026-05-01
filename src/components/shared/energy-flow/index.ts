import { UseElementBoundingReturn } from "@vueuse/core";

export interface Point {
  x: number;
  y: number;
}

export interface IEnergyFlow {
  title: string;
  id: string;
  in?: IEnergyFlowOutIn;
  out?: IEnergyFlowOutIn;
}

export interface IEnergyFlowOutIn {
  value: number;
  unit?: string;
  class?: string;
}

export interface IEnergyFlowUpdatePosition {
  elementBounding: UseElementBoundingReturn;
  id: string;
}
