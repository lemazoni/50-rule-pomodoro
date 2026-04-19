import { Component } from '@angular/core';
import { Timer } from '../timer/timer';
import { TimeSelect } from '../time-select/time-select';

@Component({
  selector: 'app-main-page',
  imports: [Timer, TimeSelect],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
