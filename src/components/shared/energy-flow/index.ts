import { Line } from "@/components/shared/energy-flow/utils.ts";

export interface Point {
  x: number;
  y: number;
}

export interface IEnergyFlow {
  id: string;
  x: number;
  y: number;
  title: string;
  in?: IEnergyFlowOutIn;
  out?: IEnergyFlowOutIn;
  lines: Line[];
  padding?: number;
  fillColor?: string;
  stroke?: string;
  strokeWidth?: number;
  type?: "circle" | "react";
  react?: IReact;
  circle?: ICircle;
}

export interface ICircle {
  radius?: number;
}

export interface IReact {
  width?: number;
  height?: number;
  radiusX?: number;
  radiusY?: number;
}

export interface IEnergyFlowOutIn {
  value: number;
  unit?: string;
  class?: string;
}
