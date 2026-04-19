import { Component, input, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimerTypes } from '../../models/timer-types.enum';

@Component({
  selector: 'app-time-select',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './time-select.html',
  styleUrl: './time-select.css',
})
export class TimeSelect {
  @Input() timerForm = new FormGroup({
    time: new FormControl<number>(1, { nonNullable: true, validators: Validators.required }),
    type: new FormControl<TimerTypes>(TimerTypes.Study, {
      nonNullable: true,
      validators: Validators.required,
    }),
    restTime: new FormControl<number>(15, { nonNullable: true, validators: Validators.required }),
  });

  timeOptionsSize = input<number>(8);

  protected timerTypes = Object.values(TimerTypes);

  protected readonly indexedDB = indexedDB;
  protected readonly restTimeOptions = [15, 30];
  protected readonly timeOptions = Array.from({ length: this.timeOptionsSize() }, (_, i) => i + 1);
}
