import { Component, input } from '@angular/core';
import { MatCard, MatCardActions, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-type-counter',
  imports: [MatCard, MatCardActions, MatCardHeader, MatCardTitle],
  templateUrl: './type-counter.html',
  styleUrl: './type-counter.css',
})
export class TypeCounter {
  studiesToDo = input<number>(0);
  playToDo = input<number>(0);
}
