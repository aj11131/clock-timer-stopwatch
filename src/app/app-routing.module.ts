import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';


const routes: Routes = [
  { path: '', component: ClockComponent },
  { path: 'clock', component: ClockComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'stopwatch', component: StopwatchComponent},
  { path: '**', redirectTo: 'clock', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
