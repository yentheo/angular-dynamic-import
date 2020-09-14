import { Component } from '@angular/core';

@Component({
    selector: 'app-normal-component',
    template: 'Normal Component <button (click)="upValue()">{{ value }}</button>'
})
export class NormalComponent {
    public value = 0;

    public upValue() {
        this.value += 1;
    }

}
