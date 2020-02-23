import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DisplayInfo } from './displayInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDisplayService {
  displayInformation = new BehaviorSubject<DisplayInfo>(null);
  displayInformation$ = this.displayInformation.asObservable();

  update = (displayInfo: DisplayInfo) => {
    this.displayInformation.next(displayInfo);
  }

  constructor() { }
}
