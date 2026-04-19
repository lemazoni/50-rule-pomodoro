import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteToHour',
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || isNaN(value)) return '00:00:00';

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');

    return `${h}:${m}:${s}`;
  }
}
