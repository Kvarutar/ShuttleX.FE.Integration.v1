import { type AlertRunsOn } from '../Alert/props';

export enum FreeTimeAlertType {
  Minutes = 'minutes',
  Seconds = 'seconds',
}

export type FreeTimeAlertProps = {
  runsOn: AlertRunsOn;
  time: {
    number: number;
    type: FreeTimeAlertType;
  };
};
