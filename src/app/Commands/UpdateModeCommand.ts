import { StoringElementsService } from "../storingElements.service";

interface UpdateModeParametri {
  x: number;
  y: number;
  radius?: number,
  sideLength?: number,
  color: string;
  Zindex: number;
}

abstract class UpdateModeCommand<T extends UpdateModeParametri> {
  protected shape: T;
  private originState: T = {} as T;
  private modifiedState: T | null = null;

  constructor(
    shape: T,
    protected newX: number,
    protected newY: number,
    protected newRadius: number | undefined,
    protected newSideLength: number | undefined,
    protected newColor: string,
    protected newZindex: number,
    private storingService: StoringElementsService
  ) {
    this.shape = shape;
  }

  execute(): void {
    this.modifiedState = { ...this.shape };
    this.originState = { x: this.newX, y: this.newY, radius: this.newRadius, sideLength: this.newSideLength, color: this.newColor, Zindex: this.newZindex, } as T;
    this.updateModePar();
    const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
    if (shapeIndex !== -1) {
      this.storingService.Components[shapeIndex] = this.shape as any;
    }
  }

  undo(): void {
    if (this.modifiedState) {
      Object.assign(this.shape, this.modifiedState);

      const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
      if (shapeIndex !== -1) {
        this.storingService.Components[shapeIndex] = this.shape as any;
      }
    }
  }

  abstract updateModePar(): void;
}

export class UpdateCircle extends UpdateModeCommand<{ x: number; y: number; radius: number; color: string; Zindex: number; }> {

  updateModePar(): void {
    this.shape.x = this.newX;
    this.shape.y = this.newY;
    if (this.newRadius !== undefined) {
      this.shape.radius = this.newRadius;
    }
    this.shape.color = this.newColor;
    this.shape.Zindex = this.newZindex;
  }

}


export class UpdateSquare extends UpdateModeCommand<{ x: number; y: number; sideLength: number; color: string; Zindex: number; }> {

  updateModePar(): void {
    this.shape.x = this.newX;
    this.shape.y = this.newY;
    if (this.newSideLength !== undefined) {
      this.shape.sideLength = this.newSideLength;
    }
    this.shape.color = this.newColor;
    this.shape.Zindex = this.newZindex;
  }

}