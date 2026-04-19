import { Component, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimerTypes } from '../../models/timer-types.model';

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
    time: new FormControl<number>(0, Validators.required),
    type: new FormControl<TimerTypes>(TimerTypes.Study, Validators.required),
  });

  protected timerTypes = Object.values(TimerTypes);
  protected readonly indexedDB = indexedDB;
}
