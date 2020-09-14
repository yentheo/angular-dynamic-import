import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';

@Injectable()
export class DataService {
    public data$: Observable<number>;
    private _data$ = new Subject<void>();

    public constructor() {
        this.data$ = this._data$
            .pipe(
                scan((acc, current) => acc + 1, 0),
                shareReplay(1)
            );
    }

    public next() {
        this._data$.next();
    }
}