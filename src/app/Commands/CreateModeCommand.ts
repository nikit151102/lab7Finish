import { modeCircle } from '../Circle/modeCircleCommands';
import { modeSquare } from '../square/modeSquareCommands';
import { StoringElementsService } from '../storingElements.service';

export abstract class CreateModeCommand<T> {
    protected createdShape: T | null = null;
    protected memory: string = '';

    constructor(
        private shapeType: new (...args: any[]) => T,
        protected args: any[],
        protected storingService: StoringElementsService
    ) { }

    abstract setModePar(): void;

    execute(): void {
        this.createdShape = new this.shapeType();
        this.setModePar();
        this.storingService.Components.push(this.createdShape as any);
    }

    undo(): void {
        if (this.createdShape) {
            this.storingService.Components.pop();
            this.createdShape = null;
        }
    }
}

export class CreateCircle extends CreateModeCommand<modeCircle> {
    setModePar(): void {
        if (this.createdShape) {
            const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
            this.createdShape.setMemoryLocation(memoryLocation);
            this.createdShape.setCoordinates(this.args[0], this.args[1]);
            this.createdShape.setRadius(this.args[2]);
            this.createdShape.setColor(this.args[3]);
            this.createdShape.setZindex(this.args[4]);
            this.createdShape.setElementRef(this.args[5]);
            this.createdShape.draw();
        }
    }
}

export class CreateSquare extends CreateModeCommand<modeSquare> {
    setModePar(): void {
        if (this.createdShape) {
            const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
            this.createdShape.setMemoryLocation(memoryLocation);
            this.createdShape.setCoordinates(this.args[0], this.args[1]);
            this.createdShape.setsideLength(this.args[2]);
            this.createdShape.setColor(this.args[3]);
            this.createdShape.setZindex(this.args[4]);
            this.createdShape.setElementRef(this.args[5]);
            this.createdShape.draw();
        }
    }
}
