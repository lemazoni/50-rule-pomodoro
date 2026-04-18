import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MainPage } from './main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('50-rule-pomodoro');
}
