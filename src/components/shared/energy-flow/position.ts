import { ILineEndPoint, TPositions } from "@/components/shared/energy-flow/index.ts";

export class PositionHandler<T> {
  private readonly id: T;
  private left: number = 0;
  private top: number = 0;
  private bottom: number = 0;
  private right: number = 0;
  private heightCenter: number = 0;
  private widthCenter: number = 0;
  private height: number = 0;
  private width: number = 0;

  private readonly padding: number = 10;

  constructor(id: T, options?: { padding?: number }) {
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
    this.width = width;
    this.height = height;
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
      height: this.height,
      width: this.width,
    };
  }
}

export class Positions<T extends PropertyKey> {
  private positions: Record<T, PositionHandler<T>> = {} as Record<T, PositionHandler<T>>;

  public updatePositionsForCard(handler: PositionHandler<T>) {
    this.positions[handler.getId()] = handler;
  }

  public getPositionsById(id: T) {
    return (
      this.positions[id]?.getPosition() ?? {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        heightCenter: 0,
        widthCenter: 0,
        height: 0,
        width: 0,
      }
    );
  }

  public getCoordinates(line: ILineEndPoint<T>) {
    const positions = this.getPositionsById(line.id);
    const lineOffsetX = line.offsetX ?? 0;
    const lineOffsetY = line.offsetY ?? 0;

    return {
      x: this.getPositionX(line.position, positions) + lineOffsetX,
      y: this.getPositionY(line.position, positions) + lineOffsetY,
    };
  }

  private getPositionY(position: TPositions, positions: ReturnType<Positions<T>["getPositionsById"]>) {
    switch (position) {
      case "top":
        return positions.top;
      case "bottom":
        return positions.bottom;
      case "right":
      case "left":
        return positions.heightCenter;
      default:
        return 0;
    }
  }

  private getPositionX(position: TPositions, positions: ReturnType<Positions<T>["getPositionsById"]>) {
    switch (position) {
      case "top":
      case "bottom":
        return positions.widthCenter;
      case "left":
        return positions.left;
      case "right":
        return positions.right;
      default:
        return 0;
    }
  }
}
