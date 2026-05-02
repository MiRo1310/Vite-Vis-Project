import { Line } from "@/components/shared/energy-flow/utils.ts";

export interface Point {
  x: number;
  y: number;
}

export interface IEnergyFlow {
  id: string;
  title: string;
  in?: IEnergyFlowOutIn;
  out?: IEnergyFlowOutIn;
  lines: Line[];
  padding?: number;
}

export interface IEnergyFlowOutIn {
  value: number;
  unit?: string;
  class?: string;
  reverse?: boolean;
}
