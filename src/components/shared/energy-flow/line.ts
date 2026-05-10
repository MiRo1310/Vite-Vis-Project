import { IAutoSpeed, ILineEndPoint, Point, TParticleShape, TPositions, TReverse } from "@/components/shared/energy-flow/index.ts";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";
import { isDefined } from "@vueuse/core";
import { computed } from "vue";
import { Positions } from "@/components/shared/energy-flow/position.ts";

export class Line<T extends PropertyKey> {
  private static flowColorDefault = HexColors.GREEN;
  private static clampRadius = 16;

  private readonly lineEnd: ILineEndPoint<T>;
  private readonly lineStart: ILineEndPoint<T>;
  private readonly autoSpeed: IAutoSpeed = {
    active: false,
    max: 100,
    min: 0,
    maxSpeed: 100,
    minSpeed: 0,
  };
  private readonly reverse: TReverse = "greaterThan";
  private readonly active: boolean = true;
  private readonly dotsPerRow: number = 3;
  private readonly particleShape: TParticleShape = "circle";
  private readonly lineHeight: number = 3;
  private readonly speed: number = 50;
  private readonly lineWidth: number = 10;
  private readonly groupCount: number = 2;
  private readonly spacing: number = 10;
  private readonly strokeWidth: number = 10;
  private readonly dotRadius: number = 4;
  private readonly flowColorHex: { positive: HexColors; negative?: HexColors } = { positive: HexColors.GREEN, negative: HexColors.RED };
  private readonly value: number = 0;
  private readonly trackColor: HexColors = HexColors.DARK_BLUE_GRAY;

  // eslint-disable-next-line complexity
  constructor(
    lineStart: ILineEndPoint<T>,
    lineEnd: ILineEndPoint<T>,
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
      flowColorHex?: { positive: HexColors; negative?: HexColors };
      reverse?: TReverse;
      active?: boolean;
    },
  ) {
    this.lineEnd = lineEnd;
    this.lineStart = lineStart;
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

  getStrokeWidth() {
    return this.strokeWidth;
  }

  getDotRadius() {
    return this.dotRadius;
  }

  getFlowColorHex() {
    return this.value > 0 ? this.flowColorHex.positive : (this.flowColorHex.negative ?? Line.flowColorDefault);
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

  getTrackColor() {
    return this.trackColor;
  }
  getClampRadius() {
    return Line.clampRadius;
  }

  buildStraightHorizontalRoute(start: Point, end: Point) {
    const midX = (start.x + end.x) / 2;

    return [start, { x: midX, y: start.y }, { x: midX, y: end.y }, end];
  }

  buildStraightVerticalRoute(start: Point, end: Point) {
    const midY = (start.y + end.y) / 2;

    return [start, { x: start.x, y: midY }, { x: end.x, y: midY }, end];
  }

  collides() {}

  // eslint-disable-next-line complexity
  buildPath(positions: Positions<T>) {
    const start = positions.getCoordinates(this.lineStart);
    const end = positions.getCoordinates(this.lineEnd);
    // const candidates = [
    //   this.buildStraightHorizontalRoute(start, end),
    //   this.buildStraightVerticalRoute(start, end),
    //   buildOrthogonalRouteA(start, end),
    //   buildOrthogonalRouteB(start, end),
    //   buildDetourRoute(start, end),
    // ];
    //
    // for (const route of candidates) {
    //   if (!collides(route, obstacles)) {
    //     return route;
    //   }
    // }

    const startObject = positions.getPositionsById(this.lineStart.id);
    const endObject = positions.getPositionsById(this.lineEnd.id);

    const isSameX = start.x === end.x;
    const isSameY = start.y === end.y;
    const width = 100;
    if (this.isBottomTop(this.lineStart.position) && this.isBottomTop(this.lineEnd.position)) {
      if (isSameX) {
        if ((start.y < end.y && startObject.top !== start.y) || endObject.bottom !== end.y) {
          return [start, end];
        }
        const x = start.x - Math.max(startObject.width, endObject.width) / 2 - 20;
        return [start, { y: start.y, x }, { y: end.y, x }, end];
      }

      if (start.y <= end.y) {
        const max = end.y;
        const min = start.y;
        const yCenter = min + (max - min) / 2;
        return [start, { x: start.x, y: yCenter }, { x: end.x, y: yCenter }, end];
      } else {
        return [
          start,
          { x: start.x, y: start.y - 10 },
          { x: start.x - width / 2 - 10, y: start.y + 10 },
          { y: end.y + 10, x: start.x - width / 2 - 10 },
          { x: end.x, y: end.y + 10 },
          end,
        ];
      }
    }

    if (this.isLeftRight(this.lineStart.position) && this.isLeftRight(this.lineEnd.position)) {
      if (isSameY) {
        if ((start.x < end.x && startObject.left !== start.x) || endObject.right !== end.x) {
          return [start, end];
        }
        const y = start.y - Math.max(startObject.height, endObject.height) / 2 - 20;
        return [start, { x: start.x, y }, { x: end.x, y }, end];
      }
      if (start.x <= end.x) {
        const max = end.x;
        const min = start.x;
        const xCenter = min + (max - min) / 2;
        return [start, { y: start.y, x: xCenter }, { y: end.y, x: xCenter }, end];
      } else {
        return [
          start,
          { y: start.y, x: start.x - 10 },
          { y: start.y - width / 2 - 10, x: start.x + 10 },
          { x: end.x + 10, y: start.y - width / 2 - 10 },
          { y: end.y, x: end.x + 10 },
          end,
        ];
      }
    }

    if (
      (this.isLeftRight(this.lineStart.position) && this.isBottomTop(this.lineEnd.position)) ||
      (this.isBottomTop(this.lineStart.position) && this.isLeftRight(this.lineEnd.position))
    ) {
      return [start, { y: start.y, x: end.x }, end];
    }
    return [{ x: 0, y: 0 }];
  }

  private isBottomTop(str: TPositions): boolean {
    return ["bottom", "top"].includes(str);
  }

  private isLeftRight(str: TPositions): boolean {
    return ["left", "right"].includes(str);
  }
}
