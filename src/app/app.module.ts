import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButtonToggle } from '@angular/material/button-toggle';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { ClockComponent } from './clock/clock.component';
import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { DisplayComponent } from './display/display.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MatToolbar,
    MatToolbarRow,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    HeaderComponent,
    ClockComponent,
    TimerComponent,
    StopwatchComponent,
    DisplayComponent
  ],
  imports: [
    MatRippleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
