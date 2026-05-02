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

  public getPositions() {
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
      this.positions[id]?.getPositions() ?? {
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

export interface IOffset {
  offsetXStart: number;
  offsetYStart: number;
  offsetXEnd: number;
  offsetYEnd: number;
}

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
  private dotsPerRow = 3;
  private particleShape: TParticleShape = "circle";
  private lineHeight = 3;
  private speed = 50;
  private lineWidth = 10;
  private groupCount = 2;
  private spacing = 0.25;
  private strokeWidth = 10;
  private dotRadius = 4;
  private flowColorHex = "#00ff99";

  // eslint-disable-next-line complexity
  constructor(
    lineStartId: string,
    lineEndId: string,
    lineStartEnd: LineStartEnd,
    options?: {
      dotsPerGroup?: number;
      particleShape?: TParticleShape;
      lineHeight?: number;
      speed?: number;
      lineWidth?: number;
      groupCount?: number;
      spacing?: number;
      strokeWidth?: number;
      dotRadius?: number;
      flowColorHex?: string;
      offsetXStart?: number;
      offsetYStart?: number;
      offsetXEnd?: number;
      offsetYEnd?: number;
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

  setStrokeWidth(width: number) {
    this.strokeWidth = width;
  }

  getDotRadius() {
    return this.dotRadius;
  }

  setDotRadius(radius: number) {
    this.dotRadius = radius;
  }

  getFlowColorHex() {
    return this.flowColorHex;
  }

  setFlowColorHex(hex: string) {
    this.flowColorHex = hex;
  }

  getLineWidth() {
    return this.lineWidth;
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  getGroupCount() {
    return this.groupCount;
  }

  setGroupCount(groupCount: number) {
    this.groupCount = groupCount;
  }

  getSpacing() {
    return this.spacing;
  }

  setSpacing(spacing: number) {
    this.spacing = spacing;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  getLineHeight() {
    return this.lineHeight;
  }

  setLineHeight(height: number) {
    this.lineHeight = height;
  }

  getDotsPerRow() {
    return this.dotsPerRow;
  }

  setDotsPerRow(dots: number) {
    this.dotsPerRow = dots;
  }

  getParticleShape() {
    return this.particleShape;
  }

  setParticleShape(particleShape: TParticleShape) {
    this.particleShape = particleShape;
  }

  getLineStartId() {
    return this.lineStartId;
  }

  getLineStartEnd() {
    return this.lineStartEnd;
  }
  getCoordinates(positions: Positions) {
    switch (this.lineStartEnd) {
      case "leftRightCenter":
        return [
          positions.getCoordinatesRightCenter(this.getLineStartId(), this.getOffsetXStart(), this.getOffsetYStart()),
          positions.getCoordinatesLeftCenter(this.getLineEndId(), this.getOffsetXEnd(), this.getOffsetYEnd()),
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
