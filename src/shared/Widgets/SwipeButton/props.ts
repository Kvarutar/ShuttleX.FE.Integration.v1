export enum SwipeButtonModes {
  Confirm = 'confirm',
  Decline = 'decline',
}

export type SwipeButtonProps = {
  mode: SwipeButtonModes;
  onSwipeEnd: () => void;
  text?: string;
};
