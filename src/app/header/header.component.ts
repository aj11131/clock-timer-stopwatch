import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentButton: string;
  constructor(private location: Location) { }

  ngOnInit() {
    this.SelectInitialButton();
  }

  SelectInitialButton = () => {
    if (this.location.path() === '/timer') {
      this.currentButton = 'timer';
    } else if (this.location.path() === '/stopwatch') {
      this.currentButton = 'stopwatch';
    } else {
      this.currentButton = 'clock';
    }
  }
}
