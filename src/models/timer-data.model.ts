import { TimerTypes } from './timer-types.enum';

export interface TimerData {
  time: number;
  type: TimerTypes;
  restTime: number;
}
