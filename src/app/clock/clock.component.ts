import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayInfo } from '../shared/displayInfo.model';
import { UpdateDisplayService } from '../shared/update-display.service';
import { SetDisplayInfoService } from '../shared/set-display-info.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime;
  displayInfo: DisplayInfo;
  secondInterval;

  constructor(private updateDisplayService: UpdateDisplayService, private setDisplayInfoService: SetDisplayInfoService) { }

  ngOnInit() {
    this.updateTime();
    this.secondInterval = setInterval(this.updateTime, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.secondInterval);
  }

  updateTime = () => {
    this.currentTime = new Date();
    let hours = this.currentTime.getHours();
    let meridiem;
    if (hours > 12) {
      hours = hours - 12;
      meridiem = 'PM';
    } else {
      meridiem = 'AM';
    }
    // tslint:disable-next-line: max-line-length
    this.displayInfo = this.setDisplayInfoService.setDisplayInfo(hours.toString(), this.currentTime.getMinutes().toString(), this.currentTime.getSeconds().toString(), '0', meridiem, false, true);
    this.updateDisplayService.update(this.displayInfo);
  }
}
