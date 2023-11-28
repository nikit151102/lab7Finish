import { ElementRef, Inject } from '@angular/core';
import { modeCircle } from './modeCircleCommands';
import { StoringElementsService } from '../storingElements.service';

export class Circle implements modeCircle {
    type: string = "circle";
    color: string = 'black';
    x = 0;
    y = 0;
    radius = 1;
    Zindex = 1;
    memoryLocation = '';
    elementRef!: ElementRef;

    constructor (private storingElementsService: StoringElementsService){}

    setMemoryLocation(memoryLocation: string){
        this.memoryLocation = memoryLocation;
    }

    setCoordinates(X: number, Y: number) {
        this.x = X;
        this.y = Y;
    }

    setRadius(Radius: number) {
        this.radius = Radius
    }

    setElementRef(elementRef: ElementRef): void {
        if (elementRef) {
            this.elementRef = elementRef;
        }
    }

    setZindex(Zindex: number) {
        this.Zindex = Zindex;
    }

    setColor(color: string): void {
        this.color = color;
    }
    
    draw(): void {
        if (this.storingElementsService) {
            this.storingElementsService.Components.push(this);
        }
    }

}
