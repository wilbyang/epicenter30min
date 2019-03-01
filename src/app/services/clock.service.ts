import { Injectable } from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  constructor() { }
  private time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  get time() {
    return this.time$;
  }
}
