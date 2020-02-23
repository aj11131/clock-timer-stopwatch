import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetDisplayInfoService {

  constructor() { }

  // tslint:disable-next-line: max-line-length
  setDisplayInfo = (hours: string, minutes: string, seconds: string, milliseconds: string, meridiem: string, millisecondMode: boolean, clockMode: boolean) => {
    const displayInfo = {
      hours: this.addZero(hours),
      minutes: this.addZero(minutes),
      seconds: this.addZero(seconds),
      milliseconds: this.addZero(milliseconds),
      meridiem,
      millisecondMode,
      clockMode,
    };
    return displayInfo;
  }

  addZero = (str: string) => {
    if (Number(str) < 10 && str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
}
