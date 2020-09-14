import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
    template: `
        Internal Angular Elements Component ({{ data$ | async }}) <button (click)="upValue()">{{ value }}</button>
    `
})
export class InternalAngularElementsComponent {
    public value = 0;

    public data$: Observable<number>;

    public constructor(dataService: DataService) {
        this.data$ = dataService.data$;
    }


    public upValue() {
        this.value += 1;
    }
}
