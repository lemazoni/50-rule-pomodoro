import { Component, effect, input, OnDestroy, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TimePipe } from '../utils/time-pipe';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-timer',
  imports: [MatProgressSpinner, TimePipe, MatButton],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnDestroy {
  initialValue = input<number>(0);

  protected timeLeft = signal(0);
  private intervalId: any;

  get timeLeftPercent(): number {
    const total = this.initialValue();
    const current = this.timeLeft();

    return total > 0 ? (current / total) * 100 : 0;
  }

  constructor() {
    effect(() => {
      this.timeLeft.set(this.initialValue());
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.timeLeft.update((prev) => {
        if (prev <= 1) {
          this.playAlert();
          this.stop();
          return this.initialValue();
        }
        return prev - 1;
      });
    }, 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  playAlert() {
    const audio = new Audio('https://cdn.pixabay.com/audio/2026/03/03/audio_32a50768d2.mp3');

    audio
      .play()
      .then(() => {})
      .catch((error) => {
        console.warn('Reprodução bloqueada: requer interação do usuário.');
      });
  }
}
