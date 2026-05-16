import {
  IAutoSpeed,
  IBoxValues,
  IEnergyFlowAnchorSegment,
  ILineEndPoint,
  Point,
  TParticleShape,
  TReverse,
} from "@/components/shared/energy-flow/index.ts";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";
import { isDefined } from "@vueuse/core";
import { computed } from "vue";
import { Positions } from "@/components/shared/energy-flow/position.ts";

export class Line<T extends PropertyKey> {
  private static flowColorDefault = HexColors.GREEN;
  private static clampRadius = 16;

  private readonly animationRef: SVGGElement | null;
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

  private reactElements: NodeListOf<Element> | null = null;

  // eslint-disable-next-line complexity
  constructor(
    animationRef: SVGGElement | null,
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
    this.animationRef = animationRef;
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

  buildDirectRoute(startSegment: IEnergyFlowAnchorSegment, endSegment: IEnergyFlowAnchorSegment): Point[] | undefined {
    const startExit = startSegment.exitPoint;
    const endExit = endSegment.exitPoint;
    if (startExit.x === endExit.x || startExit.y === endExit.y) {
      return [startSegment.startPoint, startSegment.exitPoint, endSegment.exitPoint, endSegment.startPoint];
    }
  }

  midpoint(a: number, b: number): number {
    return (a + b) / 2;
  }

  buildRightAngelRoute(startSegment: IEnergyFlowAnchorSegment, endSegment: IEnergyFlowAnchorSegment): Point[] | undefined {
    const startExit = startSegment.exitPoint;
    const endExit = endSegment.exitPoint;

    if (startSegment.startPoint.x === startExit.x) {
      return [startSegment.startPoint, startSegment.exitPoint, { x: startExit.x, y: endExit.y }, endSegment.exitPoint, endSegment.startPoint];
    } else if (startSegment.startPoint.y === startSegment.exitPoint.y) {
      return [startSegment.startPoint, startSegment.exitPoint, { x: endExit.x, y: startExit.y }, endSegment.exitPoint, endSegment.startPoint];
    }
  }

  buildOrthogonalHorizontalRoute(startSegment: IEnergyFlowAnchorSegment, endSegment: IEnergyFlowAnchorSegment): Point[] {
    const startExit = startSegment.exitPoint;
    const endExit = endSegment.exitPoint;
    const midX = this.midpoint(startExit.x, endExit.x);

    return [
      startSegment.startPoint,
      startSegment.exitPoint,
      { x: midX, y: startExit.y },
      { x: midX, y: endExit.y },
      endSegment.exitPoint,
      endSegment.startPoint,
    ];
  }

  buildOrthogonalVerticalRoute(startSegment: IEnergyFlowAnchorSegment, endSegment: IEnergyFlowAnchorSegment): Point[] {
    const startExit = startSegment.exitPoint;
    const endExit = endSegment.exitPoint;
    const midY = this.midpoint(startExit.y, endExit.y);

    return [
      startSegment.startPoint,
      startSegment.exitPoint,
      { x: startExit.x, y: midY },
      { x: endExit.x, y: midY },
      endSegment.exitPoint,
      endSegment.startPoint,
    ];
  }

  getSvgRects() {
    const elements = this.animationRef?.closest("svg")?.querySelectorAll("[data-rect]");
    if (elements) {
      this.reactElements = elements;
    }
  }

  collides(route: Point[]) {
    for (const element of this.reactElements ?? []) {
      const raw = element.getAttribute("data-rect");
      const box = raw ? (JSON.parse(raw) as IBoxValues) : null;
      if (box) {
        for (let i = 0; i < route.length - 1; i++) {
          const intersectsBox = this.lineIntersectsBox(route[i], route[i + 1], box);
          if (intersectsBox) {
            return true;
          }
        }
      }
    }
    return false;
  }

  lineIntersectsBox(start: Point, end: Point, box: IBoxValues) {
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;

      if (this.pointInBox({ x, y }, box)) {
        return true;
      }
    }

    return false;
  }

  pointInBox(point: Point, box: IBoxValues) {
    return point.x >= box.x && point.x <= box.x + box.width && point.y >= box.y && point.y <= box.y + box.height;
  }

  getAnchorSegment(line: ILineEndPoint<any>, positions: Positions<T>): IEnergyFlowAnchorSegment {
    const segmentLength = 20;
    let exitPoint: Point;
    const position = positions.getCoordinates(line);
    switch (line.position) {
      case "top":
        exitPoint = { x: position.x, y: position.y - segmentLength };
        break;
      case "bottom":
        exitPoint = { x: position.x, y: position.y + segmentLength };
        break;
      case "left":
        exitPoint = { x: position.x - segmentLength, y: position.y };
        break;
      default:
        exitPoint = { x: position.x + segmentLength, y: position.y };
        break;
    }

    return { startPoint: position, exitPoint };
  }

  buildPath(positions: Positions<T>) {
    const startSegment = this.getAnchorSegment(this.lineStart, positions);
    const endSegment = this.getAnchorSegment(this.lineEnd, positions);

    this.getSvgRects();

    const candidates = [
      this.buildDirectRoute(startSegment, endSegment),
      this.buildRightAngelRoute(startSegment, endSegment),
      this.buildOrthogonalHorizontalRoute(startSegment, endSegment),
      this.buildOrthogonalVerticalRoute(startSegment, endSegment),
      // buildDetourRoute(start, end),
    ];

    for (const route of candidates) {
      if (route && !this.collides(route)) {
        return route ?? [];
      }
    }
    return [];
  }
}
