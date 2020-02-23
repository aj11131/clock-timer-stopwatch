import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  startTimer = new Subject<any>();
  startTimer$ = this.startTimer.asObservable();

  sendTimerData = new Subject<any>();
  sendTimerData$ = this.sendTimerData.asObservable();

  onStartTimer = () => {
    this.startTimer.next(null);
  }
}
