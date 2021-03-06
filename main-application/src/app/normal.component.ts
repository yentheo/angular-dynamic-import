import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-normal-component',
    template: 'Normal Component ({{  data$ | async }}) <button (click)="upValue()">{{ value }}</button>'
})
export class NormalComponent {
    public value = 0;

    public data$: Observable<number>;

    public constructor(dataService: DataService) {
        this.data$ = dataService.data$;
    }

    public upValue() {
        this.value += 1;
    }
}
