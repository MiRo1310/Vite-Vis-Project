import { FunctionalComponent } from "vue";
import { LucideProps } from "lucide-vue-next";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";

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
  lines: ILineObject<T>[];
  padding?: number;
  fillColor?: string;
  stroke?: HexColors;
  strokeWidth?: number;
  type?: "circle" | "react";
  react?: IReact;
  circle?: ICircle;
  clickHandler?: () => void;
}

export interface ILineObject<T extends PropertyKey> {
  lineStart: ILineEndPoint<T>;
  lineEnd: ILineEndPoint<T>;
  value: TValue;
  options?: {
    dotsPerGroup?: number;
    particleShape?: TParticleShape;
    lineHeight?: number;
    speed?: number;
    autoSpeed?: IAutoSpeed;
    lineWidth?: number;
    groupCount?: number;
    spacing?: number;
    strokeWidth?: number;
    dotRadius?: number;
    flowColorHex?: { positive: HexColors; negative?: HexColors };
    reverse?: TReverse;
    active?: boolean;
  };
}

export interface IBoxValues {
  x: number;
  y: number;
  width: number;
  height: number;
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

export type TValue = number | number[];

export interface IEnergyFlowCardValue {
  value: TValue | string;
  unit?: string;
  fontSize?: number;
  textAnchor?: TTextAnchor;
  colorHex?: HexColors;
  icon?: IEnergyFlowIcon;
  offsetX?: number;
  offsetY?: number;
}

export type TTextAnchor = "start" | "middle" | "end" | "inherit";

export interface IEnergyFlowIcon {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  svg: FunctionalComponent<LucideProps, object, any, object>;
  width?: number;
  height?: number;
  class?: string;
  size?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface IAutoSpeed {
  active?: boolean;
  max: number;
  min: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export type TPositions = "top" | "bottom" | "left" | "right";
export type TReverse = "greaterThan" | "lessThan";
export interface ILineEndPoint<T> {
  id: T;
  position: TPositions;
  offsetX?: number;
  offsetY?: number;
}

export type TParticleShape = "circle" | "line";

export interface IEnergyFlowAnchorSegment {
  startPoint: Point;
  exitPoint: Point;
}
