import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetDisplayInfoService } from '../shared/set-display-info.service';
import { DisplayInfo } from '../shared/displayInfo.model';
import { UpdateDisplayService } from '../shared/update-display.service';
import { TimerService } from '../shared/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  displayInfo: DisplayInfo;
  timer: any;
  currentlyTiming = false;
  timerServiceSubscription: any;

  constructor(private setDisplayInfoService: SetDisplayInfoService,
              private updateDisplayService: UpdateDisplayService,
              private timerService: TimerService) { }

  ngOnInit() {
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo('0', '0', '0', '0', 'AM', false, false);
    this.updateDisplayService.update(this.displayInfo);
    this.subscribeToTimerData();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.currentlyTiming = false;
    this.timerServiceSubscription.unsubscribe();
  }

  subscribeToTimerData = () => {
    this.timerServiceSubscription = this.timerService.sendTimerData$.subscribe(
      data => {
        if (!data.hours || data.hours === '') { data.hours = 0; }
        if (!data.minutes || data.minutes === '') { data.minutes = 0; }
        if (!data.seconds || data.seconds === '') { data.seconds = 0; }
        // tslint:disable-next-line: max-line-length
        this.displayInfo = this.setDisplayInfoService.setDisplayInfo(data.hours.toString(), data.minutes.toString(), data.seconds.toString(), '0', 'AM', false, false);
        this.updateDisplayService.update(this.displayInfo);
      }
    );
  }

  onStartPauseTimer = () => {
    if (!this.currentlyTiming) {
      this.timerService.startTimer.next(null);
      this.timer = setInterval(this.incrementTimer, 1000);
      this.currentlyTiming = true;
    } else {
      clearInterval(this.timer);
      this.currentlyTiming = false;
    }
  }

  onCancelTimer = async () => {
    this.currentlyTiming = false;
    clearInterval(this.timer);
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo('0', '0', '0', '0', 'AM', false, false);
    this.updateDisplayService.update(this.displayInfo);
  }

  incrementTimer = () => {
    let hours = Number(this.displayInfo.hours);
    let minutes = Number(this.displayInfo.minutes);
    let seconds = Number(this.displayInfo.seconds);

    if (seconds === 0 && minutes === 0 && hours === 0) {
      this.onTimerCompletion();
      return;
    }

    if (seconds > 0) {
      seconds--;
    } else if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (seconds === 0 && minutes === 0 && hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    }
    // tslint:disable-next-line: max-line-length
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo(hours.toString(), minutes.toString(), seconds.toString(), '0', 'AM', false, false);
    this.updateDisplayService.update(this.displayInfo);
  }

  onTimerCompletion = async () => {
    clearInterval(this.timer);
    this.beep();
    let count = 0;
    while (count < 20 && this.currentlyTiming) {
      this.beep();
      await this.sleep(400);
      count++;
    }
  }

  beep = async () => {
    const audio = new Audio('/assets/beep-07.mp3');
    audio.play();
  }

  sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
