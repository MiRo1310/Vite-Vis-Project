import { Line } from "@/components/shared/energy-flow/utils.ts";
import { FunctionalComponent } from "vue";
import { LucideProps } from "lucide-vue-next";

export interface Point {
  x: number;
  y: number;
}

export interface IEnergyFlow {
  id: string;
  x: number;
  y: number;
  title: string;
  icon?: IEnergyFlowIcon;
  values: IEnergyFlowCardValue[];
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

export interface IEnergyFlowCardValue {
  value: number;
  unit?: string;
  class?: string;
  fontSize?: number;
  textAnchor?: TTextAnchor;
  fill?: string;
}

export type TTextAnchor = "start" | "middle" | "end" | "inherit";

export interface IEnergyFlowIcon {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  icon: FunctionalComponent<LucideProps, object, any, object>;
  color?: string;
}
