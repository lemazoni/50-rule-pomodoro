import { Component } from '@angular/core';
import { Timer } from '../timer/timer';
import { TimeSelect } from '../time-select/time-select';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimerTypes } from '../../models/timer-types.enum';
import { TypeCounter } from '../type-counter/type-counter';
import { Results } from '../results/results';

@Component({
  selector: 'app-main-page',
  imports: [Timer, TimeSelect, TypeCounter],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  protected readonly timerForm = new FormGroup({
    time: new FormControl<number>(1, { nonNullable: true, validators: Validators.required }),
    type: new FormControl<TimerTypes>(TimerTypes.Study, {
      nonNullable: true,
      validators: Validators.required,
    }),
    restTime: new FormControl<number>(15, { nonNullable: true, validators: Validators.required }),
  });

  protected studiesToDo: number = 0;
  protected playToDo: number = 0;

  protected intervalCreated($event: any): void {
    this.timerForm.disable();
  }

  protected intervalFinished($event: any): void {
    this.timerForm.enable();
  }

  protected sessionFinished($event: number) {
    console.log('sessionFinished');
    if (this.timerForm.controls.type.value === TimerTypes.Study) {
      if (this.studiesToDo > 0) {
        this.studiesToDo--;
      } else {
        this.playToDo++;
      }
    } else {
      if (this.playToDo > 0) {
        this.playToDo--;
      }
    }
  }
}
