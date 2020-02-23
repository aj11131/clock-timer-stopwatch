import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateDisplayService } from '../shared/update-display.service';
import { DisplayInfo } from '../shared/displayInfo.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TimerService } from '../shared/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {
  displayInfo: DisplayInfo;
  subscriptionToDisplayUpdates;
  subscriptionToTimerFunctions;
  display = new FormGroup({
   hours: new FormControl(),
   minutes: new FormControl(),
   seconds: new FormControl(),
   milliseconds: new FormControl(),
   meridiem: new FormControl()
  });

  constructor(private updateDisplay: UpdateDisplayService, private timerService: TimerService, private router: Router) { }

  ngOnInit() {
    this.subscribeToDisplayUpdates();
    this.subscribeToTimerFunctions();
    this.setDisable();
  }

  ngOnDestroy() {
    this.subscriptionToDisplayUpdates.unsubscribe();
    this.subscriptionToTimerFunctions.unsubscribe();
  }

  setDisable = () => {
    if (this.router.url !== '/timer') {
      this.display.disable();
    }
  }

  subscribeToDisplayUpdates = () => {
    this.subscriptionToDisplayUpdates = this.updateDisplay.displayInformation$.subscribe(
      displayInfo => {
        if (displayInfo) {
          this.displayInfo = displayInfo;
          this.display.controls.hours.setValue(displayInfo.hours);
          this.display.controls.minutes.setValue(displayInfo.minutes);
          this.display.controls.seconds.setValue(displayInfo.seconds);
          this.display.controls.milliseconds.setValue(displayInfo.milliseconds);
          this.display.controls.meridiem.setValue(displayInfo.meridiem);
        }
      }
    );
  }

  subscribeToTimerFunctions = () => {
    this.subscriptionToTimerFunctions = this.timerService.startTimer$.subscribe(
      () => this.onSubmit()
    );
  }

  checkInput = (e: any, min: number, max: number) => {
    const maxChars = 2;
    if (e.target.value.length > maxChars) {
        e.target.value = e.target.value.substr(0, maxChars);
    }
    if (e.target.value > max) {
      e.target.value = max;
    }
    if (e.target.value < min) {
      e.target.value = min;
    }
  }

  onSubmit = () => {
    console.log(this.display.value);
    this.timerService.sendTimerData.next(this.display.value);
  }
}
