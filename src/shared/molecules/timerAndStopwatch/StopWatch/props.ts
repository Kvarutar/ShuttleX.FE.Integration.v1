export type StopWatchProps = {
  initialDate: Date;
  onAfterCountdownEnds?: () => void;
  mask: string;
};
