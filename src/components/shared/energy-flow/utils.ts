import { UseElementBoundingReturn } from "@vueuse/core";

export class PositionHandler {
  private readonly id: string;
  private left: number = 0;
  private top: number = 0;
  private bottom: number = 0;
  private right: number = 0;
  private heightCenter: number = 0;
  private widthCenter: number = 0;

  private readonly padding: number = 0;

  constructor(id: string, options?: { padding?: number }) {
    this.id = id;
    this.padding = options?.padding ?? this.padding;
  }

  public updatePosition(react: UseElementBoundingReturn) {
    this.top = react.top.value - this.padding;
    this.left = react.left.value - this.padding;
    this.bottom = react.top.value + react.height.value + this.padding;
    this.right = react.left.value + react.width.value + this.padding;
    this.heightCenter = react.top.value + react.height.value / 2;
    this.widthCenter = react.left.value + react.width.value / 2;
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

  public updateCard(handler: PositionHandler) {
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

  public getCoordinatesRightCenter(id: string) {
    const position = this.getPositionsById(id);
    return {
      x: position.right,
      y: position.heightCenter,
    };
  }

  public getCoordinatesLeftCenter(id: string) {
    const position = this.getPositionsById(id);
    return {
      x: position.left,
      y: position.heightCenter,
    };
  }

  public getCoordinatesBottomCenter(id: string) {
    const position = this.getPositionsById(id);
    return {
      x: position.widthCenter,
      y: position.bottom,
    };
  }

  public getCoordinatesTopCenter(id: string) {
    const position = this.getPositionsById(id);
    return {
      x: position.widthCenter,
      y: position.top,
    };
  }
}

export type LineStartEnd = "leftRightCenter" | "bottomTopCenter";
export class Line {
  private readonly lineEndId: string;
  private readonly lineStartId: string;
  private readonly lineStartEnd: LineStartEnd;

  constructor(lineStartId: string, lineEndId: string, lineStartEnd: LineStartEnd) {
    this.lineEndId = lineEndId;
    this.lineStartId = lineStartId;
    this.lineStartEnd = lineStartEnd;
  }

  getLineEndId() {
    return this.lineEndId;
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
        return [positions.getCoordinatesRightCenter(this.getLineStartId()), positions.getCoordinatesLeftCenter(this.getLineEndId())];
      case "bottomTopCenter":
        return [positions.getCoordinatesBottomCenter(this.getLineStartId()), positions.getCoordinatesTopCenter(this.getLineEndId())];
      default:
        return [];
    }
  }
}
