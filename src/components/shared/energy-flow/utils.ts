import { computed } from "vue";
import { isDefined } from "@vueuse/core";

export class PositionHandler {
  private readonly id: string;
  private left: number = 0;
  private top: number = 0;
  private bottom: number = 0;
  private right: number = 0;
  private heightCenter: number = 0;
  private widthCenter: number = 0;

  private readonly padding: number = 10;

  constructor(id: string, options?: { padding?: number }) {
    this.id = id;
    this.padding = options?.padding ?? this.padding;
  }

  public updatePosition(x: number, y: number, height: number, width: number, border: number) {
    const halfHeight = height / 2;
    const halfWidth = width / 2;
    this.top = y - halfHeight - this.padding - border;
    this.bottom = y + halfHeight + this.padding + border;
    this.left = x - halfWidth - this.padding - border;
    this.right = x + halfWidth + this.padding + border;
    this.heightCenter = y;
    this.widthCenter = x;
  }

  public getId() {
    return this.id;
  }

  public getPosition() {
    return {
      left: this.left,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      heightCenter: this.heightCenter,
      widthCenter: this.widthCenter,
    };
  }
}

export class Positions {
  private positions: Record<string, PositionHandler> = {};

  public updatePositionsForCard(handler: PositionHandler) {
    this.positions[handler.getId()] = handler;
  }

  public getPositionsById(id: string) {
    return (
      this.positions[id]?.getPosition() ?? {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        heightCenter: 0,
        widthCenter: 0,
      }
    );
  }

  public getCoordinatesRightCenter(id: string, offsetX: number, offsetY: number) {
    const position = this.getPositionsById(id);

    return {
      x: position.right + offsetX,
      y: position.heightCenter + offsetY,
    };
  }

  public getCoordinatesLeftCenter(id: string, offsetX: number, offsetY: number) {
    const position = this.getPositionsById(id);
    return {
      x: position.left + offsetX,
      y: position.heightCenter + offsetY,
    };
  }

  public getCoordinatesBottomCenter(id: string, offsetX: number, offsetY: number) {
    const position = this.getPositionsById(id);
    return {
      x: position.widthCenter + offsetX,
      y: position.bottom + offsetY,
    };
  }

  public getCoordinatesTopCenter(id: string, offsetX: number, offsetY: number) {
    const position = this.getPositionsById(id);
    return {
      x: position.widthCenter + offsetX,
      y: position.top + offsetY,
    };
  }
}

interface IAutoSpeed {
  active?: boolean;
  max: number;
  min: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export type TReverse = "greaterThan" | "lessThan";
export type LineStartEnd = "leftRightCenter" | "bottomTopCenter" | "bottomTopCenterDiagonal";
export type TParticleShape = "circle" | "line";
export class Line {
  private readonly lineEndId: string;
  private readonly lineStartId: string;
  private readonly lineStartEnd: LineStartEnd;
  private readonly offsetXStart: number = 0;
  private readonly offsetYStart: number = 0;
  private readonly offsetXEnd: number = 0;
  private readonly offsetYEnd: number = 0;
  private readonly autoSpeed: IAutoSpeed = {
    active: false,
    max: 100,
    min: 0,
    maxSpeed: 100,
    minSpeed: 0,
  };
  private readonly reverse: TReverse = "greaterThan";
  private readonly active: boolean = true;
  private dotsPerRow = 3;
  private particleShape: TParticleShape = "circle";
  private lineHeight = 3;
  private speed = 50;
  private lineWidth = 10;
  private groupCount = 2;
  private spacing = 0.25;
  private strokeWidth = 10;
  private dotRadius = 4;
  private flowColorHex = { positive: "#58ea38", negative: "#ff0000" };
  private readonly value: number = 0;

  // eslint-disable-next-line complexity
  constructor(
    lineStartId: string,
    lineEndId: string,
    lineStartEnd: LineStartEnd,
    value: number,
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
      flowColorHex?: { positive: string; negative: string };
      offsetXStart?: number;
      offsetYStart?: number;
      offsetXEnd?: number;
      offsetYEnd?: number;
      reverse?: TReverse;
      active?: boolean;
    },
  ) {
    this.lineEndId = lineEndId;
    this.lineStartId = lineStartId;
    this.lineStartEnd = lineStartEnd;
    if (!options) {
      return;
    }
    this.dotsPerRow = options.dotsPerGroup ?? this.dotsPerRow;
    this.particleShape = options.particleShape ?? this.particleShape;
    this.lineHeight = options.lineHeight ?? this.lineHeight;
    this.speed = options.speed ?? this.speed;
    this.lineWidth = options.lineWidth ?? this.lineWidth;
    this.groupCount = options.groupCount ?? this.groupCount;
    this.spacing = options.spacing ?? this.spacing;
    this.strokeWidth = options.strokeWidth ?? this.strokeWidth;
    this.dotRadius = options.dotRadius ?? this.dotRadius;
    this.flowColorHex = options.flowColorHex ?? this.flowColorHex;
    this.offsetXStart = options.offsetXStart ?? this.offsetXStart;
    this.offsetYStart = options.offsetYStart ?? this.offsetYStart;
    this.offsetXEnd = options.offsetXEnd ?? this.offsetXEnd;
    this.offsetYEnd = options.offsetYEnd ?? this.offsetYEnd;
    this.autoSpeed = options.autoSpeed ?? this.autoSpeed;
    this.reverse = isDefined(options.reverse) ? options.reverse : this.reverse;
    this.active = isDefined(options.active) ? options.active : this.active;
    this.value = value;
  }

  getReverse() {
    return this.reverse === "greaterThan" ? this.value > 0 : this.value < 0;
  }

  getActive() {
    return this.value !== 0 && this.active;
  }

  getOffsetXStart() {
    return this.offsetXStart;
  }
  getOffsetYStart() {
    return this.offsetYStart;
  }
  getOffsetYEnd() {
    return this.offsetYEnd;
  }
  getOffsetXEnd() {
    return this.offsetXEnd;
  }

  getLineEndId() {
    return this.lineEndId;
  }

  getStrokeWidth() {
    return this.strokeWidth;
  }

  getDotRadius() {
    return this.dotRadius;
  }

  getFlowColorHex() {
    return this.value > 0 ? this.flowColorHex.positive : this.flowColorHex.negative;
  }

  getLineWidth() {
    return this.lineWidth;
  }

  getGroupCount() {
    return this.groupCount;
  }

  getSpacing() {
    return this.spacing;
  }

  private calculateAutoSpeed() {
    return computed(() => {
      const { max, min, maxSpeed = 50, minSpeed = 25 } = this.autoSpeed;

      const range = max - min;

      if (range <= 0) {
        return minSpeed;
      }

      let value = this.value;
      if (value < 0) {
        value = value * -1;
      }

      const faktor = (value - min) / range;

      const speed = minSpeed + (maxSpeed - minSpeed) * faktor;

      return Math.min(maxSpeed, Math.max(minSpeed, speed));
    });
  }

  getSpeed() {
    if (this.autoSpeed.active === false) {
      return this.speed;
    }
    return this.calculateAutoSpeed().value;
  }

  getLineHeight() {
    return this.lineHeight;
  }

  getDotsPerRow() {
    return this.dotsPerRow;
  }

  getParticleShape() {
    return this.particleShape;
  }

  getLineStartId() {
    return this.lineStartId;
  }

  getCoordinates(positions: Positions) {
    switch (this.lineStartEnd) {
      case "leftRightCenter":
        return [
          positions.getCoordinatesRightCenter(this.getLineStartId(), this.getOffsetXStart(), this.getOffsetYStart()),
          positions.getCoordinatesLeftCenter(this.getLineEndId(), this.getOffsetYEnd(), this.getOffsetYEnd()),
        ];
      case "bottomTopCenter":
        const positionsStart = positions.getCoordinatesBottomCenter(this.getLineStartId(), this.getOffsetXStart(), this.getOffsetYStart());
        const positionsEnd = positions.getCoordinatesTopCenter(this.getLineEndId(), this.getOffsetXEnd(), this.getOffsetYEnd());
        if (positionsStart.x !== positionsEnd.x) {
          const distanceY = positionsEnd.y - positionsStart.y;

          const step = distanceY / 2;
          const secondCoordinates = { x: positionsStart.x, y: positionsStart.y + step };
          const thirdCoordinates = { x: positionsEnd.x, y: positionsEnd.y - step };
          return [positionsStart, secondCoordinates, thirdCoordinates, positionsEnd];
        }

        return [positionsStart, positionsEnd];
      case "bottomTopCenterDiagonal":
        return [
          positions.getCoordinatesBottomCenter(this.getLineStartId(), this.getOffsetXStart(), this.getOffsetYStart()),
          positions.getCoordinatesTopCenter(this.getLineEndId(), this.getOffsetXEnd(), this.getOffsetYEnd()),
        ];
      default:
        return [];
    }
  }
}
