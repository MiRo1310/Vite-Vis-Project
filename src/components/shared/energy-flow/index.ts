import { Line } from "@/components/shared/energy-flow/utils.ts";
import { FunctionalComponent } from "vue";
import { LucideProps } from "lucide-vue-next";

export interface Point {
  x: number;
  y: number;
}

export type TEnergyFlowArray<T extends PropertyKey> = IEnergyFlow<T>[];

export interface IEnergyFlow<T extends PropertyKey> {
  id: T;
  position: { row: number; col: number; options?: { offsetY?: number; offsetX?: number } };
  title?: string;
  icon?: IEnergyFlowIcon;
  values: IEnergyFlowCardValue[];
  lines: Line<T>[];
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
  value: number | string;
  unit?: string;
  fontSize?: number;
  textAnchor?: TTextAnchor;
  colorHex?: string;
  icon?: IEnergyFlowIcon;
}

export type TTextAnchor = "start" | "middle" | "end" | "inherit";

export interface IEnergyFlowIcon {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  svg: FunctionalComponent<LucideProps, object, any, object>;
  // color?: string;
  width?: number;
  height?: number;
  class?: string;
  size?: number;
  offsetX?: number;
  offsetY?: number;
}
