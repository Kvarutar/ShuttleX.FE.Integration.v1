export enum FreeTimeAlertType {
  Minutes = 'minutes',
  Seconds = 'seconds',
}

export type FreeTimeAlertProps = {
  time: {
    number: number;
    type: FreeTimeAlertType;
  };
};
