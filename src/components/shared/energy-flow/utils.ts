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

export type LineStartEnd = "leftRightCenter" | "bottomTopCenter" | "bottomTopCenterDiagonal";
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
        const positionsStart = positions.getCoordinatesBottomCenter(this.getLineStartId());
        const positionsEnd = positions.getCoordinatesTopCenter(this.getLineEndId());
        if (positionsStart.x !== positionsEnd.x) {
          const distanceY = positionsEnd.y - positionsStart.y;

          const step = distanceY / 2;
          console.log(distanceY);
          const secondCoordinates = { x: positionsStart.x, y: positionsStart.y + step };
          const thirdCoordinates = { x: positionsEnd.x, y: positionsEnd.y - step };
          return [positionsStart, secondCoordinates, thirdCoordinates, positionsEnd];
        }

        return [positionsStart, positionsEnd];
      case "bottomTopCenterDiagonal":
        return [positions.getCoordinatesBottomCenter(this.getLineStartId()), positions.getCoordinatesTopCenter(this.getLineEndId())];
      default:
        return [];
    }
  }
}
