import { Component } from '@angular/core';
import { Timer } from '../timer/timer';

@Component({
  selector: 'app-main-page',
  imports: [Timer],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
