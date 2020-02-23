import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SetDisplayInfoService } from '../shared/set-display-info.service';
import { UpdateDisplayService } from '../shared/update-display.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @ViewChild('laps', {static: true}) laps: ElementRef;
  displayInfo;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  stopwatchInterval;
  currentlyTiming = false;

  constructor(private setDisplayInfoService: SetDisplayInfoService, private updateDisplayService: UpdateDisplayService) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo(this.hours.toString(), this.minutes.toString(), this.seconds.toString(), this.milliseconds.toString(), 'AM', true, false);
    this.updateDisplayService.update(this.displayInfo);
  }

  ngOnDestroy() {
    clearInterval(this.stopwatchInterval);
  }

  onStartOrLap = () => {
    if (!this.currentlyTiming) {
      this.currentlyTiming = true;
      this.stopwatchInterval = setInterval(this.incrementStopWatch, 10);
    } else {
      this.createLap();
    }
  }

  onStop = () => {
    clearInterval(this.stopwatchInterval);
    this.currentlyTiming = false;
  }

  onReset = () => {
    this.currentlyTiming = false;
    this.deleteLaps();
    this.displayInfo.hours = 0;
    this.displayInfo.minutes = 0;
    this.displayInfo.seconds = 0;
    this.displayInfo.milliseconds = 0;
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo('0', '0', '0', '0', 'AM', true, false);
    this.updateDisplayService.update(this.displayInfo);
    // tslint:disable-next-line: max-line-length
    clearInterval(this.stopwatchInterval);
  }

  incrementStopWatch = () => {
    if (this.displayInfo.milliseconds < 99) {
      this.displayInfo.milliseconds++;
    } else {
      this.displayInfo.milliseconds = 0;
      if (this.displayInfo.seconds < 59) {
        this.displayInfo.seconds++;
      } else {
        this.displayInfo.seconds = 0;
        if (this.displayInfo.minutes < 59) {
          this.displayInfo.minutes++;
        } else {
          this.displayInfo.minutes = 0;
          if (this.displayInfo.hours < 99) {
            this.displayInfo.hours++;
          } else {
            this.displayInfo.hours = 0;
          }
        }
      }
    }
    // tslint:disable-next-line: max-line-length
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo(this.displayInfo.hours.toString(), this.displayInfo.minutes.toString(), this.displayInfo.seconds.toString(), this.displayInfo.milliseconds.toString(), 'AM', true, false);
    this.updateDisplayService.update(this.displayInfo);
  }

  createLap = () => {
    // tslint:disable-next-line: max-line-length
    const lapTime = this.displayInfo.hours + ':' +  this.displayInfo.minutes + ':' + this.displayInfo.seconds + ':' + this.displayInfo.milliseconds;
    const newLapTimeElement = document.createElement('p');
    newLapTimeElement.style.fontSize = '2rem';
    newLapTimeElement.textContent = lapTime;
    this.laps.nativeElement.appendChild(newLapTimeElement);
  }

  deleteLaps = () => {
    this.laps.nativeElement.textContent = '';
  }
}
