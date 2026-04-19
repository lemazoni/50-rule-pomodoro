import { Component, effect, input, OnDestroy, output, signal, computed } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

import { TimePipe } from '../utils/time-pipe';
import { TimerModeEnum } from '../../models/timer-mode.enum';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatProgressSpinner, MatButton, MatCard, MatCardContent, TimePipe],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnDestroy {
  // --- Inputs & Outputs ---
  sessions = input<number>(0);
  longRestTime = input<number>(15);
  startAction = output<any>();
  endAction = output<any>();
  sessionCompleted = output<number>();

  // --- State Signals ---
  protected timeLeft = signal(0);
  protected timerMode = signal<TimerModeEnum | null>(null);
  protected sessionsCompleted = signal(0);
  protected isRunning = signal(false);

  // --- Private Properties ---
  private intervalId: any;
  private readonly ALERT_SOUND_URL =
    'https://cdn.pixabay.com/audio/2026/03/03/audio_32a50768d2.mp3';

  // --- Configuration (Seconds) ---

  // --- Computed State ---

  private get TIMES() {
    return {
      [TimerModeEnum.Focus]: 25 * 60,
      [TimerModeEnum.Rest]: 5 * 60,
      [TimerModeEnum.LongRest]: this.longRestTime(), // Always grabs current signal value
    };
  }

  protected timeLeftPercent = computed(() => {
    const mode = this.timerMode();
    if (!mode) return 0;

    const total = this.TIMES[mode];
    return total > 0 ? (this.timeLeft() / total) * 100 : 0;
  });

  protected timerModeString = computed(() => {
    switch (this.timerMode()) {
      case TimerModeEnum.Focus:
        return 'Sessão de Foco';
      case TimerModeEnum.Rest:
        return 'Descanso Curto';
      case TimerModeEnum.LongRest:
        return 'Descanso Longo';
      default:
        return 'Começar';
    }
  });

  // --- Computed Counters for Template ---

  protected sessionsRemaining = computed(() => {
    return Math.max(0, this.sessions() - this.sessionsCompleted());
  });

  protected shortRestsRemaining = computed(() => {
    const totalSessions = this.sessions();
    if (totalSessions <= 0) return 0;

    const totalLongRests = Math.floor(totalSessions / 4);
    const totalShortRests = totalSessions - 1 - totalLongRests;

    // Calculate how many short rests have already passed
    const completed = this.sessionsCompleted();
    const completedLongRests = Math.floor(completed / 4);
    const completedShortRests = Math.max(
      0,
      completed - completedLongRests - (this.timerMode() === TimerModeEnum.Focus ? 0 : 0),
    );

    // A simpler way to track "remaining" for the template:
    const remainingSessions = this.sessionsRemaining();
    if (remainingSessions <= 0) return 0;

    // If we are currently in a Rest, we don't count the one we are in as "remaining"
    const isResting = this.timerMode() === TimerModeEnum.Rest;
    const futureSessions = remainingSessions - (this.timerMode() === TimerModeEnum.Focus ? 1 : 0);

    // Logic: calculate future long rests and subtract from future gaps
    const futureLongRests =
      Math.floor((this.sessionsCompleted() + futureSessions) / 4) -
      Math.floor(this.sessionsCompleted() / 4);

    return Math.max(0, futureSessions - futureLongRests + (isResting ? 1 : 0));
  });

  /** Long rests remaining */
  protected longRestsRemaining = computed(() => {
    const totalLongRests = Math.floor(this.sessions() / 4);
    const completedLongRests = Math.floor(this.sessionsCompleted() / 4);
    return Math.max(0, totalLongRests - completedLongRests);
  });

  constructor() {
    effect(() => {
      this.reset();
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  // --- Public Control Methods ---

  public start(): void {
    if (this.intervalId) return;

    // Don't start if the goal is already met
    if (this.sessionsCompleted() >= this.sessions() && this.sessions() !== 0) return;

    this.isRunning.set(true);

    if (!this.timerMode()) {
      this.initPhase(TimerModeEnum.Focus);
    } else {
      this.resumeTimer();
    }
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public reset(): void {
    this.stop();
    this.sessionsCompleted.set(0);
    this.timerMode.set(null);
    this.timeLeft.set(this.TIMES[TimerModeEnum.Focus]);
  }

  // --- Internal Phase Logic ---

  private initPhase(mode: TimerModeEnum): void {
    this.timerMode.set(mode);
    this.timeLeft.set(this.TIMES[mode]);
    this.resumeTimer();
  }

  private resumeTimer(): void {
    this.intervalId = setInterval(() => this.tick(), 1000);
    this.startAction.emit(this.intervalId);
  }

  private tick(): void {
    if (this.timeLeft() <= 0) {
      this.handlePhaseEnd();
      return;
    }
    this.timeLeft.update((v) => v - 1);
  }

  private handlePhaseEnd(): void {
    this.playAlert();
    this.stop();

    const currentMode = this.timerMode();

    if (currentMode === TimerModeEnum.Focus) {
      // 1. Session is finished, update count
      this.sessionsCompleted.update((s) => s + 1);
      this.sessionCompleted.emit(1);

      // 2. Always move to a rest phase (Short or Long)
      const isLongRestTime = this.sessionsCompleted() % 4 === 0;
      this.initPhase(isLongRestTime ? TimerModeEnum.LongRest : TimerModeEnum.Rest);
    } else {
      // 3. We just finished a REST phase.
      // CHECK: If we've completed all required sessions, stop now.
      if (this.sessionsCompleted() >= this.sessions()) {
        this.timerMode.set(null);
        console.log('All sessions and rests completed!');
        this.endAction.emit(this.intervalId);
        this.isRunning.set(false);
        this.reset();
        return;
      }

      // 4. Otherwise, start the next Focus session
      this.initPhase(TimerModeEnum.Focus);
    }
  }

  private playAlert(): void {
    const audio = new Audio(this.ALERT_SOUND_URL);
    audio.play().catch(() => console.warn('Audio blocked.'));
  }
}
